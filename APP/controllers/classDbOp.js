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
    }
}