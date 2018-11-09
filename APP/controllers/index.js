

let txtUser = document.getElementById('txtUser');
let txtPass = document.getElementById('txtPass');

let btnIniciar = document.getElementById('btnIniciar');
let btnUpdate = document.getElementById('btnUpdate')

btnIniciar.addEventListener('click',()=>{
    fcnLogin(txtUser.value,txtPass.value);
})

btnUpdate.addEventListener('click',()=>{
    funciones.ApiUpdate('001');
    funciones.showNotification('bottom','right','Se ha enviado la solicitud de actualización','advertencia');
})

async function fcnLogin(user,pass){
    try {
        const response = await fetch('/api/usuarios/login')
        const json = await response.json();

        json.recordset.map(ComprobarUsuario).join('\n');
   
    } catch (error) {
      console.log(error);
    }
}

function ComprobarUsuario(usuario) {
    if (usuario.NOMVEN==txtUser.value){
        if (usuario.CLAVE==txtPass.value){
            window.location = 'inicio.html';
        };
    };     
};
