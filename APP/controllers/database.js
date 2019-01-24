var DbConnection;
window.onload = function () {
    initiateDb();
};
//nombre de la base de datos
const DbName = "AresPOSv8";

function initiateDb() {
    
    JsStore.isDbExist(DbName, function (isExist) {
        if (isExist) {
            DbConnection = new JsStore.Instance(DbName);
            //inicializa el token existente
            dbGetToken();
          
        } else {

            var tbl = getTbl();
            DbConnection = new JsStore.Instance().createDb(tbl);
            //inicializa el correlativo
            dbInsertCorrelativoDoc();
            //inicializa el token
            dbInsertToken('SN');
        }
    });
}

// define las tablas de la base de datos
function getTbl() {
    //TABLA VENTAS TEMPORAL
    var TblTemp = {
        Name: "tempVentas",
        Columns: [{
            Name: "Id",
            PrimaryKey: true,
            AutoIncrement: true
        },
            {
                Name: "empnit",
                DataType: "string"
            },
            {
                Name: "coddoc",
                DataType: "string"
            },
            {
                Name: "correlativo"
            },
            {
                Name: "codprod",
                NotNull: true,
                DataType: "string"
            },
            {
                Name: "desprod",
                NotNull: true,
                DataType: "string",
            },
            {
                Name: "codmedida",
                NotNull: true,
                DataType: "string"
            },
            {
                Name: "cantidad",
                NotNull: true
            },
            {
                Name: "precio",
                NotNull: true
            },
            {
                Name: "subtotal",
                NotNull: true
            },
            { Name: "equivale" },
            { Name: "costo", NotNull: true },
            { Name: "totalcosto", NotNull: true }
        ]
    }
    //TABLA DOCUMENTOS
    var TblDocumentos = {
        Name: "documentos",
        Columns: [{
            Name: "Id",
            PrimaryKey: true,
            AutoIncrement: true
        },
            { Name: "empnit", DataType: "string" },
            { Name: "coddoc", NotNull: true, DataType: "string" },
            { Name: "correlativo" },
            { Name: "anio" },
            { Name: "mes" },
            { Name: "dia" },
            { Name: "codcliente", NotNull: true },
            { Name: "nomcliente", DataType: "string" },
            { Name: "totalventa", NotNull: true },
            { Name: "totalcosto", NotNull: true }
        ]
    }
    //TABLA DOCPRODUCTOS
    var TblDocproductos = {
        Name: "docproductos",
        Columns: [{
            Name: "Id",
            PrimaryKey: true,
            AutoIncrement: true
        },
            { Name: "empnit", DataType: "string" },
            { Name: "coddoc", NotNull: true, DataType: "string" },
            { Name: "correlativo" },
            { Name: "codprod", NotNull: true, DataType: "string" },
            { Name: "desprod", NotNull: true, DataType: "string" },
            { Name: "codmedida", NotNull: true, DataType: "string" },
            { Name: "cantidad", NotNull: true },
            { Name: "precio", NotNull: true },
            { Name: "subtotal", NotNull: true },
            { Name: "equivale"},
            { Name: "costo", NotNull: true },
            { Name: "totalcosto", NotNull: true }
        ]
    }
    //TABLA DOCUMENTOS
    var tblTipoDocumentos = {
        Name: "tipodocumentos",
        Columns: [{
            Name: "Id",
            PrimaryKey: true,
            AutoIncrement: true
        },
            {
                Name: "coddoc",
                DataType: "string"
            },
            {
                Name: "correlativo"
            }
        ]
    }
     //TABLA DOCUMENTOS
     var tblSesion = {
        Name: "sesion",
        Columns: [{
            Name: "Id",
            PrimaryKey: true,
            AutoIncrement: true
        },
            {
                Name: "usuario",
                DataType: "string"
            },
            {
                Name: "empnit",
                DataType: "string"
            },
            {
                Name: "token",
                DataType: "string"
            },
        ]
    }
    var DataBase = {
        Name: DbName,
        Tables: [TblTemp,TblDocumentos,TblDocproductos,tblTipoDocumentos,tblSesion]
    }

    return DataBase;
};

//****** MANEJO DEL TOKEN  *****/
//inserta el token en la tabla de sesiones para ser usado en toda la app
async function dbInsertToken(token) {
    //en la tabla sesion
    var data = {
        usuario:'SN',
        empnit: 'SN',
        token:token
    }

    await DbConnection.insert({
        Into: "sesion",
        Values: [data]
    }, function (rowsAdded) {
        console.log('Token ingresado exitosamente')
    }, function (err) {
        console.log(err);
    })
};

