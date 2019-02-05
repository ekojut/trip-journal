var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');

var routes = require('./routes/index');

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/assets',express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function(){
	console.log('listening to port ' +app.get('port'));
});

app.use('/', routes);
