var DbConnection;
window.onload = function () {
    initiateDb();
};

const DbName = "AresPOSv4";

function initiateDb() {
    
    JsStore.isDbExist(DbName, function (isExist) {
        if (isExist) {
            DbConnection = new JsStore.Instance(DbName);
          
        } else {
            var tbl = getTbl();
            DbConnection = new JsStore.Instance().createDb(tbl);
            dbInsertCorrelativoDoc();
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
                Name: "coddoc",
                NotNull: false,
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
            }
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
            {
                Name: "coddoc",
                NotNull: true,
                DataType: "string"
            },
            {
                Name: "correlativo"
            },
            {
                Name: "codcliente",
                NotNull: true
            },
            {
                Name: "nomcliente",
                DataType: "string"
            },
            {
                Name: "totalventa",
                NotNull: true
            }
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
            {
                Name: "coddoc",
                NotNull: true,
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
            }
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

    var DataBase = {
        Name: DbName,
        Tables: [TblTemp,TblDocumentos,TblDocproductos,tblTipoDocumentos]
    }

    return DataBase;
};

// crea un único registro al cargar la db por primera vez
// para poder hacerle update luego con cada venta
function dbInsertCorrelativoDoc() {
    var data = {
        coddoc:'ENVIOS',
        correlativo:1
    }

    DbConnection.insert({
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
        return varSubtotal;
    });
};


// inserta un registro en temp ventas para hacer offline el pedido
function dbInsertTempVentas(coddoc,correlativo,codprod,desprod,codmedida,cantidad,precio,subtotal) {
    var data = {
        coddoc:coddoc,
        correlativo:correlativo,
        codprod:codprod,
        desprod:desprod,
        codmedida:codmedida,
        cantidad:cantidad,
        precio:precio,
        subtotal:subtotal
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
        
        productos.forEach(function (prod) {
           varSubtotal += parseFloat(prod.subtotal);
        }, function (error) {
            console.log(error);
        })
        contenedor.innerHTML = funciones.setMoneda(varSubtotal,'Q');
        GlobalTotalVenta = varSubtotal;
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
function dbInsertDocumentos(coddoc,correlativo,codcliente,nomcliente,totalventa) {
    var data = {
        coddoc:coddoc,
        correlativo:correlativo,
        codcliente:codcliente,
        nomcliente:nomcliente,
        totalventa:totalventa
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

//Selecciona todos los Documentos guardados 
function dbSelectDocumentos(contenedor) {
    DbConnection.select({
        From: "documentos"
    }, function (documentos) {

        var HtmlString = "";
        documentos.forEach(function (doc) {
            HtmlString += "<tr>" + 
            "<td class='col-1-sm col-1-md'>" + doc.Id + "</td>" + 
            "<td class='col-6-sm col-6-md'>" + doc.nomcliente + "</td>" + 
            "<td class='col-3-sm col-3-md'>" + funciones.setMoneda(doc.totalventa,'Q') + "</td>" +
            "<td class='col-1-sm col-1-md'>" + 
              "<button class='btn btn-round btn-icon btn-default btn-sm'>" +
                "<i class='now-ui-icons design_bullet-list-67'></i>" +
              "</button>" + 
            "</td></tr>";
        }, function (error) {
            console.log(error);
        })
        contenedor.innerHTML = HtmlString;
    });
};