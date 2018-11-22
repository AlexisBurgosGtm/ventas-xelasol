let btnConfigCorrelativo;
let txtConfigCorrelativo;

async function CargarBotonesConfig() {
        
    btnConfigCorrelativo = document.getElementById('btnConfigCorrelativo');
    txtConfigCorrelativo = document.getElementById('txtConfigCorrelativo');
    
    //ASIGNA EL VALOR DEL CORRELATIVO ACTUAL
    dbGetCorrelativo(1,txtConfigCorrelativo);

    btnConfigCorrelativo.addEventListener('click',()=>{
        funciones.Confirmacion('¿Está seguro que desea Actualizar el Correlativo?')
            .then((value) => {
                if (value==true){
                    dbUpdateCorrelativoDoc(txtConfigCorrelativo.value,'SI');
                };
            });
    })
}
