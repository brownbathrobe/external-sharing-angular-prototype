var connect = require('connect'),
    http = require('http'),
    directory = __dirname + '/public',
    port = '3030';

console.log(directory);
connect()
  .use(connect.logger('dev'))
  .use(connect.static(directory))
  .listen(port);

console.log('Listening on port ' + port);
