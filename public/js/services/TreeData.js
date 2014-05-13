angular.module('esApp').factory('TreeData', function ($resource, $q) {
  return $resource('/api/tree');
});
