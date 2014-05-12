angular.module('esApp').controller('LibraryCtrl', ['$scope', 'DocumentsData', function ($scope, DocumentsData) {
  DocumentsData.getAll().then(function (res) {
    $scope.documents = res;
  });
}]);
