<template>
<div>
   test
</div>  

</template>

<script>
import {/*get,*/ getTableByEntry, prepareTreeData} from './utils'
  export default {
  name :'itemsBlock',
  data() {  
 
    return {
            data: [] 
                  /* массив элементов (прмерно такой  [{id:1, name:'test1', procCnt:2, url:'', imgUrl:''}])
                     ["id","name", "url", "imgUrl", "procCnt"]  */
      , fieldset : { /*Список полей*/
                      id:-1, /* id пустой записи ( используется для добавления и вставки из буфера )*/
                      name:null,
                      url:null,
                      imgUrl:null,
                      procCnt:0,
                      lastDate:null
                    }
      ,editid:null /*редактируемое id*/
      ,searchQuery: '' /*поисковая строка*/
      ,selectedId:null /*выбраный id*/
      ,folderID:null /*id папки*/
      ,isTmrToSaveActive:false /* флаг для сохранения по таймеру после изменения пагинации серии (можно сохранять раз в 3 сек)*/
      ,loading: true /* флаг отображения прелодера для элементов */
      ,folderName:'Имя текущей ПАПКИ s' /* название выбранной папки */
      ,dataToSaveOnTimer: { /* данные которыне необходимо сохранить по таймеру */
           prm:null
          ,idx:null
       }       
      ,lastSaveTime:null /*время последнего сохранения*/
      ,cutPasteBuffer: { /* буфер для перемещения элемента из папки в папку */
         data : {}
        ,bufferStatus:'empty' //'empty', 'loading', 'full' /* флаг для отображения кнопок выризать вставить а также прелодера*/
      }
    }
  },

    computed: {
   placeholder() { /*placeholder для поисковой строки содержит название выбранной папки*/
      return this.folderName
   },
   isEdit() {
    if (this.editid) {
      return true
    } else {
      return false
    }
   }
    ,filteredData: function () { /*фильтрация по поисковой строке*/
    var filterKey = this.searchQuery && this.searchQuery.toLowerCase()
    var data = this.data
    let editid = this.editid
    let selectedId= this.selectedId
   
    data=data.filter(function (row) {
 		   	let visible = true

        let editMode = false
           
        if (filterKey) {
          let f = row.name+''
          visible = f.indexOf(filterKey)>-1
         	row.visible=visible
        }

        row.editMode= editid===row.id
        row.isSelected = selectedId===row.id
        if (!row.imgUrl) {
          row.imgUrl='http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png' //'./default.png'
        }

       	if (visible)
       		{
            return row
          }
      })
    return  data

  }
    },
  methods: {
    editRec:function(id){ /* событие для редактирования элемента */
      console.log('id' +id)
      if ( (this.editid === null) /*&& (this.editid === -1)*/ ) { /* элемент можно редактировать если другой элемент не редактируется */
      this.editid=id;
      this.selectedId=id;
      }
    },
    updateItem:function (data, idx){ /*процедура обновления элемента после нажания кнокпи сохранить */
       // console.log('updaTeItem'+idx)
      //this.data[idx]=Object.assign({}, data)
      for (let key in data) {
        this.data[idx][key] =data[key]
      }
      this.editid=null;
    }
    ,getFields:function(){/* процедура получения скписоа полей*/
      let fieldList = []
      for (let key in this.fieldset) {
        fieldList.push(key)
      }
      return fieldList
      }
      ,saveRec:function(nData, callBack=null){ /* собитя для сохранения элемента (вызывается из режима редактирования) */  
      let editid = this.editid
      let data = this.data
      let idx=0
      let newData = {}
      let updateItem =  this.updateItem;

      let stopTimer = this.stopTimer
      let startTimer = this.startTimer
      let isTmrToSaveActive =  this.isTmrToSaveActive
      

        if (nData) {
          for (idx=0;idx<this.data.length;idx++ ) {
          if (this.data[idx].id === nData.id){
              break
          }
        } }else {
        for (idx=0;idx<this.data.length;idx++ ) {
          if (this.data[idx].id === editid){
          break
          }
        }
      }

      let folderID 
      folderID = this.folderID;
      let isEdit = 1
      if (nData.id == -1 ) {
        isEdit = -1
      }
      console.log(nData)
      console.log(isEdit)
      let prm = {
        'idfolder':this.folderID
        ,'name': nData.name
        ,'procCnt':nData.procCnt
        ,'url':nData.url
        ,'imgUrl': nData.imgUrl
        ,'idItem':nData.id
        /*'isDelete':*/
        ,'isEdit':isEdit
      }

      let fields = this.getFields()
      let setDataToSave = this.setDataToSave
      let dataToSaveOnTimer = this.dataToSaveOnTimer

      let save = function (prm, idx, callBack=null) {
        jrpc.call('mFolders', prm).then(function (result) {
           let u = getTableByEntry(result, fields)
           if (callBack) {
             let id = callBack(u[0].id)
             updateItem(u[0], id);
           } else {
             updateItem(u[0], idx);
           }
        });
      }
      if (((new Date()) - this.lastSaveTime)/1000>3 ) {        
        save(prm, idx, callBack);
        this.lastSaveTime = new Date()
      } else {                   
              setDataToSave(prm,idx) /*ложим данные в память для сохранения по таймеру*/
              if (!isTmrToSaveActive) {
                  startTimer()
                  setTimeout(function() {
                        save(dataToSaveOnTimer.prm, dataToSaveOnTimer.idx)
                        this.lastSaveTime = new Date()
                        stopTimer()
                  }, 3000);
          }

      }
    },
    stopTimer:function() { /*процедура остановки таймера*/
       this.isTmrToSaveActive = false
       console.log(this.isTmrToSaveActive)
    }
    ,setDataToSave(prm, idx) { /*ложим данные в память для сохранения по таймеру*/
              this.dataToSaveOnTimer.prm = prm
              this.dataToSaveOnTimer.idx = idx
    }
    ,startTimer:function() { /*процедура запуска таймера*/
       this.isTmrToSaveActive = true
       console.log(this.isTmrToSaveActive)
    },

    cntChange:function(nVal){ /*собитя для изменения серии элемента вызывается при изменении пагинации*/
      if (this.editid) return

      let saveRec = this.saveRec
      let stopTimer = this.stopTimer
       
      for (let idx=0;idx<this.data.length;idx++ ) {
        if (this.data[idx].id == nVal.id){        
        this.data[idx].procCnt= nVal.cnt
        let data = this.data[idx]
            saveRec(data)
       }
      }     
    },
    selectItem:function(id, isIgnore=false){ /*событие для выбора элемента вызывается при клике по элементу*/     
     if (this.editid && !isIgnore)   return /* можно выбирать только если другие элементы не редактируются */
      this.selectedId=id
    },
    addEmptyLine: function () {/* событие для добавления пустого элемента вызывается по кнопке добавить (не реализованно)*/
       let fieldset = this.fieldset
        if ( (this.editid != fieldset.id)  ) { /* если пустая запись не добавленна*/
         this.selectedId = fieldset.id
         this.data.push( Object.assign({}, fieldset) )
         // eventBus.$emit('treeNodeGetEditData', Object.assign({}, fieldset))
          this.editid = fieldset.id
         console.log(this.data)
       }
       
       return this.data.length-1


      },
    updateData: function (NewData) {
      this.data = JSON.parse(JSON.stringify(NewData));
    }
    ,filterDeletedItem() { /* протцедура для возврата всех элементов кроме удаляемого */
         let NewData = []
         let d = this.data
         let delIdx = this.selectedId
         if (!delIdx)  {
          delIdx = this.editid
         }
         NewData = d.filter(function(itm){ if (itm.id!=delIdx) return itm })
         return NewData
    }
    ,deleteItem: function () {/*событие для удаления элемента вызывается по кнопке удалить (не реализованно)*/

         let { updateData, filterDeletedItem} = this
        
         let NewData  = filterDeletedItem()
         
         jrpc.call('mFolders',{'idfolder': delIdx, isEdit:1, isDelete:1}).then(function (result) {     /*Хз что это ???*/     
            console.log(NewData)
            updateData(NewData)
          });
      }
  ,showLoded : function(isLoging){ /*порцедура для вывода прелодера вместо элеметов вызывается при перемещении по папкам*/
        this.loading=isLoging
      }
  ,setBufferStatus : function (status) {/*протцедура установки статуса буфера*/
    this.cutPasteBuffer.bufferStatus = status
  }

  ,copyToBuffer : function(){ /* событие для копирования в буфер элемента */
    if (!this.selectedId || this.editid ) return
    let getIdxById = (data, id) => {
      let i=-1
      for (i = 0; i <= data.length - 1; i++) {
         if (data[i].id === id) break
      }
    return i
    }

    let {  selectedId, data  } = this
    let idx =  getIdxById(data, selectedId)
    this.cutPasteBuffer.data =  Object.assign({},data[idx])
    this.cutPasteBuffer.bufferStatus = 'full'
    this.selectedId=null    
  }
  ,pasteFromBuffer : function () { /* событие для вставки из буфера */
    if (this.loading || this.editid) return
    let { setBufferStatus } =  this
    setBufferStatus('loading')
    let { addEmptyLine, selectItem } = this

    let avterMove = function (id) {
      setBufferStatus('empty') 
      let lastIndex = addEmptyLine()       
      selectItem(id, true)
      return lastIndex
    }
    this.editid = null 
    this.saveRec(this.cutPasteBuffer.data, avterMove);
    this.cutPasteBuffer.data = {}  
  }, cancelEdit : function () { /* событие по копки отменить (если есть добавленная но не сохраненная запить то не выводим ее) */
    console.log(this.fieldset)
   console.log( this.editid + ' ' +this.fieldset.id )
    if (Number(this.editid) === Number(this.fieldset.id)) {
      let { filterDeletedItem, updateData } = this
      updateData(filterDeletedItem())
    }
    this.editid = null     
  }

  },

  components: {
    item
  },
  created: function () { 
    eventBus.$on("treeNodeActivate", (node)=>{   /* шина событий используется для получение внешних событий */   
     // console.log ( "node");  console.log (node);
      // this.getFields()  
    let idNode = node.id

     let data = this.data;     
     let TrunData = function () {
        while (data.length > 0) {
             data.shift()
        }        
      }
     var appendResultItems = function (re, prm){
        var newItem = {}, d = {}
        var i = 0, j = 0;                
        for (j=0; j <= re.length-1; j++) {          
         data.push( Object.assign({},re[j]));   
        }                                
      }
     let fields = this.getFields()
     // console.log(this.showLoded)
     let showLoded = this.showLoded  
     TrunData(); 
     this.editid = null
     this.selectedId = null
     showLoded(true);
     jrpc.call('mFolders',[idNode]).then(function (result) {              
                console.log( getTableByEntry(result, /*["id","name", "url", "imgUrl", "procCnt"]*/fields) );
                showLoded(false);
                if (result) {                  
                  appendResultItems( getTableByEntry(result, /*["id","name", "url", "imgUrl", "procCnt"]*/fields) )
                }
        })
     this.folderID = idNode
     this.folderName = node.name
     // console.log(fields) 
    })
  }
}

</script>


<style>

.edt{
    float:right;  
    display : inline;
}
/*.cBtn{
    float:right;  
    display : inline;
}*/

.input{
  width:7em;
  display : inline;
  line-height: 1;
  /*height:12px;*/
}
.top-pannel{
  width:100%
}
.edt-search{
  width:80%
}
.itm-cmd {
   width:20%
}
.notFound{
/*  position: relative;*/
  /*left:100%;*/
 display: block;
    margin-left: auto;
    margin-right: auto 

}
.not-found-conteiner{
   display: block;
  width: 100%;
}

.card-deck {
    /*flex-flow: none;*/
/*    display: block !important;*/
    }
.card-deck{
    /*flex-flow: none; !important*/
  }

  .card {  min-width: 176px !important; }


</style>


 <style  src="./bootstrap.min.css" scoped></style>

 <style>
 .image-btn {
  width: 16px;
  height: 16px;  
}
 </style>

