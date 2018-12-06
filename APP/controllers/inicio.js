// inicializa indexDb
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!window.indexedDB) {
      window.alert("Lo siento pero su Teléfono no soporta el guardado de Datos");
    }

let toggler = document.getElementById('btnToggler');
let btnDashboard = document.getElementById('btnDashboard');
let btnPrecios = document.getElementById('btnPrecios');
let btnClientes = document.getElementById('btnClientes');
let btnVentas = document.getElementById('btnVentas');
let btnTools = document.getElementById('btnTools');
let btnConfig = document.getElementById('btnConfig');
let btnSync = document.getElementById('btnSync');
let btnChat = document.getElementById('btnChat');

// Dashboard
btnDashboard.addEventListener('click',()=>{
    funciones.loadView('./views/viewInicio.html')
    .then(()=>{
        CargarDatosVendedor(GlobalUser);
        getVentasDiaVendedor('salescontainer');
    })
    .catch(error => 
        funciones.showNotification('bottom','right','No se pudo cargar la vista')
    );
    toggler.click();
})

// Precios
btnPrecios.addEventListener('click',()=>{
    funciones.loadView('./views/viewPrecios.html')
            .then(loadPrecios)

    toggler.click();
})

// Clientes
btnClientes.addEventListener('click',()=>{
    funciones.loadView('./views/viewClientes.html')
            .then(cargarListaClientes)
            
    toggler.click();
})

// Ventas
btnVentas.addEventListener('click',()=>{
    funciones.loadView('./views/viewVentas.html')
    .then(()=>{dbSelectDocumentos(document.getElementById('tblDocumentos'))});
    toggler.click();
})

// Tools
btnTools.addEventListener('click',()=>{
    funciones.loadView('./views/viewTools.html')
            .then(()=>{
                CargarBotonesTools();
            });
            
    toggler.click();
})

// Configuraciones
btnConfig.addEventListener('click',()=>{
    funciones.loadView('./views/viewConfig.html')
        .then(()=>{CargarBotonesConfig();});
    toggler.click();
})

// Sync
btnSync.addEventListener('click',()=>{
    funciones.loadView('./views/viewSync.html')
            .then(CargarListenersSync);
    toggler.click();
})

// Chat
btnChat.addEventListener('click',()=>{
    funciones.loadView('./views/viewChat.html')
            .then(()=>{
                CargarFuncionesChat();
            });
    toggler.click();
})

// Asigna valores a la vista de inicio
async function CargarDatosVendedor(usuario){
    var txtNombreUsuario = document.getElementById('txtNombreUsuario');
    txtNombreUsuario.innerHTML = usuario;
}


function StartRecognition(){
    try {
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            //recognition.lang = 'en-US';
            recognition.lang = 'es-ES';

            recognition.continuous = true;
            recognition.start();

            recognition.onresult = function(event) {


                for (var i = event.resultIndex; i < event.results.length; ++i) {

                    if(event.results[i].isFinal){

                        if (event.results[i][0].transcript.trim() == 'ventas') {
                            //remoteControl.play()
                            btnVentas.click();
                        } 
                        if (event.results[i][0].transcript.trim() == 'precios') {
                            //remoteControl.stop()
                            btnPrecios.click();
                        } 
                        if (event.results[i][0].transcript.trim() == 'inicio') {
                            //remoteControl.mute()
                            btnDashboard.click();
                        } 
                        if (event.results[i][0].transcript.trim() == '¿Cuál es mi Usuario?') {
                            //remoteControl.unmute()
                            funciones.hablar('Tu usuario es ' + GlobalUser);
                        } 
                        
                        console.info(`You said : ${event.results[i][0].transcript}`)

                    }
                    
                }
            
            }
    } catch (error) {
        
    }
}