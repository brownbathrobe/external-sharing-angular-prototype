var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    app = express(),
    mockDocuments = require('./data/documents'),
    mockTasks = require('./data/tasks'),
    mockNotifications = require('./data/notifications'),
    mockRecent = require('./data/recent'),
    mockLibrary = require('./data/library'),
    mockTree = require('./data/tree'),
    path = require('path'),
    port = 3030;

// logging
app.use(morgan('short'));
app.use(bodyParser());

app.get('/api/tree', function (req, res) {
  res.send(mockTree);
});

app.get('/api/documents', function (req, res) {
  res.send(mockDocuments);
});

app.get('/api/tasks', function (req, res) {
  res.send(mockTasks);
});

app.post('/api/tasks', function (req, res) {
  res.send(req.body);
});

app.get('/api/recent', function (req, res) {
  res.send(mockRecent);
});

app.get('/api/library', function (req, res) {
  res.send(mockLibrary);
});

app.get('/api/notifications', function (req, res) {
  res.send(mockNotifications);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res){
  console.log('=================> catchall: ' + req.url);
  res.sendfile(__dirname + '/public/index.html');
});

app.listen(port);
console.log('Listening on port ' + port);
