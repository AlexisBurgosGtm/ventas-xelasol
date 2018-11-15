let nav;
let user;

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
}

async function ComprobarUsuario(usuario) {
    if (usuario.NOMVEN==txtUser.value){
        if (usuario.CLAVE==txtPass.value){
            
            GlobalUser = user.value;
            GlobalCoddoc=usuario.CODDOC;

            funciones.loadView('./viewInicio.html')
                .then(()=>{
                    CargarDatosVendedor(GlobalUser);
                    funciones.showNotification('bottom','right','Bienvenido ' + GlobalUser,'advertencia');
            });
            
            nav.style="visibility:visible";
        };
    };     
};
