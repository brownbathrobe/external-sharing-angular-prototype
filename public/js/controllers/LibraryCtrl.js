angular.module('esApp').controller('LibraryCtrl', ['$scope', 'LibraryData', '$stateParams', function ($scope, LibraryData, $stateParams) {
  $scope.$on('loadFolder', function () {
    console.log('loading data');
  });

  $scope.doSomething = function () {
    $scope.$emit('loadFolder');
  };

  $scope.pagingOptions = {
    pageSizes: [5, 10, 15],
    pageSize: 5,
    currentPage: 1
  };

  $scope.getLibraryData = function (pageSize, page, searchText) {
    if ($scope.fetched) {
      $scope.setPagingData($scope.children, page, pageSize);
    } else {
      LibraryData.getStuff().then(function (directory) {
        var data = $scope.data = directory;
        var children = $scope.children = directory.children;
        $scope.path = data.path;
        $scope.setPagingData(children, page, pageSize);
      });
    }
  };

  $scope.getLibraryData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

  $scope.setPagingData = function(data, page, pageSize){
    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
    $scope.myData = pagedData;
    $scope.totalServerItems = data.length;
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  };
}]);
