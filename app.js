
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Conexión a Mongoose.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vehiculos', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});

//Documentos
var VehiculoSchema = mongoose.Schema({
	nombre: String,
    precio: String,
    modelo: String,
    marca: String,
    fechaalquiler: String,
    telefono: String,
    dui: String,
    cantidad: String,
    fechadevolucion: String
});
var Vehiculo = mongoose.model('Vehiculo', VehiculoSchema);

app.get('/', function(req, res){
	res.sendfile('./public/index.html');
});

app.get('/listar', function(req, res){
	Vehiculo.find({}, function(error, vehiculos){
      	if(error){
      		res.send('Error.');
      	}else{
        	res.send(vehiculos);        	
      	}
   })
});

app.get('/recuperar', function(req, res){
	Vehiculo.findById(req.query._id, function(error, documento){
      	if(error){
         	res.send('Error.');
      	}else{
         	res.send(documento);
      	}
   });
});

app.post('/guardar', function(req, res){
	if(req.query._id == null){
		//Inserta
		var vehiculo = new Vehiculo({
		   nombre: req.query.nombre,
		   precio: req.query.precio,
		   modelo: req.query.modelo,
		   marca: req.query.marca,
		   fechaalquiler: req.query.fechaalquiler,
		   telefono: req.query.telefono,
		   dui: req.query.dui,
		   cantidad: req.query.cantidad,
		   fechadevolucion: req.query.fechadevolucion
		});
		vehiculo.save(function(error, documento){
			if(error){
			 	res.send('Error.');
			}else{
			 	res.send(documento);
			}
	   	});
	}else{
		//Modifica
		Vehiculo.findById(req.query._id, function(error, documento){
		  	if(error){
				res.send('Error.');
		  	}else{
				var vehiculo = documento;
				vehiculo.nombre = req.query.nombre,
			   	vehiculo.precio = req.query.precio,
			   	vehiculo.modelo = req.query.modelo,
			   	vehiculo.marca = req.query.marca,
			   	vehiculo.fechaalquiler = req.query.fechaalquiler,
			   	vehiculo.telefono = req.query.telefono,
			   	vehiculo.dui = req.query.dui,
			   	vehiculo.cantidad = req.query.cantidad,
			   	vehiculo.fechadevolucion = req.query.fechadevolucion
				vehiculo.save(function(error, documento){
			    	if(error){
			       		res.send('Error.');
			    	}else{ 
			       		res.send(documento);
			    	}
			 	});
			}
		});
	}
});

app.post('/eliminar', function(req, res){
	Vehiculo.remove({_id: req.query._id}, function(error){
		if(error){
			res.send('Error.');
		}else{
			res.send('Ok');
		}
   });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
