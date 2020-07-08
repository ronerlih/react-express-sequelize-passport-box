// const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const db = require('./models');

const express = require('express');
const app = express();

const session = require('express-session');
const initSession = require('./scripts/initSession');

const errorHandler = require('./scripts/errorHandler');

// middleware:
// on every requsest will be called in order.

// initialize session memory.
app.use(initSession(session));

// parse body middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets (usually on heroku).
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// API routes.
app.use(routes);

// Send every "lost" request to the React app.
// !Define any API routes before this runs.
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// error handling, last middleware.
app.use((err, req, res, next) => errorHandler(err, req, res, next));

// Syncing our database and logging a message to the user upon success

db.sequelize.sync().then(() => {
	console.log('connected');
	app.listen(PORT, () => {
		console.log(`\n🌎 ==> API server now on http://localhost:${PORT}\n`, PORT, PORT);
	});
});
