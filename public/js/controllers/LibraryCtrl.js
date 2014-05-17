var esApp = angular.module('esApp');
esApp.controller('LibraryCtrl',
['$scope', 'LibraryData', '$stateParams', '$location', 'folderData', '$modal',
function ($scope, LibraryData, $stateParams, $location, folderData, $modal) {

  function parseFolderData(directory) {
    $scope.directory = directory;
    $scope.children = directory.children;
    $scope.path = directory.path;
  }

  parseFolderData(folderData);

  // load new directory when the query string changes
  $scope.$watch(function () {
    return $location.search();
  }, function (newVal, oldVal) {
    if (newVal === oldVal) return;
    console.log('loading more stuff', newVal);
    LibraryData.getStuff().then(function (res) {
     parseFolderData(res);

    /* this is just to test the breadcrumb  because the mock data
     * directory ids don't really correspond to anything */
    $scope.directory.id = newVal.folder;
    });
  });

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

  $scope.upload = function () {
    var modalInstance = $modal.open({
      templateUrl: '/templates/uploadModal.html',
      controller: ModalInstanceCtrl
    });
  }
}]);

var ModalInstanceCtrl = function ($scope, $modalInstance, FileUpload) {
  $scope.file = {};

  $scope.ok = function () {
    FileUpload.upload($scope.file).then(function () {
      $modalInstance.close();
    }, function (error) {
      alert(error);
      $modalInstance.close();
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
