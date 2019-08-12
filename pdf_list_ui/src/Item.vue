<template>
<div @click="onSelectItem()" calss = "my-card-item">
  <template v-if="isEditMode">   
          <h5 class="card-header test" v-bind:class="isSelected ? 'pnl-selected':''">
            <span><input class="input" v-model="DataToSave.name" v-bind:class="isSelected ? 'pnl-selected':''"></span>  
            <span>
               <button class="btn btn-primary edt" type="button" @click="saveRec()" title="Сохранить"> 
                 <template v-if="this.loading">  
                    <img src="./assets/preloader.svg" class="image-btn">
                 </template><template v-else>
                    <img src="./assets/save-button.svg" class="image-btn">  
                 </template>
               </button>                     
            </span> 
          </h5>
          <div class="card-body test">
            <template v-if="this.loading">  
              <div class="image-wrap"> 
                <img src="./assets/preloader.svg">
              </div>
            </template><template v-else>
              <table>
                <tr><td> <label>Сайт </label> </td><td><input class="input" v-model="DataToSave.url" > </td></tr>
                <tr><td> <label>Картинка </label> </td><td><input class="input" v-model="DataToSave.imgUrl" > </td></tr>
                <tr><td> <label>Серия </label> </td><td><input class="input" v-model="DataToSave.procCnt" > </td></tr>                
              </table>

            </template>
            
          </div>
          <div class="card-footer text-muted test">
            {{val.lastDate}} 
          </div>
        </template>
        <template v-else>      
          <h5 class="card-header test" v-bind:class="isSelected ? 'pnl-selected':'' ">{{itemDispName}}   
            <button class="btn btn-primary edt" type="button" @click="editRec()" title="Изменить"> <img src="./assets/edit-button.svg" class="image-btn"> </button> 

          </h5>
          <div class="card-body test">
               

            <!--<h4 class="card-title">Title</h4>-->       
            <div class="hover-container" @click="openUrl()">
              <img v-bind:src="val.imgUrl" alt="Изображение не найденно" width="100%" height="100%"> 
              <!-- width="100" height="130" -->
              
              <div class="after">
                <!-- This is some contentdas-->
                 <img src="./assets/play-button.png">
               </div>

            </div>
            <!-- <p class="card-text">{{data.procCnt}}</p>-->
            <br>
            <pagination :total-pages="99" :total="120" :current-page="Number(val.procCnt)" @pagechanged="onPageChange"></pagination>

          </div>
          <div class="card-footer text-muted test">
            {{val.lastDate }} 
          </div>
  </template>
</div>
</template>

