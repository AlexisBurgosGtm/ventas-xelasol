// Elementos
let txtTotalVenta;
let txtDesprod;   
let txtCodMedida;
let txtCantidad;
let txtPrecioProd;
let btnAgregarProducto;
let btnCancelarModalProducto;
let txtBusqueda;
let btnBusqueda;
let txtSubTotal;
let btnMostrarLista;
let btnCancelarVenta;
let btnGuardarVenta;
let btnFinalizarVenta;
let btnFiltrarListaProductos;
let btnAtrasClientePedido;

//modal editar ventas
let btnVentasEditar;
let btnVentasEliminar;
let btnVentasEnviar;

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
  // oculta el botón de búsqueda
  document.getElementById('btnPedidoFiltrarProducto').style = "visibility:hidden";
};

// Agrega el producto a la tabla temporal de la venta en curso
function AgregarProducto(){
  // inserta los datos en indexdb
  dbInsertTempVentas(GlobalCoddoc,0,_Codprod,_Desprod,_CodMedida,parseInt(txtCantidad.value),_Precio,_SubTotal,GlobalEmpnit);
  
  // asigna la suma de los productos en temp ventas
  dbTotalTempVentas(txtTotalVenta);
 
  _SubTotal = parseFloat(0);
  
  //vuelve a mostrar el botón de búsqueda
  document.getElementById('btnPedidoFiltrarProducto').style = "visibility:visible";
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
  btnMostrarLista = document.getElementById('btnMostrarLista'); //botón para ver el listado
  btnCancelarVenta = document.getElementById('btnCancelarVenta'); //botón para eliminar el listado de productos en temp
  btnGuardarVenta = document.getElementById('btnGuardarVenta'); //pasa a otra pantalla para seleccionar cliente
  btnFiltrarListaProductos = document.getElementById('btnPedidoFiltrarProducto'); //boton flotante para filtrar productos
  btnCancelarModalProducto = document.getElementById('btnCancelarModalProducto'); //boton cancelar de modal de agergar productos
};

// asigna los listener a los botones
async function AgregarListeners(){
  btnAgregarProducto.addEventListener('click',()=>{AgregarProducto();})
  btnMostrarLista.addEventListener('click',()=>{dbSelectTempVentas(document.getElementById('tblProductosAgregados'));})
  btnCancelarVenta.addEventListener('click',()=>{fcnCancelarVenta();});
  btnGuardarVenta.addEventListener('click',()=>{AgregarCliente();});
  btnCancelarModalProducto.addEventListener('click',()=>{
    // muestra el botón de búsqueda
    document.getElementById('btnPedidoFiltrarProducto').style = "visibility:visible";
  });
  btnFiltrarListaProductos.addEventListener('click',()=>{
    funciones.FiltrarListaProductos('tblProductosVentas');
  });
}

//borra la lista temporal del pedido
function fcnCancelarVenta(){
  funciones.Confirmacion('¿Está seguro que desea CANCELAR esta Venta?')
  .then((value) => {
      if (value==true){
          dbDeleteTempProductoAll('SI');
      };
    });
}

//trae la vista de nueva venta
function CrearNuevoPedido(){
// Nuevo Pedido
  funciones.loadView('./views/viewVentasPedido.html')
  .then(()=>{
      //funciones.showNotification('bottom','right','Creando nuevo pedido','advertencia');
      loadPreciosVentas();
  })
  .catch(error => 
      funciones.showNotification('bottom','right','No se pudo cargar la vista')
  );
}

// lista de precios para agregarlos a la venta
async function loadPreciosVentas(){

  let newsArticles = document.getElementById('contenedorVentas');
  newsArticles.innerHTML = 'Cargando lista de productos...';
  
  const response = await fetch(`/api/productos/all`);
  const json = await response.json();
            
  
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
  ClearCantidad();
  AgregarListeners();
  dbTotalTempVentas(txtTotalVenta);
}
  
function createArticle2(article) {
   if (article.EMPNIT==GlobalEmpnit){
    return `<tr class="">
              <td class="col-4-sm col-4-md">${article.DESPROD}</td>
              <td class="col-3-sm col-3-md">${article.CODMEDIDA}</td> 
              <td class="col-4-sm col-4-md"><b>${String(article.QPRECIO)}</b></td>
              <td class="col-1-sm col-1-md"><button class="btn btn-primary btn-circle" data-toggle="modal" data-target="#ModalCantidadVenta" onClick="CargarDatosProductoModal('${article.CODPROD}','${article.DESPROD}','${article.CODMEDIDA}','${article.COSTO}','${article.PRECIO}','${article.QPRECIO}');">+</button></td>
            </tr>`;
  };
};

