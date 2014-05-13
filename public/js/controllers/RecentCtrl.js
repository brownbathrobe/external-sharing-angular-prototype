angular.module('esApp').controller('RecentCtrl', function ($scope, RecentData) {
  RecentData.getStuff().then(function (docs) {
    $scope.documents = docs;
  });

  $scope.filterOptions = {
    filterText: "",
    useExternalFilter: true
  };

  $scope.pagingOptions = {
    pageSizes: [5, 10, 15],
    pageSize: 5,
    currentPage: 1
  };

  $scope.totalServerItems = 0;

  $scope.dateFormat = "date:'MM-dd-yyyy'";

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
    data: 'documents',
    enablePaging: true,
    showFooter: true,
    enableColumnResize: true,
    enableRowSelection: false,
    totalServerItems: 'totalServerItems',
    pagingOptions: $scope.pagingOptions,
    filterOptions: $scope.filterOptions,
    rowTemplate: '<row-template></row-template>'
  };
});
