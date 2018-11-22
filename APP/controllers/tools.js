let btnToolsTelefono;
let txtToolsTelefono;

async function CargarBotonesTools() {
        
    btnToolsTelefono = document.getElementById('btnToolsTelefono');
    txtToolsTelefono = document.getElementById('txtToolsTelefono');

    btnToolsTelefono.addEventListener('click',()=>{
        funciones.CompaniaTelefono(txtToolsTelefono.value,'SI');
    })
}