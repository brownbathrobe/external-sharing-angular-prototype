angular.module('esApp').factory('NotificationsData', function ($resource, $q, Config) {
  var resource = $resource(Config.apiPath + "/notifications");
  return resource;
});
