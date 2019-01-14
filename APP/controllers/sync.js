async function SyncDocumentos(token,coddoc,correlativo,anio,mes,dia,codcliente,codven,totalventa){
var empnit = GlobalEmpnit;
    var data =JSON.stringify({
        token:token,
        empnit:empnit,
        coddoc:coddoc,
        correlativo:correlativo,
        anio:anio,
        mes:mes,
        dia:dia,
        codven:codven,
        codcliente:codcliente,
        totalventa:totalventa
    });
  
    var peticion = new Request('/api/ventas/documentos', {
        method: 'POST',
        headers: new Headers({
            // Encabezados
           'Content-Type': 'application/json'
        }),
        body: data
      });

      await fetch(peticion)
      
      .then(function(res) {
        console.log('Estado: ', res.status);
        if (res.status==200)
        {
            funciones.Aviso('Pedido enviado exitosamente!!');
        }
      })
      .catch(
          ()=>{
            funciones.AvisoError('No se logró conectar con el servidor');
          }
      )
}
  


async function SyncDocproductos(token,empnit,coddoc,correlativo,anio,mes,dia,codprod,desprod,codmedida,equivale,cantidad,costo,totalcosto,precio,totalprecio){

    var data =JSON.stringify({
        token:token,
        empnit:empnit,
        coddoc:coddoc,
        correlativo:correlativo,
        anio:anio,
        mes:mes,
        dia:dia,
        codprod:codprod,
        desprod:desprod,
        codmedida: codmedida,
        cantidad:cantidad,
        equivale:equivale,
        costo:costo,
        totalcosto:totalcosto,
        precio:precio,
        totalprecio:totalprecio
    });
  
    var peticion2 = new Request('/api/ventas/docproductos', {
        method: 'POST',
        headers: new Headers({
            // Encabezados
           'Content-Type': 'application/json'
        }),
        body: data
      });

      await fetch(peticion2)
      
      .then(function(res) {
        console.log('Estado: ', res.status);
        if (res.status==200)
        {
            //funciones.Aviso('Pedido enviado exitosamente!!');
        }
      })
      .catch(
          ()=>{
            //funciones.AvisoError('No se logró conectar con el servidor');
          }
      )
}


async function SyncTest(){
    var data = JSON.stringify({nombre:"alexis",apellido:"burgos"});
    console.log(data);

    var peticion = new Request('/api/ventas/test', {
        method: 'POST',
        headers: new Headers({
            // Encabezados
           'Content-Type': 'application/json'
        }),
        body: data
      });

      // Ahora lo utilizamos
     await fetch(peticion)
      .then(function(res) {
        console.log('Estado: ', res.status);
        if (res.status==200)
        {
            funciones.Aviso('Solicitud enviada exitosamente!!');
        }
      })
      .catch(
          ()=>{
            funciones.AvisoError('No se logró conectar con el servidor');
          }
      )
}


async function SyncDocumentos2(token,coddoc,correlativo,anio,mes,dia,codcliente,codven,totalventa){
  var param = "?token=" + token + "&empnit=" + GlobalEmpnit + 
              "&coddoc=" + coddoc + "&correlativo=" + correlativo + 
              "&anio=" + anio + "&mes=" + mes + "&dia=" + dia + 
              "&codven=" + codven + "&codcliente=" + codcliente + "&totalventa=" + totalventa;

  const response = await fetch('/api/ventas/documentos' + param);
  let respuesta = await response
      .then(()=>{
          funciones.Aviso(respuesta)
        });
}
