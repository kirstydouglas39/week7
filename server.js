// BASE SETUP
// ======================================
// CALL THE PACKAGES --------------------
const PORT = process.env.PORT || 8080;
const uri = "mongodb+srv://pam:<password>@cluster0-dgpco.mongodb.net/test?retryWrites=true&w=majority";
var mongoose = require('mongoose');


var express = require('express'); // call express
var app= express(); // define our app using express = require('body-parser'); // get body-parser

var bodyParser = require('body-parser');
var morgan = require('morgan'); // used to see requests = require('mongoose');
var User = require('./models/user');


// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure our app to handle CORS requests
app.use(function(req, res, next) {
       res.setHeader('Access-Control-Allow-Origin', '*');
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
       res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
       next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database (note you'll have to set uri to the same Mlab uri you've used before)
mongoose.connect(uri, {useNewUrlParser: true});



// ROUTES FOR OUR API 
// ============================= 
// basic route for the home page 
app.get('/', function(req, res) {
  res.send('Welcome to the home page!'); 
});
// get an instance of the express router 
var apiRouter = express.Router();
// test route to make sure everything is working 
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) { 
  res.json({ message: 'hooray! welcome to our api!' }); 
});

// more routes for our API will happen here
// REGISTER OUR ROUTES ------------------------------- 
// all of our routes will be prefixed with /api
app.use('/api', apiRouter); 
// START THE SERVER 
// =============================== 
app.listen(PORT);
console.log('Magic happens on port ' + PORT);
