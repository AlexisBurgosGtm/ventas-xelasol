<!DOCTYPE html>
<html lang="es-Es">
<!-- carga los metas del head -->
<?php include('head.php'); ?>

<body class="fixed-nav sticky-footer bg-light" id="page-top">

<!--carga el menú -->
<?php include('navbar.php'); ?>
<?php //include('navbar3.php'); ?>

<!-- contenedor principal     -->
  <div class="content-wrapper">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">
          <h1>Listado de precios e inventario</h1>

          <!-- Agrega tu contenido acá -->
          <?php include('data_inventario.php'); ?>

        </div>
      </div>
    </div>
    <!-- /.container-fluid-->
    <!-- /.content-wrapper-->

    <!-- Pié de página -->
  <?php include('footer.php') ?>

  </div>
</body>

</html>
