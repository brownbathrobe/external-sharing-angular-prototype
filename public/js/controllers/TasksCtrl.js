angular.module('esApp').controller('TasksCtrl', function (tasks, $scope, $modal, $log) {
  $scope.tasks = tasks;

  $scope.save = function (task) {
    alert('save');
  };

  $scope.edit = function (task) {
    $scope.open(task);
  };

  $scope.open = function (task, size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      size: size,
      task: task,
      resolve: {
        task: function () {
          return task
        }
      }
    });

    modalInstance.result.then(function (task) {
      task.$save();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, task) {

  var originalTask = _.clone(task);
  $scope.task = task;

  $scope.ok = function () {
    $modalInstance.close(task);
  };

  $scope.cancel = function () {
    $scope.task.name = originalTask.name;
    $modalInstance.dismiss('cancel');
  };
};
