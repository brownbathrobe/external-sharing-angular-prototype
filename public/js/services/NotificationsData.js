angular.module('esApp').factory('NotificationsData', function ($resource, $q) {
  var resource = $resource("/api/notifications");
  return resource;
});
