classAdmin={
    rptVentasDiarias: async(idContainer,anio,mes)=>{
                  
        const response = await fetch(`${GlobalServerUrl}/api/admin/ventasdiarias?token=${GlobalToken}&anio=${anio}&mes=${mes}`);
        
        const json = await response.json();
                    
        let tabla = '';
       //newsArticles.innerHTML = 'Cargando lista de clientes...';
        tabla =
                        `<div class="table-responsive">
                        <table class="table table-bordered table-striped" id="tblRptVentasDiarias">
                            <thead>
                              <tr>
                                <th class="">Dia</th> 
                                <th class="">Venta</th>
                                <th class="">Costo</th>
                                <th class="">Utilidad</th>
                                <th class=""></th>
                              </tr>
                            </thead>
                            <tbody>` + 
        json.recordset.map((ventas)=>{
              
              return `<tr>
                        <td class="">${ventas.DIA}</td>
                        <td class="">${ventas.TOTALVENTA}</td>
                        <td class="">${ventas.TOTALCOSTO}</td>
                        <td class="">${ventas.UTILIDAD}</td>
                        <td class=""></td>                        
                      </tr>`;
                    }
                  
        ).join('\n');
      
        
        let tblfooter ='</tbody></table></div>'
        
        document.getElementById(idContainer).innerHTML = tabla + tblfooter
        
    },
    rptCuadresDiarios: async(idContainer)=>{

    },
    rptInventarioCosteado: async(idContainer)=>{

    }

}