//AGREGAR CLIENTE A LA VENTA
async function AgregarCliente(){
  funciones.loadView('./views/viewVentasCliente.html')
          .then(cargarListaClientesPedido())

};

//guarda la venta
async function dbGuardarVenta(codcliente,nomcliente){
  GlobalCodCliente = codcliente;
  GlobalNomCliente = nomcliente;

  dbGetValCorrelativo(1); //carga el correlativo de documentos en la global

  funciones.Confirmacion('¿Está seguro que desea Guardar esta Venta?')
  .then((value) => {
       
    if (value==true){
      dbInsertDocumentos(GlobalCoddoc,GlobalCorrelativo,GlobalCodCliente,GlobalNomCliente,GlobalTotalVenta,GlobalEmpnit);
      dbInsertDocproductos(GlobalCoddoc,GlobalCorrelativo,GlobalEmpnit);
      funciones.loadView('./views/viewVentas.html')
          .then(()=>{
            dbSelectDocumentos(document.getElementById('tblDocumentos'));
                let num = parseInt(GlobalCorrelativo) + parseInt(1);
                dbUpdateCorrelativoDoc(num);
                dbDeleteTempProductoAll();
          });
        };
    });
  };

async function cargarListaClientesPedido(){
  
  const response = await fetch(`/api/clientes/all`);
  const json = await response.json();
              
  let newsArticles = document.getElementById('tblClientesPedido');
  newsArticles.innerHTML = '';
                          
  newsArticles.innerHTML =
                  `<table class="table table-responsive table-bordered" id="tblClientesTabla">
                      <thead>
                        <tr>
                          <td class="col-3-sm col-3-md">Cliente</td> 
                          <td class="col-4-sm col-4-md">Dirección</td> 
                          <td class="col-4-sm col-4-md">Telefono</td> 
                          <td class="col-1-sm col-1-md"></td>
                        </tr>
                      </thead>` + 
  json.recordset.map(
      (cliente)=>{
        if(cliente.EMPNIT==GlobalEmpnit){
        return `<tr>
                  <td class="col-3-sm col-3-md">${cliente.NOMCLIENTE}</td>
                  <td class="col-4-sm col-4-md">${cliente.DIRCLIENTE}</td>
                  <td class="col-4-sm col-4-md">${cliente.TELEFONOS}</td>
                  <td class="col-1-sm col-1-md">
                    <button class="btn btn-round btn-icon btn-primary" onclick="dbGuardarVenta('${cliente.CODCLIENTE}','${cliente.NOMCLIENTE}');">
                      <i class='now-ui-icons ui-1_check'></i>
                    </button>
                  </td> 
                </tr>`;
              }
            }
  ).join('\n');
  
  document.getElementById('btnClientesFiltrar').addEventListener('click',()=>{
    funciones.FiltrarListaProductos('tblClientesTabla');
  })
};

//asigna código y nombre cliente según se seleccione en la lista
function GetDataCliente(idCliente,nomCliente){
  GlobalCodCliente = idCliente;
  GlobalNomCliente = nomCliente;
};

// carga los datos del modal en la lista de pedidos sin enviar
async function fcnCargarDatosPedido(id,nomcliente,totalventa){
  //console.log(id,nomcliente,totalventa)
  document.getElementById('txtNomClientePedido').innerText =nomcliente;
  document.getElementById('txtTotalPedido').innerText = funciones.setMoneda(totalventa,'Q');
  document.getElementById('txtIdPedido').innerHTML = id;

  document.getElementById('btnVentasEditar').addEventListener('click', ()=>{
     VentasEditar(id);
  });
  document.getElementById('btnVentasEliminar').addEventListener('click',()=>{
    VentasEliminar(id);
  });
  document.getElementById('btnVentasEnviar').addEventListener('click', ()=>{
    VentasEnviar(id);
  });

};

// Opciones del modal de ventas guardadas
function VentasEditar(idPedido){
  console.log('editar presionado ' + idPedido);
  funciones.Confirmacion('¿Está seguro que desea Editar este Pedido?')
    .then((value) => {
       
      if (value==true){
    
      }
    });
};

function VentasEliminar(idPedido){
  console.log('Eliminar id= ' + idPedido);
  funciones.Confirmacion('¿Está seguro que desea ELIMINAR este Pedido?')
  .then((value) => {
       
    if (value==true){
  
    }
  });
};

function VentasEnviar(idPedido){
  funciones.Confirmacion('¿Está seguro que desea ENVIAR este Pedido?')
  .then((value) => {
       
    if (value==true){
      
      dbSendPedido(idPedido);
      document.getElementById('btnVentasCancelar').click();
    }
  });
};

