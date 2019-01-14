var express = require("express");
var app = express();

const sql = require('mssql')

const PORT = process.env.PORT || 3600;
/*
const serverdata = {
	'server':'SERVERALEXIS\\SQLEXPRESS',
	'database':'ARES_SYNC',
	'user':'iEx',
	'pass':'iEx'
}

const config = {
    user: 'iEx',
    password: 'iEx',
    server: 'SERVERALEXIS\\SQLEXPRESS',
    database: 'ARES_SYNC',
}
*/

const config = {
    user: 'DB_A43F6F_express_admin',
    password: 'razors1805',
    server: 'sql5006.site4now.net',
    database: 'DB_A43F6F_express',
}


const serverdata = {
	'server':'sql5006.site4now.net',
	'database':'DB_A43F6F_express',
	'user':'DB_A43F6F_express_admin',
	'pass':'razors1805'
}


//var http = require('http').Server(app);
//var io = require('socket.io')(http);

var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('APP'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
	res.sendFile(path + 'APP/index.html');
}); 

// OBTIENE TODAS LAS EMPRESAS
app.get("/api/empresas/all", async(req,res)=>{
	
	let token = req.query.token;

	const pool = await sql.connect(sqlString)
	try {
		
		const result = await sql.query`SELECT EMPNIT,EMPNOMBRE FROM EMPRESAS WHERE TOKEN=${token} ORDER BY EMPNOMBRE`
		console.dir('Empresas cargadas exitosamente token ' + token);
	
		res.send(result);
		
	} catch (err) {
		console.log(String(err));
	}
	sql.close()
});

//OBTIENE LAS VENTAS POR DIA Y VENDEDOR
app.get("/api/ventas/dia", async(req,res)=>{
	
	let token = req.query.token;
	
	const pool = await sql.connect(sqlString)
	try {
		const result = await sql.query`SELECT ANIO,MES,DIA,CODVEN,NOMVEN,VENTA,EMPNIT FROM VENTAS_DIA_VENDEDOR WHERE TOKEN=${token}`
		console.dir('Generado Ventas por vendedor por día');
		res.send(result);
	} catch (err) {
		console.log(String(err));
	}
	sql.close()
});

//OBTIENE LA LISTA DE PRODUCTOS Y PRECIOS CON EXISTENCIA
app.get("/api/productos/all", async(req,res)=>{
	let token = req.query.token
			const pool = await sql.connect(sqlString)		
			try {
				const result = await sql.query`SELECT CODPROD,DESPROD,DESMARCA,CODMEDIDA,EQUIVALE,COSTO,PRECIO,concat('Q',PRECIO) as QPRECIO, EXISTENCIA, EMPNIT FROM PRECIOS WHERE TOKEN=${token}`
				console.dir('Productos cargados');
				res.send(result);
			} catch (err) {
				console.log(String(err));
			}
			sql.close()
});

// OBTIENE TODOS LOS CLIENTES DE LA TABLA
app.get("/api/clientes/all", async(req,res)=>{
	let token = req.query.token;

	const pool = await sql.connect(sqlString)
	try {
		const result = await sql.query`SELECT CLIENTES.CODCLIENTE, CLIENTES.NIT, CLIENTES.NOMCLIENTE, CLIENTES.DIRCLIENTE, MUNICIPIOS.DESMUNICIPIO, DEPARTAMENTOS.DESDEPARTAMENTO, CLIENTES.TELEFONOS, CLIENTES.SALDO, CLIENTES.EMPNIT
									FROM CLIENTES LEFT OUTER JOIN DEPARTAMENTOS ON CLIENTES.CODDEPTO = DEPARTAMENTOS.CODDEPARTAMENTO LEFT OUTER JOIN
								 				MUNICIPIOS ON CLIENTES.CODMUNICIPIO = MUNICIPIOS.CODMUNICIPIO
									WHERE (CLIENTES.TOKEN=${token})`
		console.dir('Productos cargados');
		
		res.send(result);
	} catch (err) {
		console.log(String(err));
	}
	sql.close()
});

// OBTIENE LA LISTA DE VENDEDORES
app.get("/api/usuarios/login", async(req,res)=>{
	let token = req.query.token;
	
		const pool = await sql.connect(sqlString)
		try {
			const result = await sql.query`SELECT CODVEN, NOMVEN, CLAVE, CODDOC,EMPNIT FROM VENDEDORES WHERE TOKEN=${token}`
			console.dir('La consulta usuario se generó');
			res.send(result);
		
		} catch (err) {
			// ... error checks
			res.send('Denegado');
			console.log('Error en la consulta usuarios');
		}
		sql.close()
});

app.post("/api/ventas/test", async(req,res)=>{
	await res.send(req.body)
	
	var nom = req.body.nombre;
	var apellido = req.body.apellido
	console.log('nombre: ' + nom + " " + apellido);	

})

