let nav;
let user;
let cmbEmpnit;
let btnConfigTokenInicial;

async function fcnLogin(){
    cmbEmpnit = document.getElementById('cmbEmpresas');
    user = document.getElementById('txtUser');
    let pass = document.getElementById('txtPass');
    nav = document.getElementById('navbar-general');

    if(!user.value){
        funciones.AvisoError('Escriba su nombre de usuario');
    };
    if(!pass.value){
        funciones.AvisoError('Escriba su Contraseña');
    };

    try {
        const response = await fetch(`/api/usuarios/login?token=${GlobalToken}`)
        const json = await response.json();

        json.recordset.map(ComprobarUsuario).join('\n');
   
    } catch (error) {
      console.log(error);
    }
};

async function ComprobarUsuario(usuario) {
    if (usuario.NOMVEN==txtUser.value){
        if (usuario.CLAVE==txtPass.value){
            if (usuario.EMPNIT==cmbEmpnit.value){

                                  
            GlobalUser = user.value;
            GlobalCoddoc = usuario.CODDOC;
            GlobalCodven = usuario.CODVEN;
            GlobalEmpnit = usuario.EMPNIT;

            funciones.loadView('./views/viewInicio.html')
                .then(()=>{
                    
                    //CargarDatosVendedor(GlobalUser);
                   
                })
                .then(()=>{
                    getVentasDiaVendedor('salescontainer');
                });
            
            nav.style="visibility:visible";
            };
        };
    };     
};
