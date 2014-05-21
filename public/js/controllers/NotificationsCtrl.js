angular.module('esApp').controller('NotificationsCtrl', function ($scope, NotificationsData) {
  $scope.notifications = NotificationsData.query();
});
