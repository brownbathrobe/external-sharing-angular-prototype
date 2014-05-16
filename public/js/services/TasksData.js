angular.module('esApp').factory('TasksData', function ($resource, $q, Config) {
  var resource = $resource(Config.apiPath + '/tasks');
  return resource;
});
