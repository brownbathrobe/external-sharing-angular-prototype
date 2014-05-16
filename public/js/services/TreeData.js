angular.module('esApp').factory('TreeData', function ($resource, $q, Config) {
  var resource = $resource(Config.apiPath + '/tree');
  return resource;
});
