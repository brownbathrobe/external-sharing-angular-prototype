angular.module('esApp').controller('TasksCtrl', function ($scope, TasksData, events) {
  $scope.tasks = events;//TasksData.query();
});
