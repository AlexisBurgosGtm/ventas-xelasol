classDbOp={
    UpdatePedidoEnviado: async (correlativo)=>{
        
        var data = {
            st: 0
        }
        
        DbConnection = new JsStore.Instance(DbName);

        DbConnection.update({
            In: "documentos",
            Set: data,
            Where: {
                correlativo : Number(correlativo)
            }
        }, function (rowsAffected) {
            //alert(rowsAffected + " rows Updated");
            if (rowsAffected > 0) {
                console.log('Pedido marcado como enviado');
            }
        }, function (error) {
                console.log(error.Message)
        })
    },

    SelectPickingVentas: async ()=>{

    },
    GetTotalVentas: async(ContainerName)=>{
        let contenedorT = document.getElementById(ContainerName);
        DbConnection = new JsStore.Instance(DbName);

        DbConnection.select({
            From: "documentos"
            
        }, function (docs) {
            
            let varSubtotal = parseFloat(0);
            let varSubtotalCosto = parseFloat(0);
            
            docs.forEach(function (doc) {
               varSubtotal += parseFloat(doc.totalventa);
               varSubtotalCosto += parseFloat(doc.totalcosto);
            }, function (error) {
                console.log(error);
                varSubtotal = 0;
            })
            contenedorT.innerHTML = funciones.setMoneda(varSubtotal,'Q');
            //GlobalTotalVenta = varSubtotal;
            //GlobalTotalCosto = varSubtotalCosto;

        });
    }
}