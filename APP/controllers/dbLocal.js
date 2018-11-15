const dbName = "dbAres1";

db = {
  
  CrearTablaDocumentos : function(){
    var request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
      console.log('Error con la base de datos ')
    };

    request.onupgradeneeded = async function(event) {
      var db = event.target.result;
      // creación de tablas
      var objectStore = await db.createObjectStore("documentos", { autoIncrement : true });
          objectStore.createIndex("coddoc", "coddoc", { unique: false });
          objectStore.createIndex("correlativo", "correlativo", { unique: true });
          objectStore.createIndex("codcliente", "codcliente", { unique: false });
          objectStore.createIndex("totalventa", "totalventa", { unique: false });
       
          objectStore.transaction.oncomplete = function(event) {
            console.log('Tabla Documentos creada exitosamente');
            
          }
      };
  },

  CrearTablaDocproductos: function(){
    var request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
      console.log('Error con la base de datos ')
    };

    request.onupgradeneeded = async function(event) {
      var db = event.target.result;
      // creación de tablas
      var objectStore = await db.createObjectStore("docproductos", { autoIncrement : true });
          objectStore.createIndex("coddoc", "coddoc", { unique: false });
          objectStore.createIndex("correlativo", "correlativo", { unique: false });
          objectStore.createIndex("codprod", "codprod", { unique: false });
          objectStore.createIndex("desprod", "desprod", { unique: false });
          objectStore.createIndex("codmedida", "codmedida", { unique: false });
          objectStore.createIndex("cantidad", "cantidad", { unique: false });
          objectStore.createIndex("precio", "precio", { unique: false });
          objectStore.createIndex("subtotal", "subtotal", { unique: false });
       
          objectStore.transaction.oncomplete = function(event) {
            console.log('Tabla Docproductos creada exitosamente');
            
          }
      };
  },

  CrearTablaTemp: function(){
    var request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
      console.log('Error con la base de datos ')
    };

    request.onupgradeneeded = async function(event) {
      var db = event.target.result;
      // creación de tablas
      var objectStore = await db.createObjectStore("tempventas", { autoIncrement : true });
          objectStore.createIndex("coddoc", "coddoc", { unique: false });
          objectStore.createIndex("correlativo", "correlativo", { unique: false });
          objectStore.createIndex("codprod", "codprod", { unique: false });
          objectStore.createIndex("desprod", "desprod", { unique: false });
          objectStore.createIndex("codmedida", "codmedida", { unique: false });
          objectStore.createIndex("cantidad", "cantidad", { unique: false });
          objectStore.createIndex("precio", "precio", { unique: false });
          objectStore.createIndex("subtotal", "subtotal", { unique: false });
       
          objectStore.transaction.oncomplete = function(event) {
            console.log('Tabla Temp Ventas creada exitosamente');
          }
      };
  },

  InsertarProductoTemp: function(coddoc,correlativo,codprod,desprod,codmedida,cantidad,precio,subtotal){
    var request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
      console.log('Error con la base de datos ')
    };

    request.onupgradeneeded = async function(event) {
      var db = event.target.result;

          var objDocproductos = await db.transaction("tempventas", "readwrite").objectStore("tempventas");
          
          console.log('llega hasta antes de añadir');
          objDocproductos.add({
              'coddoc':coddoc,
              'correlativo':correlativo,
              'codprod':codprod,
              'desprod':desprod,
              'codmedida':codmedida,
              'cantidad':cantidad,
              'precio':precio,
              'subtotal':subtotal
          });
    console.log('Datos insertados');
    }
  } 
}