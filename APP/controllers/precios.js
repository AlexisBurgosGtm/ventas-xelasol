// precios
      async function loadPrecios(){

        let newsArticles = document.getElementById('tblPrecios');
        newsArticles.innerHTML = 'Cargando lista de productos...';
        
        const response = await fetch(`/api/productos/all`);
        const json = await response.json();
                  
        
        newsArticles.innerHTML = '';
                                
        newsArticles.innerHTML =
        `<table class="table table-responsive table-bordered table-fixed" id="tblProductos">
          <thead class=""><tr class="">
            <td class="col-4-sm col-4-md">Descripción</td>
            <td class="col-4-sm col-4-md">Medida</td> 
            <td class="col-4-sm col-4-md">Precio</td></tr>
        </thead>` + 

        json.recordset.map((article)=>{
          if (article.EMPNIT==GlobalEmpnit){
            return `<tr class="">
                      <td class="col-4-sm col-4-md">${article.DESPROD}</td>
                      <td class="col-4-sm col-4-md">${article.CODMEDIDA}</td> 
                      <td class="col-4-sm col-4-md"><b>${String(article.QPRECIO)}</b></td> 
                    </tr>`;
          };

        }).join('\n');

        //asigna el listener al botón de búsqueda
        document.getElementById('btnPreciosFiltrar').addEventListener('click',()=>{
          funciones.FiltrarListaProductos('tblProductos');
        });

      }
        
  
