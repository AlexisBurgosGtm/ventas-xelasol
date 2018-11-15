let btntblTemp;
let btntblDocumentos;
let btntblDocproductos;

async function CargarBotonesConfig() {
    
    
    btntblTemp = document.getElementById('btntblTemp')
    btntblDocumentos = document.getElementById('btntblDocumentos')
    btntblDocproductos = document.getElementById('btntblDocproductos')

    btntblTemp.addEventListener('click',()=>{
        
    })
    btntblDocumentos.addEventListener('click',()=>{
      //db.CrearTablaDocumentos();  
    })
    btntblDocproductos.addEventListener('click',()=>{
        //db.CrearTablaDocproductos();  
    })
}