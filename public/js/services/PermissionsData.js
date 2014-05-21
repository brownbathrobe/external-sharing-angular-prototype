angular.module('esApp').factory('PermissionsData', function ($resource, Config) {
  var resource = $resource(Config.apiPath + "/permission/view");
  return resource;
});
