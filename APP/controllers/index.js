

let txtUser = document.getElementById('txtUser');
let txtPass = document.getElementById('txtPass');

let btnIniciar = document.getElementById('btnIniciar');

btnIniciar.addEventListener('click',()=>{

    fcnLogin(txtUser.value,txtPass.value);
})

async function fcnLogin(user,pass){
    try {
        const response = await fetch('/api/usuarios/login')
        //const response = await fetch('/api/usuarios/login' + '?usuario=' + user + '&' + 'clave=' + pass)
        const json = await response.json();

        json.recordset.map(ComprobarUsuario).join('\n');
   
    } catch (error) {
      console.log(error);

    }
    
}


function ComprobarUsuario(usuario) {
    let resultado = 0;

    if (usuario.NOMVEN==txtUser.value){
        if (usuario.CLAVE==txtPass.value){
           resultado = 2; 
        };
    };
      
    if (resultado==2){
        window.location = 'inicio.html';
    }else {
        funciones.showNotification('top','right','Usuario o contraseña incorrectos');
    };
    
};