
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
    };


async function SyncDocumentosDet(token,empnit,coddoc,correlativo,anio,mes,dia,codprod,desprod,codmedida,equivale,cantidad,costo,totalcosto,precio,totalprecio){
            
        console.log('LLamado fetch en docproductos ' + desprod);

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
                codmedida:codmedida,
                equivale:equivale,
                cantidad:cantidad,
                costo:costo,
                precio:precio,
                totalcosto:totalcosto,
                totalprecio:totalprecio
            });
          
            var peticion = new Request('/api/ventas/docproductos', {
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
                    //funciones.Aviso('Pedido enviado exitosamente!!');
                }
              })
              .catch(
                  ()=>{
                    //funciones.AvisoError('No se logró conectar con el servidor');
                  }
              )
};
      

