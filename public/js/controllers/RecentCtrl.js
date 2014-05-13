angular.module('esApp').controller('RecentCtrl', function ($scope, RecentData) {
  $scope.allDocuments = [];

  RecentData.getStuff().then(function (docs) {
    $scope.allDocuments = docs;
    filterDocuments($scope.filterOptions.numberOfDays);
  });

  $scope.filterOptions = {
    filterText: "",
    useExternalFilter: true,
    numberOfDays: 7
  };

  $scope.pagingOptions = {
    pageSizes: [5, 10, 15],
    pageSize: 5,
    currentPage: 1
  };


  $scope.$watch('filterOptions.numberOfDays', filterDocuments);
  $scope.ranges = [ 7, 30 ];

  function filterDocuments (newVal, oldVal) {
    if (newVal) {
      var val = parseInt(newVal, 10);
      if (val) {
        $scope.filteredDocuments = [];
        $scope.allDocuments.forEach(function(r) {
          var date = new Date();
          date.setDate(date.getDate() - parseInt($scope.filterOptions.numberOfDays, 10));
          var docDate = new Date(r.created);
          if (docDate >= date) {
            $scope.filteredDocuments.push(r);
          }
        });
      }
      else {
        $scope.filteredDocuments = $scope.allDocuments;
      }
    }
    else {
      $scope.filteredDocuments = $scope.allDocuments;
    }
    window.FILTERED = $scope.filteredDocuments;
  }

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
    data: 'filteredDocuments',
    enablePaging: true,
    showFooter: true,
    footerRowHeight: 60,
    enableColumnResize: true,
    enableRowSelection: false,
    // totalServerItems: 'totalServerItems',
    pagingOptions: $scope.pagingOptions,
    filterOptions: $scope.filterOptions,
    rowTemplate: '<row-template></row-template>',
    footerTemplate: 'footer-tester.html'
  };
});
