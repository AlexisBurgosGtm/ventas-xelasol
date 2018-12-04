let nav;
let user;

async function CargarEmpresas(){
    try {
        const response = await fetch('/api/empresas/all')
        const json = await response.json();

        let contenedor = document.getElementById('cmbEmpresas');
        contenedor.innerHTML = ''

        contenedor.innerHTML = json.recordset.map((empresa)=>{
            return `<option value="${empresa.EMPNIT}">${empresa.EMPNOMBRE}</option>`;        
        }).join('\n');
   
    } catch (error) {
      console.log(error);
    }
};

async function fcnLogin(){
    user = document.getElementById('txtUser');
    let pass = document.getElementById('txtPass');
    nav = document.getElementById('navbar-general');

    if(!user.value){
        funciones.showNotification('bottom','right','Escriba su nombre de Usuario','error')
    };
    if(!pass.value){
        funciones.showNotification('bottom','right','Escriba su Constraseña','error')
    };

    try {
        const response = await fetch('/api/usuarios/login')
        const json = await response.json();

        json.recordset.map(ComprobarUsuario).join('\n');
   
    } catch (error) {
      console.log(error);
    }
};

async function ComprobarUsuario(usuario) {
    if (usuario.NOMVEN==txtUser.value){
        if (usuario.CLAVE==txtPass.value){
            
            GlobalUser = user.value;
            GlobalCoddoc = usuario.CODDOC;
            GlobalCodven = usuario.CODVEN;

            funciones.loadView('./viewInicio.html')
                .then(()=>{
                    CargarDatosVendedor(GlobalUser);
                    getVentasDiaVendedor('salescontainer');
                    //funciones.hablar('Bienvenido ' + GlobalUser);
            });
            
            nav.style="visibility:visible";
        };
    };     
};
