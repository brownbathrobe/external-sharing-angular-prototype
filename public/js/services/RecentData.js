angular.module('esApp').factory('RecentData', function ($resource, $q) {
  return $resource('/recent');
});
