angular.module('esApp').controller('LibraryCtrl',
['$scope', 'LibraryData', '$stateParams', '$location', 'folderData',
function ($scope, LibraryData, $stateParams, $location, folderData) {
  function parseFolderData(directory) {
    $scope.data = directory;
    $scope.children = directory.children;
    $scope.path = directory.path;
  }

  parseFolderData(folderData);

  $scope.$on('loadFolder', function () {
    console.log('loading data');
  });

  // load new directory when the query string changes
  $scope.$watch(function () {
    return $location.search()
  }, function (newVal, oldVal) {
    console.log('loading more stuff');
  });

  $scope.doSomething = function () {
    $scope.$emit('loadFolder');
  };

  $scope.pagingOptions = {
    pageSizes: [5, 10, 15],
    pageSize: 5,
    currentPage: 1
  };

  $scope.setPagingData = function () {
    var page = $scope.pagingOptions.currentPage,
        pageSize = $scope.pagingOptions.pageSize;

    var pagedData = $scope.children.slice((page - 1) * pageSize, page * pageSize);
    $scope.myData = pagedData;
    $scope.totalServerItems = $scope.children.length;
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  };

  $scope.setPagingData();
}]);
