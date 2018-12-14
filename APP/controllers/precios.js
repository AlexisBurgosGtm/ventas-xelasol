// precios
async function loadPrecios(){
try {
  const response = await fetch(`/api/productos/all`);
    const json = await response.json();
    
    let newsArticles = document.getElementById('tblPrecios');
    newsArticles.innerHTML = '';
                            
    newsArticles.innerHTML =
              `<table class="table table-responsive table-bordered table-fixed" id="tblProductos">
                <thead class=""><tr class="">
                  <td class="col-4-sm col-4-md">Descripción</td>
                  <td class="col-4-sm col-4-md">Medida</td> 
                  <td class="col-4-sm col-4-md">Precio</td></tr>
              </thead>` + 
    json.recordset.map(createArticle).join('\n');

    CrearBusquedaProductos();

    } catch (error) {
      funciones.showNotification('bottom','right','Inténtalo de nuevo, al parecer no hay datos para cargar');
    } 
};

    
  function createArticle(article) {
    if (article.empnit==GlobalEmpnit){
      return `<tr class="">
                <td class="col-4-sm col-4-md">${article.DESPROD}</td>
                <td class="col-4-sm col-4-md">${article.CODMEDIDA}</td> 
                <td class="col-4-sm col-4-md"><b>${String(article.QPRECIO)}</b></td> 
              </tr>`;
    };
  };
  
  function CrearBusquedaProductos(){
    let txtBusqueda = document.getElementById('search')
    let btnBusqueda = document.getElementById('btnBuscar')

    btnBusqueda.addEventListener('click',()=>{
      try {
        funciones.crearBusquedaTabla('tblProductos','search')  
      } catch (error) {
        funciones.showNotification('bottom','right','Debe escribir algo para buscar');
      }
      
  });   
    
  }