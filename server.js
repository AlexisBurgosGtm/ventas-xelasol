var express = require("express");
var app = express();

const sql = require('mssql')
var http = require('http').Server(app);
var io = require('socket.io')(http);

//const sqlString = 'mssql://iEx:iEx@SERVERALEXIS\\SQLEXPRESS/ARES_SYNC';
const sqlString = 'mssql://DB_A422CF_ARES_admin:razors1805@sql5003.site4now.net/DB_A422CF_ARES';

const empnit ='001';

const PORT = process.env.PORT || 5000;

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
	const pool = await sql.connect(sqlString)
	try {
		//const pool = await sql.connect(sqlString)
		const result = await sql.query`SELECT EMPNIT,EMPNOMBRE FROM EMPRESAS ORDER BY EMPNOMBRE`
		console.dir('Empresas cargadas exitosamente');
		//sql.close()
	
		res.send(result);
	} catch (err) {
		// ... error checks
		console.log(String(err));
	}
	sql.close()
});

//OBTIENE LAS VENTAS POR DIA Y VENDEDOR
app.get("/api/ventas/dia", async(req,res)=>{
	const pool = await sql.connect(sqlString)
	try {
		//const pool = await sql.connect(sqlString)
		const result = await sql.query`SELECT ANIO,MES,DIA,CODVEN,NOMVEN,VENTA FROM VENTAS_DIA_VENDEDOR WHERE EMPNIT=${empnit}`
		console.dir('Generado Ventas por vendedor por día');
		//sql.close()
		res.send(result);
	} catch (err) {
		console.log(String(err));
	}
	sql.close()
});

//OBTIENE LA LISTA DE PRODUCTOS Y PRECIOS CON EXISTENCIA
app.get("/api/productos/all", async(req,res)=>{
			const pool = await sql.connect(sqlString)		
			try {
				//const pool = await sql.connect(sqlString)
				const result = await sql.query`SELECT CODPROD,DESPROD,DESMARCA,CODMEDIDA,EQUIVALE,COSTO,PRECIO,concat('Q',PRECIO) as QPRECIO, EXISTENCIA FROM PRECIOS WHERE EMPNIT=${empnit}`
				console.dir('Productos cargados');
				//console.dir(result);
				//sql.close()
				res.send(result);
			} catch (err) {
				// ... error checks
				console.log(String(err));
			}
			sql.close()
});

// OBTIENE TODOS LOS CLIENTES DE LA TABLA
app.get("/api/clientes/all", async(req,res)=>{
	const pool = await sql.connect(sqlString)
	try {
		//const pool = await sql.connect(sqlString)
		const result = await sql.query`SELECT CLIENTES.CODCLIENTE, CLIENTES.NIT, CLIENTES.NOMCLIENTE, CLIENTES.DIRCLIENTE, MUNICIPIOS.DESMUNICIPIO, DEPARTAMENTOS.DESDEPARTAMENTO, CLIENTES.TELEFONOS, CLIENTES.SALDO
									FROM CLIENTES LEFT OUTER JOIN DEPARTAMENTOS ON CLIENTES.CODDEPTO = DEPARTAMENTOS.CODDEPARTAMENTO LEFT OUTER JOIN
								 				MUNICIPIOS ON CLIENTES.CODMUNICIPIO = MUNICIPIOS.CODMUNICIPIO
									WHERE (CLIENTES.EMPNIT = ${empnit})`
		console.dir('Productos cargados');
		//sql.close()
	
		res.send(result);
	} catch (err) {
		// ... error checks
		console.log(String(err));
	}
	sql.close()
//}
});

// OBTIENE LA LISTA DE VENDEDORES
app.get("/api/usuarios/login", async(req,res)=>{
	//var usuario = req.query.usuario;
	//var clave = req.query.clave;

	//console.log(usuario + ' - ' + clave)
	//async () => {
		const pool = await sql.connect(sqlString)
		try {
			//const pool = await sql.connect(sqlString)
			const result = await sql.query`SELECT CODVEN, NOMVEN, CLAVE, CODDOC FROM VENDEDORES WHERE EMPNIT = ${empnit}`
			console.dir('La consulta usuario se generó');
			//sql.close()
			//return result;
			/*
			if (result.rowsAffected==1){
				console.log('Autorizado')
				res.send('Autorizado');
			} else {
				console.log('Denegado')
				res.send('Denegado');
			}*/

			res.send(result);
			//console.log(result);
		} catch (err) {
			// ... error checks
			res.send('Denegado');
			console.log('Error en la consulta usuarios');
		}
		sql.close()
});

// INSERTA DATOS EN LA TABLA DOCUMENTOS DEL SERVER
app.get("/api/ventas/documentos", async(req,res)=>{
	
	console.log('Llegó la solicitud ..');

	let _coddoc = req.query.coddoc;
	let _correlativo = req.query.correlativo;
	let _codcliente = req.query.codcliente;
	let _totalventa = req.query.totalventa;
	let _token = req.query.token;
	let _anio = req.query.anio;
	let _mes = req.query.mes;
	let _dia = req.query.dia;
	let _codven = req.query.codven;
		
	console.log('Llegó la solicitud ' + _coddoc + _correlativo + _codcliente + _totalventa);

	let sqlQry = 'insert into web_documentos (token,coddoc,correlativo,anio,mes,dia,codven,codcliente,totalventa) values (@token,@coddoc,@correlativo,@anio,@mes,@dia,@codven,@codcliente,@totalventa)'

		const pool = await sql.connect(sqlString)
	    try {
			let result = await pool.request()
				.input('token', sql.VarChar(255), _token)
				.input('coddoc', sql.VarChar(50), _coddoc)
				.input('correlativo', sql.Float, _correlativo)
				.input('anio', sql.Int, _anio)
				.input('mes', sql.Int, _mes)
				.input('dia', sql.Int, _dia)
				.input('codven', sql.Int, _codven)
				.input('codcliente', sql.Int, _codcliente)
				.input('totalventa', sql.Float, _totalventa)
				.query(sqlQry)
				
				console.dir('Api Documentos Success: ' + result)
				//res.send('Se insertaron los Documentos');
		} catch (err) {
			// ... error checks
			console.log('Api Documentos Error: ' + String(err));
		}
	
		sql.close()
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "APP/views/404.html");
  //res.send('No hay nada');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg,user){
	  io.emit('chat message', msg, user);
	});
});

//app.listen(PORT, function () {
  //console.log('Servidor iniciado en el puerto ' + String(PORT));
//})

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

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