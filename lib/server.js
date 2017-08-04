const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
mongoose.connect(proces.env.MONGO_URI);

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', { name: 'Abdulah' });
});
require('./api')(app);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
});