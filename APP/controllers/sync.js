function SyncDocumentos(token,coddoc,correlativo,anio,mes,dia,codcliente,codven,totalventa){
  var param = "?token=" + token + "&empnit=" + GlobalEmpnit + 
              "&coddoc=" + coddoc + "&correlativo=" + correlativo + 
              "&anio=" + anio + "&mes=" + mes + "&dia=" + dia + 
              "&codven=" + codven + "&codcliente=" + codcliente + "&totalventa=" + totalventa;

  const response = await fetch('/api/ventas/documentos' + param);
  let respuesta = await response
      .then(
        ()=>{
          funciones.Aviso(respuesta); 
        }
      )
     
        
     
  
  

}
