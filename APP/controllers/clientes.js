async function cargarListaClientes(){
    const response = await fetch(`data/clientes.json`);
    const json = await response.json();
                
    let newsArticles = document.getElementById('tblClientes');
    newsArticles.innerHTML = '';
                            
    newsArticles.innerHTML =
                    `<table class="table table-responsive card" id="tblClientesTabla">
                        <thead><tr class="card-body">
                          <td class="col-4">Cliente</td> 
                          <td class="col-4">Dirección</td> 
                          <td class="col-4">Telefono</td></tr> 
                          <td></td>
                        </thead>` + 
    json.Clientes.map(createClientePedido).join('\n');
    //await caches.match('data/productos.json');
    CrearBusquedaClientes();
  }


  function createClientePedido(cliente) {
    return `<tr class="card-body">
              <td class="col-4">${cliente.NOMBRECLIENTE}</td>
              <td class="col-4">${cliente.DIRCLIENTE}</td>
              <td class="col-4">${cliente.TELEFONOCLIENTE}</td>
              <td></td> 
            </tr>`;
};

function CrearBusquedaClientes(){
    let txtBusqueda = document.getElementById('search')
    
    txtBusqueda.addEventListener('keyup',()=>{
        funciones.crearBusquedaTabla('tblClientesTabla','search')
  })
}; 
