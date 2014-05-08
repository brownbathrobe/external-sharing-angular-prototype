angular.module('esApp').directive('task', function () {
  return {
    restrict: "E",
    scope: {
      save: "&",
      edit: "&",
      task: "="
    },
    controller: function ($scope) {
      $scope.blah = function () {
        alert('blah');
      }
    },
    templateUrl: 'js/directives/task.html'
  }
});