// OBTIENE EL TOKEN 
//async function dbGetToken() {
function dbGetToken() {
 
    GlobalToken='PROCTERREU';

        try {
            CargarComboEmpresas();            
        } catch (error) {
            
        }
    
    
    /*
    await DbConnection.select({
        From: "sesion",
        Where: {
                Id: 1
            }
    }, function (token) {
        let result = '';
        token.forEach(function (prod) {
           result = prod.token;
        }, function (error) {
            console.log(error);
        })
        GlobalToken = result;
         //carga las empresas en el login
         CargarComboEmpresas();    
        //return result;
        console.log('GlobalToken es: ' + GlobalToken)
    });
    */

};

// Actualiza el token existente
function dbUpdateToken(token) {
    var data = {
        token: token
    }

    DbConnection.update({
        In: "sesion",
        Set: data,
        Where: {
            Id: Number(1)
        }
    }, function (rowsAffected) {
        //alert(rowsAffected + " rows Updated");
        if (rowsAffected > 0) {
            funciones.Aviso('TOKEN Actualizado Exitosamente');
        }
    }, function (error) {
        //alert(error.Message);
        console.log(error.Message)
    })
};

// crea un único registro al cargar la db por primera vez
// para poder hacerle update luego con cada venta
async function dbInsertCorrelativoDoc() {
    //en la tabla correlativos
    var data = {
        coddoc:'ENVIOS',
        correlativo:1
    }

    await DbConnection.insert({
        Into: "tipodocumentos",
        Values: [data]
    }, function (rowsAdded) {
        console.log('Correlativo Docs Inicial Generado con éxito')
    }, function (err) {
        console.log(err);
    })

 
};
//actualiza el correlativo de documento de ventas
function dbUpdateCorrelativoDoc(correlativo,aviso) {
    var data = {
        coddoc:'ENVIOS',
        correlativo: Number(correlativo)
    }

    DbConnection.update({
        In: "tipodocumentos",
        Set: data,
        Where: {
            Id: Number(1)
        }
    }, function (rowsAffected) {
        //alert(rowsAffected + " rows Updated");
        if (rowsAffected > 0) {
            console.log('correlativo actualizado exitosamente');
            if (aviso=='SI'){
                funciones.Aviso('Correlativo Actualizado Exitosamente');
            };
        }
    }, function (error) {
        //alert(error.Message);
        console.log(error.Message)
    })
};
// CARGA EL CORRELATIVO ACTUAL
function dbGetCorrelativo(Id,contenedor) {
    DbConnection.select({
        From: "tipodocumentos",
        Where: {
                Id: Number(Id)
            }
    }, function (documentos) {
        
        let varSubtotal = parseFloat(0);
        
        documentos.forEach(function (prod) {
           varSubtotal += parseFloat(prod.correlativo);
        }, function (error) {
            console.log(error);
        })
        contenedor.value = varSubtotal;
    });
};

function dbGetValCorrelativo(Id) {
    DbConnection.select({
        From: "tipodocumentos",
        Where: {
                Id: Number(Id)
            }
    }, function (documentos) {
        
        let varSubtotal = parseFloat(0);
        
        documentos.forEach(function (prod) {
           varSubtotal += parseFloat(prod.correlativo);
        }, function (error) {
            console.log(error);
        })
        GlobalCorrelativo = varSubtotal;
    });
};

