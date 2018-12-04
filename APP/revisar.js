$("#codigo_producto").keydown(function (evento) {
    if (evento.ctrlKey) evento.preventDefault();
    switch (evento.keyCode) {
        case TECLA_ENTER:
            comprueba_si_existe_codigo($(this).val());
            break;
        case TECLA_F1:
            preparar_para_realizar_venta();
            evento.preventDefault();
            break;
        case TECLA_F2:
            cancelar_venta();
            evento.preventDefault();
            break;
        case TECLA_MENOS:
            quitar_ultimo_producto();
            evento.preventDefault();
            break;
        default:
            // statements_def
            break;
    }
});


$( document ).ready(function() {

	$("#btn-buscar").click(function(event) {
				
		ajaxGet();
	});

	function ajaxGet(){

		var filtro = document.getElementById('filtro').value;

			$.ajax({
				type : "GET",
				url : window.location + "api/productos/all" + "?filtro=" + filtro,
					success: function(result){
					$('#tbody').empty();
						
					//$('#tabla').html(result);
					document.getElementById('tbody').innerHTML = result;

					console.log("Success: ", result);
				},
				error : function(e) {
					
					console.log("ERROR: ", e);
					var error = document.createElement('label');
					error.className="text-center text-primary";
					error.innerText ="No se pudieron cargar los datos";
					document.getElementById('tbody').appendChild(error);
				}
			});	

	}
})

  
    function ajaxPost(){
    	
    	// PREPARE FORM DATA
    	var formData = {
    		firstname : $("#firstname").val(),
    		lastname :  $("#lastname").val()
    	}
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "api/customers/save",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(customer) {
				$("#postResultDiv").html("<p>" + 
					"Post Successfully! <br>" +
					"--->" + JSON.stringify(customer)+ "</p>"); 
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
    	resetData();

    }
    
 
