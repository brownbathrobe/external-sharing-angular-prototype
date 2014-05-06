var express = require('express'),
    morgan = require('morgan'),
    app = express(),
    mockDocuments = require('./data/documents'),
    mockTasks = require('./data/tasks'),
    mockNotifications = require('./data/notifications'),
    mockRecent = require('./data/recent'),
    path = require('path'),
    port = 3030;

// logging
app.use(morgan('short'));

app.get('/documents', function (req, res) {
  res.send(mockDocuments);
});

app.get('/tasks', function (req, res) {
  res.send(mockTasks);
});

app.get('/recent', function (req, res) {
  res.send(mockRecent);
});

app.get('/notifications', function (req, res) {
  setTimeout(function () {
    res.send(mockNotifications);
  }, 3000);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log('Listening on port ' + port);
