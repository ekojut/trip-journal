var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const knex = require('../db/knex');


// var mysqlConnection = mysql.createConnection({
// 	host:'localhost',
// 	user:'root',
// 	password:'',
// 	database:'test'
// });

// mysqlConnection.connect((err)=>{
// 	if(!err)
// 		console.log('Connected');
// 	else
// 		console.log('Failed :' + JSON.stringify(err, undefined, 2));
// });

/* GET home page. */
router.get('/', function(req, res, next) {
	
	let trips
	knex('trip')
	.select()
	.then(function(x){
		trips=x 
		return knex('waypoint').select()})
	.then(function(waypoints){
		res.render('home',{
			waypoints: waypoints,
			trips:trips
		})
	})
});

//Get all trips
router.get('/', (req, res) =>{
	knex('trip')
	.select()
	.then(trips => {
		res.render('home', {trips: trips});
	});
});

// function isValidId(req,res, next) {
// 	if(!isNan(req.params.id)) return next();
// 	next(new Error('Invalid Id'));
// }

//Get a trip
router.get('/:id/edit', (req, res) =>{
	const id = req.params.id
	if(typeof id != 'undefined') {
		knex('trip')
		.where('id', id)
		.select()
		.first()
		.then(trips => {
			console.log('trips:',trips);
			res.json({trips: trips});
		});
	} else {
		res.status(500);
		res.render('error', {
			message:'invalid id'
		});
	}
});

//Add a trip
router.post('/', (req, res)=> {
	const trip = {
		trip_code: req.body.trip_code,
		trip_name: req.body.trip_name,
		start_lat: req.body.start_lat,
		start_lng: req.body.start_lng,
		end_lat: req.body.end_lat,
		end_lng: req.body.end_lng,
	}
	console.log(req.body);
	knex('trip')
	.insert(trip, 'id')
	.then( ids=> {
		const id = ids[0];
		res.redirect('/');
	})
});

//Update a trip
router.put('/:id', (req, res)=> {
	const id = req.params.id
	const trip = {
		trip_code: req.body.trip_code,
		trip_name: req.body.trip_name,
		start_lat: req.body.start_lat,
		start_lng: req.body.start_lng,
		end_lat: req.body.end_lat,
		end_lng: req.body.end_lng,
	}
	if(typeof id != 'undefined') {
		knex('trip')
		.select()
		.where('id', id)
		.update(trip, 'id')
		.then(() => {
			res.render('home');
		});
	} else {
		res.status(500);
		res.render('error', {
			message:'invalid id'
		});
	}
});

//Delete a trip
router.delete('/delete/:id', (req, res) =>{
	const id = req.params.id
	console.log('delete id:', id);
	if(typeof id != 'undefined') {
		knex('trip')
		.select()
		.where('id', id)
		.del()
		.then(() => {
			res.redirect('/');
		});
	} else {
		res.status(500);
		res.render('error', {
			message:'invalid id'
		});
	}
});


//Get all routes
router.get('/routes', (req, res) =>{
	mysqlConnection.query('select * from routes',(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	});
});

//Get routes by trip
router.get('/routes/:trip_code', (req, res) =>{
	mysqlConnection.query('select * from routes where trip_code = ?',[req.params.trip_code],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	});
});

//Delete a route
router.delete('/routes/:route_id', (req, res) =>{
	mysqlConnection.query('delete from routes where route_id = ?',[req.params.route_id],(err, rows, fields)=>{
		if(!err)
			res.send('Deleted.');
		else
			console.log(err);
	});
});

//Add a route
router.get('/routes/add', (req, res)=> {
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
router.get('/routes/edit/:route_id', (req, res)=> {
	let data = {route_name:req.query.route_name, trip_code:req.query.trip_code, latitude:req.query.latitude, longitude:req.query.longitude};
	let sql = 'update trip set ? where route_id = ${req.params.route_id}';
	mysqlConnection.query(sql, data, (err, result)=> {
		if (!err)
			res.send('Succeed.');
		else
			console.log(err);
	});
});

module.exports = router;