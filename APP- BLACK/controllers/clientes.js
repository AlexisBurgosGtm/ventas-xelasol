async function cargarListaClientes(){
    const response = await fetch(`/api/clientes/all`);
    const json = await response.json();
                
    let newsArticles = document.getElementById('tblClientes');
    newsArticles.innerHTML = '';
                            
    newsArticles.innerHTML =
                    `<table class="table table-responsive" id="tblClientesTablaLista">
                        <thead><tr>
                          <td class="col-4-sm col-4-md">Cliente</td> 
                          <td class="col-4-sm col-4-md">Dirección</td> 
                          <td class="col-4-sm col-4-md">Telefono</td></tr> 
                          <td></td>
                        </thead>` + 
    json.recordset.map((cliente)=>{
        if(cliente.EMPNIT==GlobalEmpnit){
            return `<tr>
            <td class="col-4-sm col-4-md">${cliente.NOMCLIENTE}</td>
            <td class="col-4-sm col-4-md">${cliente.DIRCLIENTE}</td>
            <td class="col-4-sm col-4-md">${cliente.TELEFONOS}</td>
            <td></td> 
            </tr>`;
        }
    }).join('\n');
    //await caches.match('data/productos.json');
    //CrearBusquedaClientes();
    document.getElementById('btnClientesFiltrar').addEventListener('click',()=>{
        funciones.FiltrarListaProductos('tblClientesTablaLista');
    })
  }

/*
function CrearBusquedaClientes(){
    let txtBusqueda = document.getElementById('search')
    
    txtBusqueda.addEventListener('keyup',()=>{
        funciones.crearBusquedaTabla('tblClientesTablaLista','search')
  })
}; */
