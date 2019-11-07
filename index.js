// Stock Market Portfolio App

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// user body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API Key for Stock App
// pk_fe7f1b3452294d9cb434789bac76998d
// Create Call API Function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_fe7f1b3452294d9cb434789bac76998d', {json: true}, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		finishedAPI(body);
	};
});
};

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "Hello this is more stuff"

// Set handlebar index GET routes
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home',{
    	stock: doneAPI,
    	stuff2: "This is stuff"
    	});	
	}, "fb");  
});

// Set handlebar index POST routes
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home',{
    	stock: doneAPI,
    	stuff2: "This is stuff",
    	});	
	}, req.body.stock_ticker);  
});


app.get('/about.html', function (req, res) {
    res.render('about',{
    	about: "I am 6'3"
    });
});

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log('Server Listening on port ' + PORT));