// precios
async function loadPrecios(){
try {
  const response = await fetch(`/api/productos/all`);
    const json = await response.json();
    
    let newsArticles = document.getElementById('tblPrecios');
    newsArticles.innerHTML = '';
                            
    newsArticles.innerHTML =
                    `<table class="table table-responsive" id="tblProductos">
                        <thead><tr class="">
                          <td class="col-4-sm col-4-md">Descripción</td>
                          <td class="col-4-sm col-4-md">Medida</td> 
                          <td class="col-4-sm col-4-md">Precio</td></tr>
                        </thead>` + 
    json.recordset.map(createArticle).join('\n');

    console.log('precios cargados desde el host');

} catch (error) {
  funciones.showNotification('bottom','right','Inténtalo de nuevo, al parecer no hay datos para cargar');
  /*
  const response = await fetch(`data/productos.json`);
    const json = await response.json();
                
    let newsArticles = document.getElementById('tblPrecios');
    newsArticles.innerHTML = '';
                            
    newsArticles.innerHTML =
                    `<table class="table table-responsive" id="tblProductos">
                        <thead><tr class="">
                          <td class="col-4-sm col-4-md">Descripción</td>
                          <td class="col-4-sm col-4-md">Medida</td> 
                          <td class="col-4-sm col-4-md">Precio</td></tr>
                        </thead>` + 
    json.Articles.map(createArticle).join('\n');
    console.log('precios locales. Error: ' + String(error));*/
} 
};

    
  function createArticle(article) {
      return `<tr class="">
                <td class="col-4-sm col-4-md">${article.DESPROD}</td>
                <td class="col-4-sm col-4-md">${article.CODMEDIDA}</td> 
                <td class="col-4-sm col-4-md"><b>${String(article.PRECIO)}</b></td> 
              </tr>`;
  };
  
  function CrearBusqueda(){
    let txtBusqueda = document.getElementById('search')
    txtBusqueda.addEventListener('keyup',()=>{
      funciones.crearBusquedaTabla('tblProductos','search')
  });   
    
  }