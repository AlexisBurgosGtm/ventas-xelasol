function CrearNuevoPedido(){
// Nuevo Pedido
  funciones.loadView('./viewVentasPedido.html')
  .then(()=>{
      funciones.showNotification('bottom','right','Creando nuevo pedido');
      loadPreciosVentas();
  })
  .catch(error => 
      funciones.showNotification('bottom','right','No se pudo cargar la vista')
  );
 
}

// lista de precios para agregarlos a la venta
async function loadPreciosVentas(){

  const response = await fetch(`data/productos.json`);
  const json = await response.json();
              
  let newsArticles = document.getElementById('contenedorVentas');
  newsArticles.innerHTML = '';
                          
  newsArticles.innerHTML =
                  `<table class="table table-responsive" id="tblProductosVentas">
                      <thead><tr class="">
                        <td></td>
                        <td class="col-4-sm col-4-md">Descripción</td>
                        <td class="col-4-sm col-4-md">Medida</td> 
                        <td class="col-4-sm col-4-md">Precio</td></tr>
                      </thead>` + 
  json.Articles.map(createArticle2).join('\n');
  //await caches.match('data/productos.json');
  CrearBusqueda();  

}
  
function createArticle2(article) {
    return `<tr class="">
              <td class="col-1-sm col-1-md"><button class="btn btn-success btn-circle" onClick="funciones.AgregarProductoVenta('${article.DESPROD}');">+</button></td>
              <td class="col-4-sm col-4-md">${article.DESPROD}</td>
              <td class="col-3-sm col-3-md">${article.CODMEDIDA}</td> 
              <td class="col-4-sm col-4-md"><b>${String(article.PRECIO)}</b></td>
            </tr>`;
};

//<td class="col-2-sm col-2-md"><button class="btn btn-circle" onClick("AgregarProducto('${article.CODPROD}','${article.DESPROD}','${article.CODMEDIDA}','1','${article.PRECIO}');")>+</button></td>
function CrearBusqueda(){
  let txtBusqueda = document.getElementById('search')
  txtBusqueda.addEventListener('keyup',()=>{
    funciones.crearBusquedaTabla('tblProductosVentas','search')
});   
  
}
