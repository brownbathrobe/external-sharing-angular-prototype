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
    request = require('request'),
    _ = require('lodash'),
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

app.get('/api/notifications', function (req, res) {
  res.send(mockNotifications);
});

app.post('/api/upload', function (req, res) {
  res.send(req.body);
});

// PROXIED STUFF
// app.get('/api/*', function (req, res) {
//   var pattern = /\/api\/(.+)/,
//     path = req.url.match(pattern)[1],
//     query = req.query;
// 
//   var API_PATH = "http://edm-wt-tst-1:9090/alfresco/service/ext",
//       token = "TICKET_aa7c9e0fdde378cd75dbe345a604a6bb03f6670f",
//       newurl = API_PATH + "/" + path + (_.isEmpty(query) ? "?" : "&") + "alf_ticket=" + token;
// 
//   console.log(newurl);
//   request(newurl).pipe(res)
// });

app.get('/api/recent', function (req, res) {
  res.send(mockRecent);
});

app.get('/api/library', function (req, res) {
  res.send(mockLibrary);
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});

app.listen(port);
console.log('Listening on port ' + port);
