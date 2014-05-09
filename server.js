var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    app = express(),
    mockDocuments = require('./data/documents'),
    mockTasks = require('./data/tasks'),
    mockNotifications = require('./data/notifications'),
    mockRecent = require('./data/recent'),
    path = require('path'),
    port = 3030;

// logging
app.use(morgan('short'));
app.use(bodyParser());

app.get('/api/documents', function (req, res) {
  res.send(mockDocuments);
});

app.get('/api/tasks', function (req, res) {
  res.send(mockTasks);
});

app.post('/api/tasks', function (req, res) {
  console.log("=> ", req.body);
  res.send(req.body);
});

app.get('/api/recent', function (req, res) {
  res.send(mockRecent);
});

app.get('/api/notifications', function (req, res) {
  setTimeout(function () {
    res.send(mockNotifications);
  }, 3000);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log('Listening on port ' + port);
