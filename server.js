const sql = require('mssql')

const sqlString = 'mssql://iEx:iEx@SERVERALEXIS\\SQLEXPRESS/ARES_SYNC';
//const sqlString = 'mssql://DB_A422CF_ARES_admin:razors1805@sql5003.site4now.net/DB_A422CF_ARES';
const empnit ='001';

var express = require("express");
var app = express();
const PORT = process.env.PORT || 3003;

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

//OBTIENE LA LISTA DE PRODUCTOS Y PRECIOS CON EXISTENCIA
app.get("/api/productos/all", async(req,res)=>{
			try {
				const pool = await sql.connect(sqlString)
				const result = await sql.query`SELECT CODPROD,DESPROD,DESMARCA,CODMEDIDA,EQUIVALE,COSTO,PRECIO,concat('Q',PRECIO) as QPRECIO, EXISTENCIA FROM PRECIOS WHERE EMPNIT=${empnit}`
				console.dir('Productos cargados');
				//console.dir(result);
				sql.close()
				res.send(result);
			} catch (err) {
				// ... error checks
				console.log(String(err));
			}
});

// OBTIENE TODOS LOS CLIENTES DE LA TABLA
app.get("/api/clientes/all", async(req,res)=>{

	try {
		const pool = await sql.connect(sqlString)
		const result = await sql.query`SELECT CLIENTES.CODCLIENTE, CLIENTES.NIT, CLIENTES.NOMCLIENTE, CLIENTES.DIRCLIENTE, MUNICIPIOS.DESMUNICIPIO, DEPARTAMENTOS.DESDEPARTAMENTO, CLIENTES.TELEFONOS, CLIENTES.SALDO
									FROM CLIENTES LEFT OUTER JOIN DEPARTAMENTOS ON CLIENTES.CODDEPTO = DEPARTAMENTOS.CODDEPARTAMENTO LEFT OUTER JOIN
								 				MUNICIPIOS ON CLIENTES.CODMUNICIPIO = MUNICIPIOS.CODMUNICIPIO
									WHERE (CLIENTES.EMPNIT = ${empnit})`
		console.dir('Productos cargados');
		sql.close()
	
		res.send(result);
	} catch (err) {
		// ... error checks
		console.log(String(err));
	}
//}
});

// OBTIENE LA LISTA DE VENDEDORES
app.get("/api/usuarios/login", async(req,res)=>{
	//var usuario = req.query.usuario;
	//var clave = req.query.clave;

	//console.log(usuario + ' - ' + clave)
	//async () => {
		try {
			const pool = await sql.connect(sqlString)
			const result = await sql.query`SELECT NOMVEN, CLAVE, CODDOC FROM VENDEDORES WHERE EMPNIT = ${empnit}`
			console.dir('La consulta usuario se generó');
			sql.close()
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
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "APP/404.html");
  res.send('No hay nada');
});

app.listen(PORT, function () {
  console.log('Servidor iniciado en el puerto ' + String(PORT));
})

