export function get(url) {
  return new Promise(function(succeed, fail) {
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function() {
      if (request.status < 400)
        succeed(request.response);
      else
        fail(new Error("Request failed: " + request.statusText));
    });
    request.addEventListener("error", function() {
      fail(new Error("Network error"));
    });
    request.send();
  });
}
/*let Fields = ["id","name"] let Entry = 'folders'*/
export function getTableByEntry (data, Fields, Entry="")  {
  // data = JSON.parse(data);
   if (Entry!="" && data[Entry] != undefined ) {
        data = data[Entry] 
   }
   let i = 0; let j=0;  let res = [];
   if (data) {
     for (j=0; j<data.length;j++) {
          let ndt = {};
         for (i=0; i < Fields.length;i++) { ndt[Fields[i]] = data[j][i] };
             //console.log(ndt)
            res.push(ndt)
    }    
   } else {
    res = []
   }
   return  res
}

export function prepareTreeData (data) {
  let i = 0;
  for (i=0; i<data.length;i++){
    if (data[i].folder==1) {
      data[i].folder = true
      data[i].lazy = true
    }
  }
  return data;
}