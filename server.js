var express = require("express");
var app = express();

const PORT = process.env.PORT || 3600;

//var http = require('http').Server(app);
//var io = require('socket.io')(http);

const config = {
	user: 'DB_A45479_EXPRESS_admin',
	password: 'razors1805',
	server: 'sql7002.site4now.net',
	database: 'DB_A45479_EXPRESS',
	pool: {
		max: 100,
		min: 0,
		idleTimeoutMillis: 30000
	}
}

/*
const config = {
	user: 'iEx',
	password: 'iEx',
	server: 'SERVERALEXIS\\SQLEXPRESS',
	database: 'ARES_SYNC',
	pool: {
		max: 100,
		min: 0,
		idleTimeoutMillis: 30000
	}
}
*/
/*
	const config = {
		user: 'DB_A43F6F_express_admin',
		password: 'razors1805',
		server: 'sql5006.site4now.net',
		database: 'DB_A43F6F_express',
		 pool: {
			max: 100,
			min: 0,
			idleTimeoutMillis: 30000
		}
	}
*/
const sqlString = 'mssql://' + config.user + ':' + config.password + '@' + config.server + '/' + config.database;



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

	const sql = require('mssql')
	let token = req.query.token;

	const pool = await sql.connect(sqlString)
	try {
		//const pool = await sql.connect(sqlString)
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
	
	const sql = require('mssql')
	let token = req.query.token;
	/*
	const pool = await sql.connect(sqlString)
	try {
		const result = await sql.query`SELECT ANIO,MES,DIA,CODVEN,NOMVEN,VENTA,EMPNIT FROM VENTAS_DIA_VENDEDOR WHERE TOKEN=${token}`
		console.dir('Generado Ventas por vendedor por día');
		res.send(result);
	} catch (err) {
		console.log(String(err));
	}
	sql.close()*/
});

//OBTIENE LA LISTA DE PRODUCTOS Y PRECIOS CON EXISTENCIA
app.get("/api/productos/all", async(req,res)=>{
	const sql = require('mssql')
	let token = req.query.token
			const pool = await sql.connect(config)		
			try {
				const result = await sql.query`SELECT CODPROD,DESPROD,DESMARCA,CODMEDIDA,EQUIVALE,COSTO,PRECIO,concat('Q',PRECIO) as QPRECIO, EXISTENCIA, EMPNIT FROM PRECIOS WHERE TOKEN=${token}`
				console.dir('Productos cargados');
				res.send(result);
			} catch (err) {
				console.log(String(err));
			}
			sql.close()
});

//OBTIENE LA LISTA DE PRODUCTOS CON EXISTENCIA ÚNICA
app.get("/api/productos/inventario", async(req,res)=>{
	const sql = require('mssql')
	let token = req.query.token
			const pool = await sql.connect(config)		
			try {
				const result = await sql.query`SELECT CODPROD, DESPROD, EXISTENCIA, LASTUPDATE FROM PRECIOS GROUP BY TOKEN, EMPNIT, CODPROD, DESPROD, EXISTENCIA, LASTUPDATE HAVING (TOKEN = ${token})`
				console.dir('Existencias cargadas');
				res.send(result);
			} catch (err) {
				console.log(String(err));
			}
			sql.close()
});



// OBTIENE TODOS LOS CLIENTES DE LA TABLA
app.get("/api/clientes/all", async(req,res)=>{
	const sql = require('mssql')
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
	const sql = require('mssql')
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


app.post("/api/cerrarconexion", async(req,res)=>{
	const sql = require('mssql')
	await sql.close()
	res.send('Servidor Cerrado')
	console.log('Conexión cerrada');
})

// INSERTA DATOS EN LA TABLA DOCUMENTOS DEL SERVER
//app.get("/api/ventas/documentos", async(req,res)=>{
app.post("/api/ventas/documentos", async(req,res)=>{

	const sql = require('mssql')
	let _empnit = req.body.empnit;
	let _coddoc = req.body.coddoc;
	let _correlativo = req.body.correlativo;
	let _codcliente = req.body.codcliente;
	let _totalventa = req.body.totalventa;
	let _totalcosto = req.body.totalcosto;
	let _token = req.body.token;
	let _anio =  req.body.anio;
	let _mes = req.body.mes;
	let _dia = req.body.dia;
	let _codven = req.body.codven;
	let _fecha = new Date(_anio,_mes,_dia);
		
	console.log('Llegó la solicitud ' + 'coddoc:' + _coddoc + ' correlativo: ' + _correlativo + ' cliente: ' + _codcliente + ' total: ' + _totalventa);

	let sqlQry = 'insert into web_documentos (empnit,token,coddoc,correlativo,anio,mes,dia,fecha,codven,codcliente,totalventa,totalcosto) values (@empnit,@token,@coddoc,@correlativo,@anio,@mes,@dia,@fecha,@codven,@codcliente,@totalventa,@totalcosto)'

		//const pool = await sql.connect(sqlString)
		const pool1 = await new sql.ConnectionPool(config, err => {
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
			 .input('fecha', sql.Date, _fecha)
			 .input('codven', sql.Int, _codven)
			 .input('codcliente', sql.Int, _codcliente)
			 .input('totalventa', sql.Float, _totalventa)
			 .input('totalcosto', sql.Float, _totalcosto)
			 .query(sqlQry, (err, result) => {
				if (result.rowsAffected){
					res.send('Ingreso exitoso')
				}
			});
			//sql.close()
			//pool1.release();
		 
		})
		 
		pool1.on('error', err => {
			// ... error handler
		})
});

// INSERTA DATOS EN LA TABLA DOCPRODUCTOS DEL SERVER
app.post("/api/ventas/docproductos", async(req,res)=>{

	const sql = require('mssql')
	let _token = req.body.token;
	let _empnit = req.body.empnit;

	let _anio =  req.body.anio;
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
	
	console.log('peticion de insert en docprodutos: ' + _desprod)
	
		const pool2 = await new sql.ConnectionPool(config, err => {
			 var sqlQry = 'insert into web_docproductos (token,empnit,anio,mes,dia,coddoc,correlativo,codprod,desprod,codmedida,equivale,cantidad,costo,precio,totalcosto,totalprecio) values (@token,@empnit,@anio,@mes,@dia,@coddoc,@correlativo,@codprod,@desprod,@codmedida,@equivale,@cantidad,@costo,@precio,@totalcosto,@totalprecio)'
			 pool2.request() // or: new sql.Request(pool1)
			 .input('token', sql.VarChar(255), _token)
			 .input('empnit', sql.VarChar(50), _empnit)
			 .input('anio', sql.Int, _anio)
			 .input('mes', sql.Int, _mes)
			 .input('dia', sql.Int, _dia)
			 .input('coddoc', sql.VarChar(50), _coddoc)
			 .input('correlativo', sql.Float, _correlativo)
			 .input('codprod', sql.VarChar(100), _codprod)
			 .input('desprod', sql.VarChar(250), _desprod)
			 .input('codmedida', sql.VarChar(50), _codmedida)
			 .input('equivale', sql.Int, _equivale )
			 .input('cantidad', sql.Int, _cantidad)
			 .input('costo', sql.Float, _costo)
			 .input('precio', sql.Float, _precio)
			 .input('totalcosto', sql.Float, _totalcosto)
			 .input('totalprecio', sql.Float, _totalprecio)
			 .query(sqlQry, (err, result) => {
				if (result.rowsAffected){
					res.send('Ingreso exitoso docproductos... ' + _desprod)
				}
			});
			//sql.close()
			//pool1.release();
		 
		})
		 
		pool2.on('error', err => {
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