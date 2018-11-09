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
  CrearBusqueda();  

}
  
function createArticle2(article) {
    return `<tr class="">
              <td class="col-4-sm col-4-md">${article.DESPROD}</td>
              <td class="col-3-sm col-3-md">${article.CODMEDIDA}</td> 
              <td class="col-4-sm col-4-md"><b>${String(article.QPRECIO)}</b></td>
              <td class="col-1-sm col-1-md"><button class="btn btn-primary btn-circle" data-toggle="modal" data-target="#exampleModal" onClick="funciones.AgregarProductoVenta('${article.CODPROD}','${article.DESPROD}','${article.CODMEDIDA}','${article.COSTO}','${article.PRECIO}','${article.QPRECIO}');">+</button></td>
            </tr>`;
};

function CrearBusqueda(){
  let txtBusqueda = document.getElementById('search')
  let btnBusqueda = document.getElementById('btnBuscar')

  //txtBusqueda.addEventListener('keyup',()=>{
btnBuscar.addEventListener('click',()=>{
  funciones.crearBusquedaTabla('tblProductosVentas','search');
});   
  
}
