angular.module('esApp').controller('TableCtrl', ['$scope', function ($scope) {
  $scope.filterOptions = {
    filterText: "",
    useExternalFilter: true
  };

  $scope.totalServerItems = 0;
  $scope.$watch('pagingOptions', function (newVal, oldVal) {
    console.log('library pagingOptions');
    $scope.setPagingData();
  }, true);

  $scope.$watch('filterOptions', function (newVal, oldVal) {
    console.log('library filterOptions');
    $scope.setPagingData();
  }, true);

  $scope.dateFormat = "date:'MM-dd-yyyy'";

  $scope.gridOptions = {
    columnDefs: [
      { field: 'type', displayName: 'Type' },
      { field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="" ng-click="doSomething()"><span ng-cell-text><span style="display: inline-block;" class="document_types_sprite document_types_sprite_{{ row.getProperty(\'type\') }}_17"></span>{{row.getProperty(col.field)}}</span></a></div> }' },

      { field: 'size', displayName: 'Size' },
      { field: 'creator', displayName: 'Creator', headerClass: 'ageHeader' },
      { field: 'created', displayName: 'Created', cellFilter: $scope.dateFormat },
      { field: 'modified', displayName: 'Modified', cellFilter: $scope.dateFormat },
      { sortable: false, displayName: 'Actions', cellTemplate: "<actions ng-class='{ folder: row.getProperty(\"type\") === \"folder\"}'></actions>" }
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