// inserta un registro en temp ventas para hacer offline el pedido
function dbInsertTempVentas(coddoc,correlativo,codprod,desprod,codmedida,cantidad,precio,subtotal,empnit,equivale,costo,totalcosto) {
    var data = {
        empnit:empnit,
        coddoc:coddoc,
        correlativo:correlativo,
        codprod:codprod,
        desprod:desprod,
        codmedida:codmedida,
        cantidad:cantidad,
        precio:precio,
        subtotal:subtotal,
        equivale:equivale,
        costo:costo,
        totalcosto:totalcosto
    }

    DbConnection.insert({
        Into: "tempVentas",
        Values: [data]
    }, function (rowsAdded) {
        console.log('datos tempventas agregados exitosamente')
    }, function (err) {
        console.log(err);
        //alert('Error Occured while adding data')
    })
};
// CARGA LA LISTA DE LA TABLA TEMP
function dbSelectTempVentas(contenedor) {
    DbConnection.select({
        From: "tempVentas"
    }, function (productos) {

        var HtmlString = "";
        productos.forEach(function (prod) {
            HtmlString += "<tr Id=" + prod.Id + ">" + 
            "<td class='col-4'>" + prod.desprod + "</td>" + 
            "<td class='col-2'>" + prod.codmedida + "</td>" + 
            "<td class='col-1'>" + prod.cantidad + "</td>" + 
            "<td class='col-2'>" + funciones.setMoneda(prod.subtotal,'Q') + "</td>" +
            "<td class='col-1'>" + 
              "<button class='btn btn-round btn-icon btn-danger' onclick='dbDeleteTempProducto(" + prod.Id +");'> x </button>" + 
            "</td></tr>";
        }, function (error) {
            console.log(error);
        })
        contenedor.innerHTML = HtmlString;
    });
};
// CALCULA EL TOTAL DE LA VENTA SEGÚN LA TABLA TEMP VENTAS
function dbTotalTempVentas(contenedor) {
    DbConnection.select({
        From: "tempVentas"
    }, function (productos) {
        
        let varSubtotal = parseFloat(0);
        let varSubtotalCosto = parseFloat(0);
        
        productos.forEach(function (prod) {
           varSubtotal += parseFloat(prod.subtotal);
           varSubtotalCosto += parseFloat(prod.totalcosto);
        }, function (error) {
            console.log(error);
        })
        contenedor.innerHTML = funciones.setMoneda(varSubtotal,'Q');
        GlobalTotalVenta = varSubtotal;
        GlobalTotalCosto = varSubtotalCosto;
    });
};

function dbGetTotalTempVentas() {
    DbConnection.select({
        From: "tempVentas"
    }, function (productos) {
        
        let varSubtotal = parseFloat(0);
        
        productos.forEach(function (prod) {
           varSubtotal += parseFloat(prod.subtotal);
        }, function (error) {
            console.log(error);
        })

        return varSubtotal;
    });
};

// elimina un registro del pedido temp
function dbDeleteTempProducto(prodId) {
      DbConnection.delete({
        From: 'tempVentas',
        Where: {
            Id: Number(prodId)
        }
    }, function (rowsDeleted) {
        console.log(rowsDeleted + ' rows deleted');
        if (rowsDeleted > 0) {
            document.getElementById(prodId).remove();
            dbTotalTempVentas(txtTotalVenta);
        }
    }, function (error) {
        alert(error.Message);
    })
};

// Elimina toda la lista temporal de ventas
function dbDeleteTempProductoAll(confirm) {
    DbConnection.delete({
      From: 'tempVentas',
      
  }, function (rowsDeleted) {
      console.log(rowsDeleted + ' rows deleted');
      if (rowsDeleted > 0) {
          dbTotalTempVentas(txtTotalVenta);
          if(confirm=='SI'){
            funciones.showNotification('bottom','left','Lista eliminada exitosamente','error');
          }
      }
  }, function (error) {
      alert(error.Message);
  })
};

// inserta un PEDIDO EN LA TABLA DOCUMENTOS
function dbInsertDocumentos(coddoc,correlativo,codcliente,nomcliente,totalventa,empnit,totalcosto) {
    var data = {
        empnit:empnit,
        coddoc:coddoc,
        correlativo:correlativo,
        codcliente:codcliente,
        nomcliente:nomcliente,
        totalventa:totalventa,
        totalcosto:totalcosto
    }

    DbConnection.insert({
        Into: "documentos",
        Values: [data]
    }, function (rowsAdded) {
       //funciones.showNotification('bottom','right','Venta Registrada exitosamente!!',)
       funciones.Aviso('Venta Registrada exitosamente!!');
    }, function (err) {
        console.log(err);
        //alert('Error Occured while adding data')
    })
};

// inserta un PEDIDO EN LA TABLA DOCPRODUCTOS
function dbInsertDocproductos(coddoc,correlativo,empnit) {
    //declaro las variables a usar
    let strData = '';

    DbConnection.select({
        From: "tempVentas"
    }, function (productos) {

        productos.forEach(function (prod) {
            let data ={
                empnit:empnit,
                coddoc:coddoc,
                correlativo:correlativo,
                codprod:prod.codprod,
                desprod:prod.desprod,
                codmedida:prod.codmedida,
                cantidad:prod.cantidad,
                precio:prod.precio,
                subtotal:prod.subtotal,
                equivale:prod.equivale,
                costo:prod.costo,
                totalcosto:prod.totalcosto
            };
              // inserta los datos en la tabla docproductos
            DbConnection.insert({
                Into: "docproductos",
                Values: [data]
            }, function (rowsAdded) {
                //funciones.Aviso('Venta Registrada exitosamente!!');
                console.log('Row agregada a docproductos')
            }, function (err) {
                console.log('Error Docproductos: ' + String(err));
            })

        }, function (error) {
            console.log(error);
        })
        console.log('DATOS AGREGADOS A DOCPRODUCTOS');
  
    });
};

