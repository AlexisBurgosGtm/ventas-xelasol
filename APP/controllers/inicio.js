// inicializa indexDb
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!window.indexedDB) {
      window.alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
    }

let btnDashboard = document.getElementById('btnDashboard');
let btnPrecios = document.getElementById('btnPrecios');
let btnClientes = document.getElementById('btnClientes');
let btnVentas = document.getElementById('btnVentas');
let btnConfig = document.getElementById('btnConfig');
let toggler = document.getElementById('btnToggler');

// Dashboard
btnDashboard.addEventListener('click',()=>{
    funciones.loadView('./viewInicio.html')
    .then(()=>{
        CargarDatosVendedor(GlobalUser);
    })
    .catch(error => 
        funciones.showNotification('bottom','right','No se pudo cargar la vista')
    );
    toggler.click();
})

// Precios
btnPrecios.addEventListener('click',()=>{
    funciones.loadView('viewPrecios.html')
            .then(loadPrecios)

    toggler.click();
})

// Clientes
btnClientes.addEventListener('click',()=>{
    funciones.loadView('viewClientes.html')
            .then(cargarListaClientes)
            
    toggler.click();
})

// Ventas
btnVentas.addEventListener('click',()=>{
    funciones.loadView('viewVentas.html')
    toggler.click();
})

// Configuraciones
btnConfig.addEventListener('click',()=>{
    funciones.loadView('viewConfig.html')
        .then(CargarBotonesConfig)
    toggler.click();
})

// Asigna valores a la vista de inicio
async function CargarDatosVendedor(usuario){
    console.log('llego a la carga ' + usuario);
    var txtNombreUsuario = document.getElementById('txtNombreUsuario');
    txtNombreUsuario.innerHTML = usuario;
}
