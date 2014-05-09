angular.module('esApp').factory('TasksData', function ($resource, $q) {
  return $resource('/api/tasks');
});
