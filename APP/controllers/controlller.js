export default class Controller {
    
    loadView (url) {
        return new Promise((resolve, reject) => {
            
            contenedor = document.getElementById('contenedor');

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'text';
            xhr.onload = function(e) {
      
              if (this.status == 200) {
      
                var view = xhr.response;
                contenedor.appendChild(view);
                
                resolve();
      
              } else {
      
                reject();
      
              }
            }
      
            xhr.send();
      
          });
    }

    loadScript (url) {
  
      return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.async = true;
        script.src = url;
  
        script.onload = resolve;
        script.onerror = reject;
  
        document.head.appendChild(script);
      });
    }
  
    loadCSS (url) {
      return new Promise((resolve, reject) => {
  
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'text';
        xhr.onload = function(e) {
  
          if (this.status == 200) {
  
            var style = document.createElement('style');
            style.textContent = xhr.response;
            document.head.appendChild(style);
            resolve();
  
          } else {
  
            reject();
  
          }
        }
  
        xhr.send();
  
      });
    }
  
  }
  