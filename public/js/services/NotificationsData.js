angular.module('esApp').factory('NotificationsData', function ($resource, $q) {
  var resource = $resource("/notifications");
  return resource;
});
