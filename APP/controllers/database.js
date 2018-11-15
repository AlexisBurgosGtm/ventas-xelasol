var DbConnection;
window.onload = function () {
    initiateDb();

    /*
    $('#tblGrid tbody').on('click', '.edit', function () {
        var StudentId = $(this).parents().eq(1).attr('itemid');
        window.location.href = 'add.html?id=' + StudentId;
    });
    $('#tblGrid tbody').on('click', '.delete', function () {
        var Result = confirm('Are you sure, you want to delete?');
        if (Result) {
            var StudentId = $(this).parents().eq(1).attr('itemid');
            deleteData(StudentId);
        }
    });*/
};

function deleteData(studentId) {
    DbConnection.delete({
        From: 'Student',
        Where: {
            Id: Number(studentId)
        }
    }, function (rowsDeleted) {
        console.log(rowsDeleted + ' rows deleted');
        if (rowsDeleted > 0) {
            showTableData();
        }
    }, function (error) {
        alert(error.Message);
    })
}

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


function insertTempVentas(coddoc,correlativo,codprod,desprod,codmedida,cantidad,precio,subtotal) {
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


/*This function refreshes the table
function showTableData() {
    DbConnection.select({
        From: "Student"
    }, function (students) {
        var HtmlString = "";
        students.forEach(function (student) {
            HtmlString += "<tr ItemId=" + student.Id + "><td>" +
                student.Name + "</td><td>" +
                student.Gender + "</td><td>" +
                student.Country + "</td><td>" +
                student.City + "</td><td>" +
                "<a href='#' class='edit'>Edit</a></td>" +
                "<td><a href='#' class='delete''>Delete</a></td>";
        }, function (error) {
            console.log(error);
        })
        $('#tblGrid tbody').html(HtmlString);
    });
}*/

// CARGA LA LISTA DE LA TABLA TEMP
function dbSelectTempVentas() {
    DbConnection.select({
        From: "tempVentas"
    }, function (productos) {

        var HtmlString = "";
        productos.forEach(function (prod) {
            HtmlString += "<tr ItemId=" + prod.Id + "><td>" +
                prod.desprod + "</td><td>" +
                prod.codmedida + "</td><td>" +
                prod.cantidad + "</td><td>" +
                prod.subtotal + "</td><td>" +
                "<button class='btn btn-danger btn-sm'>x</button></td></tr>";
        }, function (error) {
            console.log(error);
        })

        document.getElementById('tblProductosAgregados').innerHTML = HtmlString;
        
    });
}