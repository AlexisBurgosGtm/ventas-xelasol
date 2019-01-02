function SyncDocumentos(token,coddoc,correlativo,anio,mes,dia,codcliente,codven,totalventa){
    //var request = new XMLHttpRequest();
    var param = "?token=" + token + "&empnit=" + GlobalEmpnit + "&coddoc=" + coddoc + "&correlativo=" + correlativo + "&anio=" + anio + "&mes=" + mes + "&dia=" + dia + "&codven=" + codven + "&codcliente=" + codcliente + "&totalventa=" + totalventa;
    
    return new Promise((resolve, reject) => {
               
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'api/ventas/documentos' + param);
        xhr.responseType = 'text';
        xhr.onload = function(e) {
            if (this.status == 200) {
            /*              
            var view = xhr.response;
            contenedor.innerHTML ='';
            contenedor.innerHTML = view;
            */
            console.log(xhr.response);
            
            resolve();
  
          } else {
  
            reject();
  
          }
        }
  
        xhr.send();
  
      });
}
