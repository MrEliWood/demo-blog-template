// import modules and packages
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const allRoutes = require('./controllers');

// configure express
const app = express();
const PORT = process.env.PORT || 3000;

// import models to sync
const { User, Blog, Comment } = require('./models');

// handlers for express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static directory
app.use(express.static('public'));

// configure sessions
const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {
		maxAge: 2 * 60 * 60 * 1000
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	})
};

app.use(session(sess));

// import custom helpers
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// configure handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// set home route
app.use('/', allRoutes);

// sync sequelize
sequelize.sync({ force: false }).then(function () {
	app.listen(PORT, function () {
		console.log('App listening on PORT ' + PORT);
	});
});

// Logs all request paths and method
app.use(function (req, res, next) {
	res.set('x-timestamp', Date.now());
	res.set('x-powered-by', 'cyclic.sh');
	console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
	next();
});

// Catch all handler for all other request.
app.use('*', (req, res) => {
	res.json({
		at: new Date().toISOString(),
		method: req.method,
		hostname: req.hostname,
		ip: req.ip,
		query: req.query,
		headers: req.headers,
		cookies: req.cookies,
		params: req.params
	}).end();
});
