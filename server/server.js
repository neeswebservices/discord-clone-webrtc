const express = require('express');
const http = require('http');
require('dotenv').config({ path: './config/config.env' });
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

// routes and controllers
const authRoutes = require('./routes/authRoutes');

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.use('/api/auth/', authRoutes);

const server = http.createServer(app);

mongoose.connect(process.env.MONURI, (err) => {
	if (err) return console.log(err);

	server.listen(process.env.PORT, () => {
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
		);
	});
});
