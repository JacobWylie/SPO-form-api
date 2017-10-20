///////////////////////////
// Dependencies
///////////////////////////

const express    	   = require('express'),
	  app 	     	   = express(),
	  bodyParser 	   = require('body-parser'),
	  mongoose   	   = require('mongoose'),
	  methodOverride   = require('method-override'),
	  expressSanitizer = require('express-sanitizer'),
	  server           = require('http').Server(app)

// Connect to my free-tier/sandbox mLab database
mongoose.connect("mongodb://heroku_s25v6880:q8lvfeu1097soh3etk5vi057cv@ds153652.mlab.com:53652/heroku_s25v6880", {useMongoClient: true});

// Parse data through body/form
app.use(bodyParser.urlencoded({extended: true}));

// Overrides POST request to PUT/DELETE in HTML form | No such method in HTML 5 yet
app.use(methodOverride('_method'));

// Removes any possible <script> from form submission
app.use(expressSanitizer());


///////////////////////////
// MONGOOSE/MODEL CONFIG
///////////////////////////

// Mongodb database schema
const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	email: String
});
// Compile schema into mongoose model
const User = mongoose.model('User', userSchema);

///////////////////////////
// SERVER
///////////////////////////

// Run app on an open port on Digital Ocean. Use PM2.
server.listen(8085, () => {
    console.log("App is running on port 8085");
});





















