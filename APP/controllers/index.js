

let txtUser = document.getElementById('txtUser');
let txtPass = document.getElementById('txtPass');

let btnIniciar = document.getElementById('btnIniciar');

btnIniciar.addEventListener('click',()=>{

    fcnLogin(txtUser.value,txtPass.value);
})

async function fcnLogin(user,pass){
    try {
        const response = await fetch('/api/usuarios/login' + '?usuario=' + user + '&' + 'clave=' + pass)
        //console.log('/api/usuarios/login' + '?usuario=' + user + '&' + 'clave=' + pass);
        result = response.json();
        console.log(response);
       

    } catch (error) {
      console.log(error);

    } 
}

function ComprobarUsuario(usuario) {
    let resultado = 0;

    if (usuario.NOMVEN==txtUser){
        resultado += 1;
    };
    if (usuario.CLAVE==txtUser){
        resultado += 1;
    };

    alert(resultado);
};