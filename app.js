///////////////////////////
// Dependencies
///////////////////////////

const express    	   = require('express'),
	  app 	     	   = express(),
	  bodyParser 	   = require('body-parser'),
	  mongoose   	   = require('mongoose'),
	  methodOverride   = require('method-override'),
	  expressSanitizer = require('express-sanitizer'),
	  server           = require('http').Server(app),
	  cors             = require('cors');

// Connect to my free-tier/sandbox mLab database
mongoose.connect("mongodb://heroku_s25v6880:q8lvfeu1097soh3etk5vi057cv@ds153652.mlab.com:53652/heroku_s25v6880", {useMongoClient: true});

// Parse data through body/form
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

// Overrides POST request to PUT/DELETE in HTML form | No such method in HTML 5 yet
app.use(methodOverride('_method'));

// Removes any possible <script> from form submission
app.use(expressSanitizer());


///////////////////////////
// MONGOOSE/MODEL CONFIG
///////////////////////////

// Mongodb database schema
const AccountSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	email: String
});
// Compile schema into mongoose model
const Account = mongoose.model('Account', AccountSchema);


///////////////////////////
// ROUTES
///////////////////////////

// Retrieve all user profiles from db
app.get('/api/accounts', (req, res) => {
	Account.find({}, (err, accounts) => {
		if(err) {
			res.send('error');
		} else {
			// Send user profiles
			res.send({accounts: accounts});
		}
	})
})

// Create new user profile
app.post('/api/accounts', (req, res) => {
	// Removes any possible <script> from form submission
	// req.body = req.sanitize(req.body);

	// Build new account object
	let newAccount = new Account({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	});

	// Creates new account post in DB
	Account.create(newAccount, (err, newAccount) => {
		if(err) {
			res.send('error');
		} else {
			res.send({newAccount: newAccount});
		}
	})
})

// Retrieve a specific account by :id
app.get('/api/accounts/:id', (req, res) => {
	Account.findById(req.params.id, (err, foundAccount) => {
		if(err) {
			res.send('error');
		} else {
			res.send({account: foundAccount});
		}
	})
})

// Delete an account by :id
app.delete('/api/accounts/:id', (req, res) => {
	Account.findByIdAndRemove(req.params.id, err => {
		if(err) {
			res.send('error');
		} else {
			res.send('account deleted');
		}
	})
})

///////////////////////////
// SERVER
///////////////////////////

// Run app on an open port on Digital Ocean. Use PM2.
server.listen(8084, () => {
    console.log("App is running on port 8084");
});





















