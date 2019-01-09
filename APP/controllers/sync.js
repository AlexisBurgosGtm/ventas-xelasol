async function SyncDocumentos(token,coddoc,correlativo,anio,mes,dia,codcliente,codven,totalventa){
  var param = "?token=" + token + "&empnit=" + GlobalEmpnit + 
              "&coddoc=" + coddoc + "&correlativo=" + correlativo + 
              "&anio=" + anio + "&mes=" + mes + "&dia=" + dia + 
              "&codven=" + codven + "&codcliente=" + codcliente + "&totalventa=" + totalventa;

  const response = await fetch('/api/ventas/documentos' + param);
  let respuesta = await response
      .then(funciones.Aviso(respuesta));
}

async function SyncTest(){
  
  var data = JSON.stringify({"nombre": "a","apellido":"b"});

  $.ajax({
      url : '/api/ventas/test',
      data : data,
      method : 'post', //en este caso
      dataType : 'json',
      success : function(response){

          alert("funciona bien / " + response);
      },
      error: function(error){
          alert("No funciona");
      }
  });
}
