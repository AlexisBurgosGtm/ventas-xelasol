var DbConnection;
window.onload = function () {
    initiateDb();
};

const DbName = "AresPOSv2";

function initiateDb() {
    
    JsStore.isDbExist(DbName, function (isExist) {
        if (isExist) {
            DbConnection = new JsStore.Instance(DbName);
          
        } else {
            var tbl = getTbl();
            DbConnection = new JsStore.Instance().createDb(tbl);
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

    var DataBase = {
        Name: DbName,
        Tables: [TblTemp,TblDocumentos,TblDocproductos]
    }

    return DataBase;
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
            HtmlString += "<tr ItemId=" + prod.Id + ">" + 
            "<td class='col-4'>" + prod.desprod + "</td>" + 
            "<td class='col-2'>" + prod.codmedida + "</td>" + 
            "<td class='col-1'>" + prod.cantidad + "</td>" + 
            "<td class='col-2'>" + funciones.setMoneda(prod.subtotal,'Q') + "</td>" +
            "<td class='col-1'>" + 
              '<a class="btn btn-danger btn-sm btn-round" onClick(dbDeleteTempProducto(' + prod.Id +');>x</a>' + 
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
    });
};
// elimina un registro del pedido temp
function dbDeleteTempProducto(prodId) {
   test();
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
}

function test(){
    console.log('click');
}
