var express = require('express'),
    morgan = require('morgan'),
    app = express(),
    mockDocuments = require('./data/documents'),
    port = 3030;

// logging
app.use(morgan('short'));

app.get('/documents', function (req, res) {
  res.send(mockDocuments);
});

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log('Listening on port ' + port);