// INSERTA DATOS EN LA TABLA DOCUMENTOS DEL SERVER
//app.get("/api/ventas/documentos", async(req,res)=>{
app.post("/api/ventas/documentos", async(req,res)=>{
	
	let _empnit = req.body.empnit;
	let _coddoc = req.body.coddoc;
	let _correlativo = req.body.correlativo;
	let _codcliente = req.body.codcliente;
	let _totalventa = req.body.totalventa;
	let _token = req.body.token;
	let _anio = req.body.anio;
	let _mes = req.body.mes;
	let _dia = req.body.dia;
	let _codven = req.body.codven;
		
	console.log('Llegó la solicitud ' + _coddoc + _correlativo + _codcliente + _totalventa);

	let sqlQry = 'insert into web_documentos (empnit,token,coddoc,correlativo,anio,mes,dia,codven,codcliente,totalventa) values (@empnit,@token,@coddoc,@correlativo,@anio,@mes,@dia,@codven,@codcliente,@totalventa)'

		//const pool = await sql.connect(sqlString)
		const pool1 = new sql.ConnectionPool(config, err => {
			// ... error checks
					 
			// Query
			 pool1.request() // or: new sql.Request(pool1)
			 .input('empnit', sql.VarChar(50), _empnit)
			 .input('token', sql.VarChar(255), _token)
			 .input('coddoc', sql.VarChar(50), _coddoc)
			 .input('correlativo', sql.Float, _correlativo)
			 .input('anio', sql.Int, _anio)
			 .input('mes', sql.Int, _mes)
			 .input('dia', sql.Int, _dia)
			 .input('codven', sql.Int, _codven)
			 .input('codcliente', sql.Int, _codcliente)
			 .input('totalventa', sql.Float, _totalventa)
			 .query(sqlQry, (err, result) => {
				if (result.rowsAffected){
					res.send('Ingreso exitoso')
				}
			})
		 
		})
		 
		pool1.on('error', err => {
			// ... error handler
		})
});


// INSERTA DATOS EN LA TABLA DOCPRODUCTOS DEL SERVER

app.post("/api/ventas/docproductos", async(req,res)=>{

	/*
	const json = await req.json();
	json.recordset.map(
		(data)=>{
		console.log(String(data.desprod));
		}
	)*/

		let _token = req.body.token;
		let _empnit = req.body.empnit;
		let _anio = req.body.anio;
		let _mes = req.body.mes;
		let _dia = req.body.dia;
		let _coddoc = req.body.coddoc;
		let _correlativo = req.body.correlativo;

		let _codprod = req.body.codprod;
		let _desprod = req.body.desprod;
		let _codmedida = req.body.codmedida;
		let _equivale = req.body.equivale;
		let _cantidad = req.body.cantidad;
		let _costo = req.body.costo;
		let _precio = req.body.precio;
		let _totalcosto = req.body.totalcosto;
		let _totalprecio = req.body.totalprecio;
		//let _ = req.body.;
				
		let sqlQry = 'insert into web_docproductos (token,empnit,anio,mes,dia,coddoc,correlativo,codprod,desprod,codmedida,equivale,cantidad,costo,precio,totalcosto,totalprecio) values (@token,@empnit,@anio,@mes,@dia,@coddoc,@correlativo,@codprod,@desprod,@codmedida,@equivale,@cantidad,@costo,@precio,@totalcosto,@totalprecio)'
			
		const pool1 = new sql.ConnectionPool(config, err => {
			// ... error checks
		 
			pool1.request()
			.input('token', sql.VarChar(255), _token)
			.input('empnit', sql.VarChar(50), _empnit)
			.input('anio', sql.Int, _anio)
			.input('mes', sql.Int, _mes)
			.input('dia', sql.Int, _dia)
			.input('coddoc', sql.VarChar(50), _coddoc)
			.input('correlativo', sql.Float, _correlativo)
			.input('codprod', sql.VarChar(200), _codprod)
			.input('desprod', sql.VarChar(255), _desprod)
			.input('codmedida', sql.VarChar(50), _codmedida)
			.input('equivale', sql.Int, _equivale)
			.input('cantidad', sql.Int, _cantidad)
			.input('costo', sql.Float, _costo)
			.input('totalcosto', sql.Float, _totalcosto)
			.input('precio', sql.Float, _precio)
			.input('totalprecio', sql.Float, _totalprecio)
			.query(sqlQry, (err, result) => {
				// ... error checks
				 //console.dir(result)
				 
			})
		 
		})
		 
		pool1.on('error', err => {
			// ... error handler
		})
	
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "APP/views/404.html");
});

/*
io.on('connection', function(socket){
	socket.on('chat message', function(msg,user){
	  io.emit('chat message', msg, user);
	});
});
*/

app.listen(PORT, function () {
  console.log('Servidor iniciado en el puerto ' + String(PORT));
});

/*
http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
*/

/*CODIGO PARA EL HTML Y SOCKET
   $(function () {
        var socket = io();
        $('form').submit(function(){
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(msg));
          window.scrollTo(0, document.body.scrollHeight);
        });
      });
*/