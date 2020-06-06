const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const authRoutes = require('./auth/routes.js');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('', authRoutes);



app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
}) 