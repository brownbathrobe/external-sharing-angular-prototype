angular.module('esApp').controller('TableCtrl', ['$scope', function ($scope) {
  $scope.filterOptions = {
    filterText: "",
    useExternalFilter: true
  };

  $scope.totalServerItems = 0;
  $scope.$watch('pagingOptions', function (newVal, oldVal) {
    // if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
    $scope.getLibraryData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    // }
  }, true);

  $scope.$watch('filterOptions', function (newVal, oldVal) {
    //emit a load more data event?
    // if (newVal !== oldVal) {
    $scope.getLibraryData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    // }
  }, true);

  $scope.upload = function (row) {
    debugger;
  };

  $scope.dateFormat = "date:'MM-dd-yyyy'";

  $scope.doSomething = function () {
    $scope.$emit('loadFolder');
  };

  $scope.gridOptions = {
    columnDefs: [
      { field: 'type', displayName: 'Type' },
      // { field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="docs/{{row.getProperty(\'id\')}}"><span ng-cell-text>{{row.getProperty(col.field)}}</span></a></div> }' },
      { field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="" ng-click="doSomething()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></a></div> }' },
      { field: 'size', displayName: 'Size' },
      { field: 'creator', displayName: 'Creator', headerClass: 'ageHeader' },
      { field: 'created', displayName: 'Created', cellFilter: $scope.dateFormat },
      { field: 'modified', displayName: 'Modified', cellFilter: $scope.dateFormat },
      { sortable: false, displayName: 'Actions', cellTemplate: "<actions ng-class='{ folder: row.getProperty(\"type\") === \"folder\"}' upload='upload(row)'></actions>" }
    ],
    data: 'myData',
    enablePaging: true,
    showFooter: true,
    enableColumnResize: true,
    enableRowSelection: false,
    totalServerItems: 'totalServerItems',
    pagingOptions: $scope.pagingOptions,
    filterOptions: $scope.filterOptions,
    rowTemplate: '<row-template></row-template>'
  };
}]);
