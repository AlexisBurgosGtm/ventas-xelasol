
let btnDashboard = document.getElementById('btnDashboard');
let btnPrecios = document.getElementById('btnPrecios');
let btnClientes = document.getElementById('btnClientes');
let btnVentas = document.getElementById('btnVentas');
let toggler = document.getElementById('btnToggler');

// Dashboard
btnDashboard.addEventListener('click',()=>{
    funciones.loadView('./viewInicio.html')
    .then(()=>{
        funciones.showNotification('bottom','right','Datos cargados');
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
