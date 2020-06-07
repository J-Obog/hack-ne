const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

const authRoutes = require('./server/auth/routes.js');
const apiRoutes = require('./server/api/routes.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/auth', authRoutes);
app.use('/api', apiRoutes)

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
}) 