let btnConfigCorrelativo;
let txtConfigCorrelativo;

async function CargarBotonesConfig() {
        
    btnConfigCorrelativo = document.getElementById('btnConfigCorrelativo');
    btnConfigToken = document.getElementById('btnConfigToken');
    txtConfigCorrelativo = document.getElementById('txtConfigCorrelativo');
    txtConfigToken = document.getElementById('txtConfigToken');
    
    //ASIGNA EL VALOR DEL CORRELATIVO ACTUAL
    dbGetCorrelativo(1,txtConfigCorrelativo);

    // asigna el valor del token actual
    //dbGetToken(txtConfigToken);
    txtConfigCorrelativo.value = GlobalToken;

    btnConfigCorrelativo.addEventListener('click',()=>{
        funciones.Confirmacion('¿Está seguro que desea Actualizar el Correlativo?')
            .then((value) => {
                if (value==true){
                    dbUpdateCorrelativoDoc(txtConfigCorrelativo.value,'SI');
                };
            });
    })

    btnConfigToken.addEventListener('click',()=>{
        funciones.Confirmacion('¿Está seguro que desea Actualizar el Token?')
            .then((value) => {
                if (value==true){
                    dbUpdateToken(txtConfigToken.value);
                };
            });
    })
}