<script>
import pagination from './pagination.vue'
  export default {
  name :'item',
  props:{
    val:{
      type: Object,
      required: false,
      /*default: function () {
        return {id:1, name:'test_55', procCnt:2, url:'', imgUrl:'testImg'}
      }*/
    },
    isEditMode:{
      required: false,
      default: false
    },
    isSelected:{
      type: Boolean,
      required: true,
      default: false
    }
    ,fieldset:{
      type: Object,
      required: true,      
    }
  },
  data() {  
        return {
        DataToSave: {},
        loading: false
      }
    }
  ,computed: {
    itemDispName () {
     if (this.val.name)
      return this.val.name.substr(0, 16)
    }
  }
  ,methods: {
    editRec:function(){
     this.loading = false 
     Object.assign(this.DataToSave, this.val)
     this.$emit('ItemOnEdit', this.val.id)     
    },
    saveRec:function(){
      //this.editid=''
      this.loading = true
      console.log('save')
       console.log(this.DataToSave)
      this.$emit('ItemOnSave', this.DataToSave)
      this.DataToSave={}
    },
    onPageChange: function (page) {
      this.$emit('ItemOnCntChange', {id:this.val.id, cnt:page})
    },
    onSelectItem() {
      this.$emit('onSelectItem', this.val.id)
    },
    openUrl() {
              // alert('openUrl')              
              let NevCnt = Number(this.val.procCnt)+1
              this.$emit('ItemOnCntChange', {id:this.val.id, cnt:NevCnt})
                            
              var url = this.val.url;
              if (url && url.indexOf('http') === -1) {
                url = 'http://'+url
                var prm='scrollbars=1,top=0,left=0,resizable=1,width=680,height=350';              
                window.open(url,'pmw',prm);
              }


    }
  },
   components: {
     pagination
  },
  created: function () { 
     
     Object.assign(this.DataToSave, this.fieldset) 
    // eventBus.$on("treeNodeGetEditData", (Data)=>{
    //   console.log('treeNodeGetEditData')
    //   // console.log(Data)
    //    // Object.assign(this.DataToSave, Data) 
    //    // console.log(this.DataToSave)

    // })
  }

  }
      /*<template v-if="editid===key.id">       
         ss
        <h5 class="card-header">
          <span><input class="input" v-model="key.name"></span>  
          <span><button class="btn btn-primary edt" type="button" @click="saveRec()" >save </button></span> 
        </h5>
        <div class="card-body">
          <table>
            <tr><td> <label>Url </label> </td><td><input class="input" v-model="key.url" > </td></tr>
            <tr><td> <label>Url for image </label> </td><td><input class="input" v-model="key.imgUrl" > </td></tr>
            <tr><td> <label>Process </label> </td><td><input class="input" v-model="key.procCnt" > </td></tr>
          </table>
        </div>
        <div class="card-footer text-muted">
          2 days ago
        </div>
      </template>
      <template v-else>      
        <h5 class="card-header">{{key.name}}  
          <button class="btn btn-primary edt" type="button" @click="editRec(key.id)" >edit {{filteredData[0].id}}</button> 
        </h5>
        <div class="card-body">
          <!--<h4 class="card-title">Title</h4>-->       
          <img v-bind:src="key.url" alt="Изображение не найденно" width="100" height="130" class="leftimg"> {{key.procCnt}}
          <!-- <p class="card-text">{{key.procCnt}}</p>-->
          <button class="btn btn-primary" type="button">edit</button>
        </div>
        <div class="card-footer text-muted">
          2 days ago
        </div>
      </template>*/
</script>

 <style  src="./bootstrap.min.css" scoped></style>

<style scoped>

/*futer*/
/*.footer { 
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: red;
  color: white;
  text-align: center;
}*/

/*Scrollbar */
/* width */
/*::-webkit-scrollbar {
  width: 20px;
}*/

/* Track */
/*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
} */
/* Handle */
/*::-webkit-scrollbar-thumb {
  background: red; 
  border-radius: 10px;
}*/

/* Handle on hover */
/*::-webkit-scrollbar-thumb:hover {
  background: #b30000; min-width: 165px;
}*/
 .card {  min-width: 165px !important;}
.edt{
    float:right;  
    display : inline;
}
.input{
  width:7em;
  display : inline;
  line-height: 1;
  /*height:12px;*/
}

html *
{
   /*font-size: xx-small !important;*/
  /*color: #000 !important;
   font-family: Arial !important;*/
}

.card-header {
    padding: .15rem -0;
     height: 33px;
}
.card-footer {
    padding: .2rem .25rem;
}

.card-body {
    padding: .5rem -0;
    width: 174px;
    height: 194px;
    background-color: #E8E8E8;
}

.btn {
      padding: .1rem -0;
}
.pnl-selected{
  background-color: #a4c400;
}

.hover-container {
    // position: relative;
    width: 165px;
    height: 140px;
    // padding-top : 10px;
    padding-left : 15px;
    padding-right : 5px;

      // max-width: 140px;
      // max-height: 125px;

    max-width: 165px;
    max-height: 140px;


}

/*.hover-container*/ .after {
    position: absolute;
    top: 41px;
    // left: 0;
    width: 145px;
    height: 140px;

    max-width: 145px;
    max-height: 140px;

    // max-width: 155px; //165
    // max-height:155px;
    // max-width: 165px;
    // max-height: 140px;

    display: none;
    color: #FFF;

    padding-top : 10px;
    padding-left : 12px;
    padding-right : 10px;

}
.hover-container:hover .after {
    display: block;
    background: rgba(0, 0, 0, .6);
}
.btn-primary {
    background-color: #007bff3d;
  }
  .test {
    // max-width: 165px;
    // max-height: 155px;
    // background-color: #007bff3d;

    margin-left: auto;
    margin-right: auto;

  }

   .image-wrap {
  width: 64px;
  height: 64px;
  // border: 1px solid gray;
  margin: auto; /* Выравниваем по центру */

  /*display:flex;*/
  // align-items: center;
  /*justify-content: center;*/
}

</style>

