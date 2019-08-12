import {/*get,*/ getTableByEntry, prepareTreeData} from './utils'

export default function  buidTree (data) {
  
  $("#tree").fancytree({
   // checkbox: true,
   extensions: ["dnd"],
    selectMode: 3,
    source: data,/*{
      url:
        "https://cdn.rawgit.com/mar10/fancytree/72e03685/demo/ajax-tree-products.json"
    },*/
    lazyLoad: function(event, data) {
      // alert('lazyLoad')
      //alert(data.id);
      var dfd = new $.Deferred(), id;
      data.result = dfd.promise();
      if (typeof id == 'undefined') {
        id = data.node.data.id
      } else {
        id = null
      }
    jrpc.call('mTree',['s',id]).then(function (result) {
      try {
        var treeData = getTableByEntry(result, ["id","title", "folder"], 'folders');
        var treeData = prepareTreeData(treeData);        
         dfd.resolve(treeData); 
      } catch(e) {
        console.log(e);
        dfd.resolve();
      }

    });
  //  ge
      // get("/folders/data?act=s&id="+id).then(function(response) {
      //   console.log(response)
      //     response = prepareTreeData(getTableByEntry(response, ["id","title", "folder"], 'folders'))
      //   console.log(response)
      //   dfd.resolve(response);          
      //     //  data.result = getTableByEntry(response, ["id","title", "folder"], 'folders');  /*[{id: "2", title: "test2", folder: ""}]*/;//{url: "https://cdn.rawgit.com/mar10/fancytree/72e03685/demo/ajax-sub2.json"};
      //       }).catch(function(error){
      //           console.log("Error!!!");
      //           console.log(error);
      //       });
//data.result =  await fetch('/mFolders.php?act=s&id=null')  // [{id: "2", title: "test2", folder: ""}];
    },

    activate: function(event, data) {
      // alert('activate')
      // console.log(data.node)
      let ndata = {
        id :  data.node.data.id
        ,name : data.node.title
      }
      eventBus.$emit('treeNodeActivate',ndata, 2);
      //  var TrunData = function () {
     //    while (appInfo.data.length > 0) {
     //         appInfo.data.shift()
     //    }        
     //  }


     //  $("#statusLine").text(event.type + ": " + data.node);
     // TrunData();
     // // alert (data.node.data.id);
     // jrpc.call('mFolders',[data.node.data.id]).then(function (result) {              

     //            console.log( getTableByEntry(result, ["id","name", "url", "imgUrl", "procCnt"]) );

     //            if (result) {
     //              appendResultItems( getTableByEntry(result, ["id","name", "url", "imgUrl", "procCnt"]) )
     //            }
     //    });
      // }
    },
    select: function(event, data) {
        // alert('select')
      $("#statusLine").text(
        event.type + ": " + data.node.isSelected() + " " + data.node
      );
    },
  dnd: {
        autoExpandMS: 400,
        focusOnClick: true,
        preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
        preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
        dragStart: function(node, data) {
          /** This function MUST be defined to enable dragging for the tree.
           *  Return false to cancel dragging of node.
           */
          return true;
        },
        dragEnter: function(node, data) {
          /** data.otherNode may be null for non-fancytree droppables.
           *  Return false to disallow dropping on node. In this case
           *  dragOver and dragLeave are not called.
           *  Return 'over', 'before, or 'after' to force a hitMode.
           *  Return ['before', 'after'] to restrict available hitModes.
           *  Any other return value will calc the hitMode from the cursor position.
           */
          // Prevent dropping a parent below another parent (only sort
          // nodes under the same parent)
/*           if(node.parent !== data.otherNode.parent){
            return false;
          }
          // Don't allow dropping *over* a node (would create a child)
          return ["before", "after"];
*/
         // console.log(node);
           return false;// ["over", "after"];
        },
        dragDrop: function(node, data) {
          /** This function MUST be defined to enable dropping of items on
           *  the tree.
           */
          // if (!data.otherNode.data.id){ //}
         /*  var params  = 'act='+data.hitMode
           params=params+'&id='+data.otherNode.data.id
           params=params+'&idDest='+node.data.id*/
           //params=params+'&hm='+data.hitMode
          console.log("/mFolders.php?"+params);
           // get("/mFolders.php?"+params).then(function(res) {console.log(res)})
           var params = {
            type:data.hitMode
            ,idx:data.otherNode.data.id
            ,IdDest:node.data.id
           }
            jrpc.call('mTree',params).then(function (result) { 
                console.log(result) 
              });

          data.otherNode.moveTo(node, data.hitMode);
          if (data.hitMode==="over") {node.folder = true}
        }
      }



  });

  //  var buildDialog  = function() {


  //   var dialog={};this.test = 'sss';

  //   function addUser() {
           
  //   alert($( "#name" ).val())
  //     dialog.dialog( "close" );
      
  //     return true;
  //   }
 
  //   dialog = $( "#dialog-form" ).dialog({
  //     autoOpen: false,
  //     // height: 400,
  //     // width: 350,
  //     // modal: true,
  //     buttons: {
  //       "Create an account": addUser,
  //       Cancel: function() {
  //         dialog.dialog( "close" );
  //       }
  //     },
  //     close: function() {
  //       dialog.form[ 0 ].reset();
  //       // allFields.removeClass( "ui-state-error" );
  //     }
  //   });
 
  //   dialog.form = dialog.find( "form" ).on( "submit", function( event ) {
  //     event.preventDefault();
  //     addUser();
  //   });
 
  //   $( "#open-Dialog" ).button().on( "click", function() {
  //     dialog.dialog( "open" );
  //   });
  // }

  // buildDialog()
  // alert(buildDialog.test)


  class dlg {
    constructor(/*name*/){
            //this.name = name;
            var self = this
          this.dialog = $( "#dialog-form" ).dialog({
          autoOpen: false,
          // height: 400,
          // width: 350,
          // modal: true,
          buttons: {
            "Ok": function() {
              //self.dialog.dialog( "close" );
              self.addUser();
            },
            Cancel:function() {
              self.dialog.dialog( "close" );
            }
          },
          close: function() {
            self.form[ 0 ].reset();
          }
        });
     
        this.form = this.dialog.find( "form" ).on( "submit", function( event ) {
          event.preventDefault();
           self.addUser();
        });
    }

    addUser(){           
            //  alert($( "#name" ).val())
             //this.dialog( "close" );
            this.afterOpen($( "#name" ).val());
            this.dialog.dialog( "close" );             
                
            return true;
    }
    open(value, afterOpen){
      $( "#name" ).val(value)
      this.dialog.dialog( "open" );
      this.afterOpen = afterOpen;
    }
  }


var dialog = new dlg()
//d.Cancel()
//console.log(d)


      $.contextMenu({
      selector: "#tree span.fancytree-title",
      items: {
        "add": {name: "Добавить", icon: "add",
            callback: function(key, opt){        
              var node = $.ui.fancytree.getNode(opt.$trigger);
              // alert(node.parent.data.id)
              dialog.open(node.title, function(name) {
                 var params = {
                       type:'i'
                      ,name:name
                      ,idx:node.data.id
                 }
                 node.data.folder=true
                 jrpc.call('mTree',params).then(function (result) { 
                      node.addNode({id:1, title: params.name, folder:true})                      
                 });
              });
            }
          },
        "sep1": "----",
        "edit": {name: "Переименовать", icon: "edit", disabled: false,
             callback: function(key, opt){        
              var node = $.ui.fancytree.getNode(opt.$trigger);
              //alert("Clicked on " + key + " on " + node);
        
              dialog.open(node.title, function(s) {
                 var params = {
                       type:'u'
                      ,name:s
                      ,idx:node.data.id
                 }

                jrpc.call('mTree',params).then(function (result) { 
                   node.title = s
                   node.li.children[0].children[2].innerText = s            
                });

              });
             }
             },
        // "cut": {name: "Cut", icon: "cut",
        //     callback: function(key, opt){
        //       var node = $.ui.fancytree.getNode(opt.$trigger);
        //       alert("Clicked on " + key + " on " + node);
        //     }
        //   },
        // "copy": {name: "Copy", icon: "copy"},
        // "paste": {name: "Paste", icon: "paste", disabled: false },
        "delete": {name: "Удалить", icon: "delete", disabled: false,
        callback: function(key, opt){        
              // var node = $.ui.fancytree.getNode(opt.$trigger);            
              // node.remove()              
             }
             },
        // "more": {name: "More", items: {
        //   "sub1": {name: "Sub 1"},
        //   "sub1": {name: "Sub 2"}
        //   }}
        },
      callback: function(itemKey, opt) {
        var node = $.ui.fancytree.getNode(opt.$trigger);
        alert("select " + itemKey + " on " + node);
      }
    });
    
}