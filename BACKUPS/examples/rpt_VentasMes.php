<!-- CARGA DEL REPORTE A LA TABLA -->
<?php
  $anio = 2017;
  $mes = 12;

  $consulta = "SELECT CAST(Documentos.DOC_FECHA AS VARCHAR) AS FECHA, CONCAT('Q ',CAST(SUM(Documentos.DOC_TOTALCOSTO) AS MONEY)) AS COSTO, CONCAT('Q ',CAST(SUM(Documentos.DOC_TOTALVENTA) AS MONEY)) AS VENTA, CONCAT('Q ',CAST(SUM(Documentos.DOC_TOTALVENTA) - SUM(Documentos.DOC_TOTALCOSTO) AS MONEY)) AS UTILIDAD
 FROM  Documentos LEFT OUTER JOIN Tipodocumentos ON Documentos.CODDOC = Tipodocumentos.CODDOC AND Documentos.EMP_NIT = Tipodocumentos.EMP_NIT
 GROUP BY Documentos.DOC_FECHA, Documentos.DOC_ESTATUS, Documentos.DOC_ANO, Documentos.DOC_MES, Tipodocumentos.TIPODOC
 HAVING (Documentos.DOC_ESTATUS <> 'A') AND (Documentos.DOC_ANO = '$anio') AND (Documentos.DOC_MES = '$mes') AND (Tipodocumentos.TIPODOC = 'FAC')
 ORDER BY FECHA";


  //obtengo el total del importe en el reporte

  $sqltotal = "SELECT CONCAT('Q ',CAST(SUM(Documentos.DOC_TOTALCOSTO) AS MONEY)) AS COSTO, CONCAT('Q ',CAST(SUM(Documentos.DOC_TOTALVENTA) AS MONEY)) AS VENTA, CONCAT('Q ',CAST(SUM(Documentos.DOC_TOTALVENTA - Documentos.DOC_TOTALCOSTO) AS MONEY)) AS UTILIDAD
              FROM Documentos LEFT OUTER JOIN Tipodocumentos ON Documentos.CODDOC = Tipodocumentos.CODDOC AND Documentos.EMP_NIT = Tipodocumentos.EMP_NIT
              WHERE (Documentos.DOC_ANO = '$anio') AND (Documentos.DOC_MES = '$mes') AND (Tipodocumentos.TIPODOC = 'FAC')";

  $ejecutartotal = sqlsrv_query($connn, $sqltotal);
  $filatotal = sqlsrv_fetch_array($ejecutartotal);
  if ($filatotal==true){
      $totalreporte = $filatotal['VENTA'];
      $totalreportecosto = $filatotal['COSTO'];
      $totalreporteutilidad = $filatotal['UTILIDAD'];
  } else {
      $totalreporte ='Q 0.00';
      $totalreportecosto ='Q 0.00';
      $totalreporteutilidad ='Q 0.00';
  }


?>

  <h1>Ventas del Mes</h1>
  <p>Total Venta : <?php echo $totalreporte; ?></p>
  <p>Total Costo : <?php echo $totalreportecosto; ?></p>
  <p>Total Utilidad: : <?php echo $totalreporteutilidad; ?></p>
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Costo</th>
                      <th>Importe</th>
                      <th>Utilidad</th>
                    </tr>
              </thead>
               <tfoot>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
               </tfoot>
              <tbody>

            <!-- LLENA LA TABLA CON LOS DATOS DE LA CONSULTA SQL -->
            <?php
              $ejecutar = sqlsrv_query($connn, $consulta);

              $i = 0;

              while($fila = sqlsrv_fetch_array($ejecutar)){
              $fecha = $fila['FECHA'];
              $costo = $fila['COSTO'];
              $venta = $fila['VENTA'];
              $utilidad = $fila['UTILIDAD'];
              $i++;
            ?>
                <tr>
                <td><?php echo $fecha; ?></td>
               <td align="right"><?php echo $costo; ?></td>
                <td align="right"><?php echo $venta; ?></td>
                <td align="right"><?php echo $utilidad; ?></td>
                </tr>
                <?php } ?>
              </tbody>
            </table>
          </div>
