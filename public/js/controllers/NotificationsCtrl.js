angular.module('esApp').controller('NotificationsCtrl', function ($scope, NotificationsData) {
  console.log('==========>', NotificationsData);
  $scope.notifications = NotificationsData.query();
});
