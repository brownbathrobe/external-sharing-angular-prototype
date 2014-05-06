angular.module('esApp').factory('TasksData', function ($resource, $q) {
  $resource('/tasks');
});
