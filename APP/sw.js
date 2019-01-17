
var CACHE = 'arespos-onlineV3';
const staticAssets = [
  './',
  './manifest.json',
  './favicon.png',
  './assets/img/FONDO.jpg',
  './assets/img/usuario.png',
  './assets/img/imgventas.png',
  './assets/img/favicon.png',
  './assets/css/btn.css',
  './assets/css/bootstrap.min.css',
  './assets/css/now-ui-dashboard.css',
  './assets/js/core/jquery.min.js',
  './assets/js/core/popper.min.js',
  './assets/js/core/bootstrap.min.js',
  './assets/js/plugins/perfect-scrollbar.jquery.min.js',
  './assets/js/plugins/bootstrap-notify.js',
  './assets/js/now-ui-dashboard.js',
  './assets/js/JsStore.min.js',
  './assets/js/sweetalert.min.js',
  './onlineLibrary/socket.io.js',
  './controllers/funciones.js',
  './controllers/database.js',
  './controllers/index.js',
  './controllers/inicio.js',
  './controllers/dataventas.js',
  './controllers/ventas.js',
  './controllers/clientes.js',
  './controllers/precios.js',
  './controllers/config.js',
  './controllers/tools.js',
  './controllers/GlobalVars.js',
  './controllers/simplescrollup.js',
  './index.html',
  './views/viewLogin.html',
  './views/viewClientes.html',
  './views/viewInicio.html',
  './views/viewPrecios.html',
  './views/viewConfig.html',
  './views/viewTools.html',
  './views/viewVentas.html',
  './views/viewVentasPedido.html',
  './views/viewVentasCliente.html',
  './views/viewVentasEditar.html',
  './sw.js'
];

self.addEventListener('install', function(evt) {
  console.log('Service worker instalado');
  evt.waitUntil(caches.open(CACHE).then(function (cache) {
    cache.addAll(staticAssets);
  }));
});

self.addEventListener('fetch', function(evt) {
  console.log('El service worker está cargando el caché');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(
    update(evt.request)
    .then()//refresh)
  );
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request);
  });
}

async function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        console.log('Cache actualizado');
        return response;
      });
    });
  });
}

/*
function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      var message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      };
      client.postMessage(JSON.stringify(message));
    });
  });
}*/