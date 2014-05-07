angular.module('esApp').controller('NavBarCtrl', function ($scope) {
  $scope.query = "";
  $scope.search = function (query) {
    alert('searching for ' + query);
  };
});
