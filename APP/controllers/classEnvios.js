classEnvios={
    CargarEnviosPendientes: async function(IdContenedor){
        
            let newsArticles = document.getElementById(IdContenedor);
            newsArticles.innerHTML = 'Cargando lista de Envios...';
            
            const response = await fetch(`/api/reparto/enviospendientes?token=${GlobalToken}`);
            const json = await response.json();
           
            newsArticles.innerHTML = '';
                                    
            newsArticles.innerHTML = `` + 
    
            json.recordset.map((article)=>{
              if (article.EMPNIT==GlobalEmpnit){
                if (article.CODREP==GlobalCodrep){
                  return `<tr class="">
                    <td class="col-4-sm col-4-md">${article.NOMCLIENTE}</td>
                    <td class="col-4-sm col-4-md">${article.TELEFONOS}</td> 
                    <td class="col-3-sm col-3-md"><b>${String(article.QPRECIO)}</b></td>
                    <td class="col-1-sm col-1-md">
                        <button class='btn btn-round btn-icon btn-warning btn-sm' 
                            data-toggle='modal' data-target='#ModalOpcionesEnvios' 
                            onClick="fcnCargarDatosPedido('${doc.Id}','${doc.correlativo}','${doc.nomcliente}','${doc.totalventa}');">
                            <i class='now-ui-icons design_bullet-list-67'></i>
                        </button>
                    </td>
                    </tr>`;
                }
              };
    
            }).join('\n');
    },

    CargarEnviosRealizados: function(IdContenedor){

    }
}