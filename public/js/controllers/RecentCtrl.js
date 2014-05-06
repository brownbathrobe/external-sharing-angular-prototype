angular.module('esApp').controller('RecentCtrl', function ($scope, RecentData) {
  $scope.documents = RecentData.query();
});
