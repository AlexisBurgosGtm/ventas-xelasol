// Elementos
let txtTotalVenta;
let txtDesprod;   
let txtCodMedida;
let txtCantidad;
let txtPrecioProd;
let btnAgregarProducto;
let txtBusqueda;
let btnBusqueda;
let txtSubTotal;

// Variables
let _Codprod;
let _Desprod;
let _CodMedida;
let _Costo;
let _Precio;
let _QPrecio;
let _TotalVenta = parseFloat(0); //total de la venta en curso
let _SubTotal = parseFloat(0); // almacena el subtotal

// ventana modal
async function CargarDatosProductoModal(CodProd,DesProd,CodMedida,Costo,Precio,QPrecio){
  //asigna el valor a las variables cada vez que se abre el modal
  _Codprod = CodProd;
  _Desprod = DesProd;
  _CodMedida = CodMedida;
  _Costo = Costo;
  _Precio = parseFloat(Precio);
  _QPrecio = QPrecio;
  
  //carga los datos de la ventana modal
  txtDesProd.innerHTML = DesProd;
  txtCodMedida.innerHTML = CodMedida;
  txtPrecioProd.innerHTML = QPrecio;
  txtCantidad.value = 1;

  _SubTotal = parseFloat(_Precio);
  txtSubTotal.innerHTML = funciones.setMoneda(_SubTotal,'Q');
};

// Agrega el producto a la tabla temporal de la venta en curso
function AgregarProducto(){
  _TotalVenta += parseFloat(_SubTotal);
  txtTotalVenta.innerHTML = funciones.setMoneda(_TotalVenta,'Q');

  var tblProductosAgregados = document.getElementById('tblProductosAgregados')
  //var tr = document.createElement('tr')
  //var row = '<td class="col-4">' + _Desprod + '</td><td class="col-2">' + _CodMedida + '</td><td class="col-1">' + txtCantidad.value + '</td><td class="col-2">' + funciones.setMoneda(_SubTotal,'Q') + '</td></td><td class="col-1">' + '<button class="btn btn-sm btn-round btn-danger">x</button></td>' 
    
  // inserta los datos en indexdb
  insertTempVentas(GlobalCoddoc,1,_Codprod,_Desprod,_CodMedida,parseInt(txtCantidad.value),_Precio,_SubTotal);

  dbSelectTempVentas();
  //tr.innerHTML = row;  
  //tblProductosAgregados.appendChild(tr);
 
  funciones.showNotification('bottom','right','Producto Agregado a la Venta Actual','exito')

  _SubTotal = parseFloat(0);
};

// hace que cuando des clic a la cantidad te lo deje en blanco
async function ClearCantidad(){
  txtCantidad.addEventListener('click',()=>{txtCantidad.value =''});
  txtCantidad.addEventListener('keyup',()=>{
    _SubTotal = parseFloat(_Precio) * parseFloat(txtCantidad.value);
    txtSubTotal.innerHTML = funciones.setMoneda(_SubTotal,'Q');
  })
};

// asigna los elementos a las variables
async function AsignarElementos(){
  txtTotalVenta = document.getElementById('txtTotalVenta') //total de la venta actual (label)
  txtBusqueda = document.getElementById('search'); //filtro en listado de productos (input)
  btnBusqueda = document.getElementById('btnBuscar'); // boton buscar
  txtCodMedida = document.getElementById('txtCodMedida'); //label
  txtDesProd = document.getElementById('txtDesProducto'); //label
  txtPrecioProd = document.getElementById('txtPrecioProducto'); //label
  btnAgregarProducto = document.getElementById('btnAgregarProducto'); //boton agregar
  txtCantidad = document.getElementById('txtCantidad'); //input
  txtSubTotal = document.getElementById('txtSubTotal'); //label
};

// asigna el listener al botón Agregar
async function ListenerAgregar(){btnAgregarProducto.addEventListener('click',()=>{AgregarProducto();})}


//trae la vista de nueva venta
function CrearNuevoPedido(){
// Nuevo Pedido
  funciones.loadView('./viewVentasPedido.html')
  .then(()=>{
      funciones.showNotification('bottom','right','Creando nuevo pedido','advertencia');
      loadPreciosVentas();
  })
  .catch(error => 
      funciones.showNotification('bottom','right','No se pudo cargar la vista')
  );
 
}

// lista de precios para agregarlos a la venta
async function loadPreciosVentas(){

  const response = await fetch(`/api/productos/all`);
  const json = await response.json();
              
  let newsArticles = document.getElementById('contenedorVentas');
  newsArticles.innerHTML = '';
                          
  newsArticles.innerHTML =
                  `<table class="table table-responsive table-bordered table-fixed" id="tblProductosVentas">
                    <thead>
                      <tr>
                        <td class="col-4-sm col-4-md">Descripción</td>
                        <td class="col-3-sm col-3-md">Medida</td> 
                        <td class="col-4-sm col-4-md">Precio</td>
                        <td class="col-1-sm col-1-md"></td>
                      </tr>
                    </thead>` + 
  json.recordset.map(createArticle2).join('\n');
  //await caches.match('data/productos.json');
  AsignarElementos();
  CrearBusqueda();  
  ClearCantidad();
  ListenerAgregar();
}
  
function createArticle2(article) {
    return `<tr class="">
              <td class="col-4-sm col-4-md">${article.DESPROD}</td>
              <td class="col-3-sm col-3-md">${article.CODMEDIDA}</td> 
              <td class="col-4-sm col-4-md"><b>${String(article.QPRECIO)}</b></td>
              <td class="col-1-sm col-1-md"><button class="btn btn-primary btn-circle" data-toggle="modal" data-target="#ModalCantidadVenta" onClick="CargarDatosProductoModal('${article.CODPROD}','${article.DESPROD}','${article.CODMEDIDA}','${article.COSTO}','${article.PRECIO}','${article.QPRECIO}');">+</button></td>
            </tr>`;
};

function CrearBusqueda(){
  //txtBusqueda.addEventListener('keyup',()=>{
btnBuscar.addEventListener('click',()=>{
  funciones.crearBusquedaTabla('tblProductosVentas','search');
});   
  
}

