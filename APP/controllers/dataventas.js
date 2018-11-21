async function getVentasDiaVendedor(contenedorName){
try {
  const response = await fetch(`/api/ventas/dia`);
    const json = await response.json();
    
    //<h4 class="card-title text-primary">${funciones.setMoneda(field.VENTA,'Q')}</h4>

    let contenedor = document.getElementById(contenedorName);
    contenedor.innerHTML = '';
    contenedor.innerHTML = json.recordset.map((field)=>{
      if (field.CODVEN==GlobalCodven){
      return `<div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-category">DIA : ${field.DIA}</h5>
                        <div class="dropdown">
                            <button type="button" class="btn btn-round btn-default dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                                <i class="now-ui-icons design_bullet-list-67"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" id="ventasdia-${field.DIA}">
                                <a class="dropdown-item" href="#">Consumidor Final - Q 50.00</a>
                                <a class="dropdown-item" href="#">Juana Tumin - Q 45.00</a>
                                <a class="dropdown-item" href="#">Carlos Pérez - Q 125.00</a>
                                <a class="dropdown-item" href="#">Maria Chay - Q 75.25</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="text-right text-primary">${funciones.setMoneda(field.VENTA,'Q')}</h5>
                    </div>
                </div>
              </div>`
            };
        }).join('\n');
            
    } catch (error) {
      console.log(String(error));
      funciones.showNotification('bottom','right','Inténtalo de nuevo, al parecer no hay datos para cargar');
    } 
};