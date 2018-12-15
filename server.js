var express = require('express');
var path = require('path');
var mainRouter = require('./app/router/main');
var apiRouter = require('./app/router/api');
var bodyParser = require('body-parser');
let file = require('express-fileupload');

var app  = express();
app.use(bodyParser.json());
app.use(file());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', mainRouter);
app.use('/api', apiRouter);
app.set('views', __dirname + '/app/view');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '/app/public')));

app.listen(3000,function(){
  console.log('3000');
});