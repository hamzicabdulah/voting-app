const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();

const app = express();
mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
});
require('./config/passport')(passport);

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./api')(app);
app.get('*', function(req, res) {
    res.render('index', { name: 'Abdulah' });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
});