//Selecciona todos los Documentos guardados 
function dbSelectDocumentos(contenedor) {
    DbConnection.select({
        From: "documentos"
    }, function (documentos) {

        var HtmlString = "";
        documentos.forEach(function (doc) {
            if (doc.empnit==GlobalEmpnit){
                HtmlString += "<tr>" + 
                "<td class='col-1-sm col-1-md'>" + doc.Id + "</td>" + 
                "<td class='col-6-sm col-6-md'>" + doc.nomcliente + "</td>" + 
                "<td class='col-3-sm col-3-md'>" + funciones.setMoneda(doc.totalventa,'Q') + "</td>" +
                "<td class='col-1-sm col-1-md'>" + 
                    `<button class='btn btn-round btn-icon btn-warning btn-sm' 
                        data-toggle='modal' data-target='#ModalOpcionesPedido' 
                        onClick="fcnCargarDatosPedido('${doc.Id}','${doc.correlativo}','${doc.nomcliente}','${doc.totalventa}');">
                        <i class='now-ui-icons design_bullet-list-67'></i>
                    </button>` + 
                "</td></tr>";
            }
            GlobalSelectedForm= 'viewVentas';
            GlobalBool = false;
            
        }, function (error) {
            console.log(error);
        })
        contenedor.innerHTML = HtmlString;
    });
};

//********* ELIMINACIÓN DE UN PEDIDO *******/
// elimina pedido en tabla documentos
function dbDeletePedido(correlativo) {
    DbConnection.delete({
            From: 'documentos',
            Where: {
                correlativo: Number(correlativo)
            }
        }, function (rowsDeleted) {
            if (rowsDeleted > 0) {
                //funciones.Aviso('Pedido Eliminado Exitosamente')
                dbDeletePedidoDetalle(correlativo);
                
            }
        }, function (error) {
                alert(error.Message);
        })
};

// elimina pedido en tabla docproductos
function dbDeletePedidoDetalle(correlativo) {
    DbConnection.delete({
            From: 'docproductos',
            Where: {
                correlativo: Number(correlativo)
            }
        }, function (rowsDeleted) {
            if (rowsDeleted > 0) {
               // funciones.Aviso('Pedido Eliminado Exitosamente');
                //btnVentas.click();
            }
        }, function (error) {
                alert(error.Message);
        })
};

//********* ELIMINACIÓN DE UN PEDIDO *******/
/*******************************************/


// ENVIAR UN PEDIDO SEGUN SU ID
function dbSendPedido(Id) {
      
    DbConnection.select({
        From: "documentos",
        Where: {
                correlativo: Number(Id)
            }
    }, function (documento) {
                        
        documento.forEach(function (doc) {
           var correlativo = doc.correlativo;
           var codcliente = doc.codcliente;
           var totalventa = doc.totalventa;
           var totalcosto = doc.totalcosto;
            
           //SyncDocumentos('iEx',GlobalCoddoc,correlativo,2018,12,2,codcliente,GlobalCodven,totalventa)
           SyncDocumentos(GlobalToken,GlobalCoddoc,correlativo,2019,1,6,codcliente,GlobalCodven,totalventa,totalcosto);
            //.then(funciones.Aviso('Datos enviados...'))

        }, function (error) {
            console.log(error);
        })
       
    });

    DbConnection.select({
        From: "docproductos",
        Where: {
                correlativo: Number(Id)
            }
    }, function (documento) {
                        
        documento.forEach(function (doc) {
           var correlativo = doc.correlativo;
           var codprod = doc.codprod;
           var desprod = doc.desprod;
           var cantidad = doc.cantidad;
           var codmedida = doc.codmedida;
           var precio = doc.precio;
           var totalprecio = doc.subtotal;
           var equivale = doc.equivale;
           var costo = doc.costo;
           var totalcosto = doc.totalcosto;1

           //console.log(doc.desprod);                      
           SyncDocumentosDet(GlobalToken,GlobalEmpnit,GlobalCoddoc,correlativo,2019,1,6,codprod,desprod,codmedida,equivale,cantidad,costo,totalcosto,precio,totalprecio);
  
        }, function (error) {
            console.log(error);
        })

     
    });
};
