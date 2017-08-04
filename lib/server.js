const express = require('express');
const path = require('path');

const app = express();
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