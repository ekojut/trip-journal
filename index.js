var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

var mysqlConnection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'test'
});

mysqlConnection.connect((err)=>{
	if(!err)
		console.log('Connected');
	else
		console.log('Failed :' + JSON.stringify(err, undefined, 2));
});

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyparser.json());
// app.use(bodyparser.urlencode({ extended: false }));

app.use('/assets',express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function(){
	console.log('listening to port ' +app.get('port'));
});

app.get('/', (req, res) => res.render('home'));

//Get all trips
app.get('/trips', (req, res) =>{
	mysqlConnection.query('select * from trip',(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	});
});

//Get a trip
app.get('/trips/:id', (req, res) =>{
	mysqlConnection.query('select * from trip where id = ?',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	});
});

//Delete a trip
app.delete('/trips/:id', (req, res) =>{
	mysqlConnection.query('delete from trip where id = ?',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send('Deleted.');
		else
			console.log(err);
	});
});

//Add a trip
app.get('/add', (req, res)=> {
	let data = {name:req.body.name, start:req.body.start, destination:reqbody.body.destination, trip_code:req.body.trip_code};
	let sql = 'insert into trip set ?';
	mysqlConnection.query(sql, data, (err, result)=> {
		if (!err)
			res.send('Succeed.');
		else
			console.log(err);
	});
});

//Edit a trip
app.get('/trips/edit/:id', (req, res)=> {
	let data = {name:req.query.name, start:req.query.start, destination:req.query.destination, trip_code:req.query.trip_code};
	let sql = 'update trip set ? where id = ${req.params.id}';
	mysqlConnection.query(sql, data, (err, result)=> {
		if (!err)
			res.send('Succeed.');
		else
			console.log(err);
	});
});

//Get all routes
app.get('/routes', (req, res) =>{
	mysqlConnection.query('select * from routes',(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	});
});

//Get routes by trip
app.get('/routes/:trip_code', (req, res) =>{
	mysqlConnection.query('select * from routes where trip_code = ?',[req.params.trip_code],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	});
});

//Delete a route
app.delete('/routes/:route_id', (req, res) =>{
	mysqlConnection.query('delete from routes where route_id = ?',[req.params.route_id],(err, rows, fields)=>{
		if(!err)
			res.send('Deleted.');
		else
			console.log(err);
	});
});

//Add a route
app.get('/routes/add', (req, res)=> {
	let data = {route_name:req.query.route_name, trip_code:req.query.trip_code, latitude:req.query.latitude, longitude:req.query.longitude};
	let sql = 'insert into routes set ?';
	mysqlConnection.query(sql, data, (err, result)=> {
		if (!err)
			res.send('Succeed.');
		else
			console.log(err);
	});
});

//Edit a route
app.get('/routes/edit/:route_id', (req, res)=> {
	let data = {route_name:req.query.route_name, trip_code:req.query.trip_code, latitude:req.query.latitude, longitude:req.query.longitude};
	let sql = 'update trip set ? where route_id = ${req.params.route_id}';
	mysqlConnection.query(sql, data, (err, result)=> {
		if (!err)
			res.send('Succeed.');
		else
			console.log(err);
	});
});