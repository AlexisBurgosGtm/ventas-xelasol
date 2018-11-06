const sql = require('mssql')
const config = {
	user: 'iEx',
	password: 'iEx',
	server: 'SERVERALEXIS\\SQLEXPRESS', 
	database: 'ARES_SYNC' 
};

//const sqlString = 'mssql://iEx:iEx@SERVERALEXIS\\SQLEXPRESS/ARES_SYNC';
const sqlString = 'mssql://DB_A422CF_ARES_admin:razors1805@sql5003.site4now.net/DB_A422CF_ARES';

var express = require("express");
var app = express();
const PORT = process.env.PORT || 3003;

var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('app'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
	res.sendFile(path + 'app/index.html');
});

app.get("/login",function(req,res){
	res.sendFile(path + 'app/index.html');
});

app.get("/inicio",function(req,res){
	res.sendFile(path + 'app/inicio.html');
});

app.get("/api/productos/all", async(req,res)=>{
		//var filtro = req.query.filtro;
		//console.log(filtro);
		//async () => {
			try {
				const pool = await sql.connect(sqlString)
				//const result = await sql.query`select * from mytable where id = ${value}`
				const result = await sql.query`SELECT CODPROD,DESPROD,DESMARCA,CODMEDIDA,EQUIVALE,COSTO,PRECIO,EXISTENCIA FROM PRECIOS`
				console.dir(result);
				sql.close()
				//return result;
				res.send(result);
			} catch (err) {
				// ... error checks
				console.log(String(err));
			}
		//}
});

app.get("/api/usuarios/login", async(req,res)=>{
	var usuario = req.query.usuario;
	var clave = req.query.clave;

	console.log(usuario + ' - ' + clave)
	//async () => {
		try {
			const pool = await sql.connect(sqlString)
			const result = await sql.query`SELECT NOMVEN, CLAVE FROM VENDEDORES where NOMVEN = ${usuario} AND CLAVE= ${clave}`
			console.dir('La consulta usuario se generó');
			sql.close()
			//return result;
			console.log(result);
			if (result.rowsAffected==1){
				console.log('Autorizado')
				res.send('Autorizado');
			} else {
				console.log('Denegado')
				res.send('Denegado');
			}

			//res.send(result);
		} catch (err) {
			// ... error checks
			res.send('Denegado');
			console.log('Error en la consulta usuarios');
		}
	
});

app.use("/",router);

app.use("*",function(req,res){
  //res.sendFile(path + "app/404.html");
  res.send('No hay nada');
});

app.listen(PORT, function () {
  console.log('Servidor iniciado en el puerto ' + String(PORT));
})

