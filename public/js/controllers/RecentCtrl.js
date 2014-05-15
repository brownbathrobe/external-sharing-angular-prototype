angular.module('esApp').controller('RecentCtrl', function ($scope, RecentData, orderByFilter) {
  $scope.allDocuments = [];
  $scope.allSorted = [];

  RecentData.getStuff().then(function (docs) {
    $scope.allDocuments = $scope.allSorted = docs;
    filterDocuments($scope.filterOptions.numberOfDays);
    $scope.totalServerItems = $scope.allDocuments.length;
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

  function sortDocs(newVal, oldVal, scope) {
    if (!newVal) return;
    var page = $scope.pagingOptions.currentPage;
    var pageSize = $scope.pagingOptions.pageSize;
    var direction = newVal.directions[0];
    var field = newVal.fields[0];

    var allSorted = $scope.allSorted = orderByFilter($scope.allDocuments, field, direction === "desc");
    var pagedData = getPageSlice(allSorted, page, pageSize);
    $scope.filteredDocuments = pagedData;
  }

  function getPageSlice (docs) {
    var page = $scope.pagingOptions.currentPage;
    var pageSize = $scope.pagingOptions.pageSize;
    return docs.slice((page - 1) * pageSize, page * pageSize);
  }

  $scope.$watch('pagingOptions', function (newVal, oldVal) {
    debugger;
    $scope.filteredDocuments = getPageSlice($scope.allSorted);
  }, true);

  $scope.$watch('gridOptions.ngGrid.config.sortInfo', sortDocs, true);

  $scope.$watch('filterOptions.numberOfDays', function (newVal, oldVal) {
    var subset = filterDocuments(newVal);
    $scope.totalServerItems = subset.length;
    $scope.allSorted = subset;
    $scope.filteredDocuments = getPageSlice($scope.allSorted);

  });

  $scope.ranges = [ 7, 30 ];

  function filterDocuments (newVal) {
    var subset = [];
    if (newVal) {
      $scope.allDocuments.forEach(function(r) {
        var date = new Date();
        date.setDate(date.getDate() - parseInt($scope.filterOptions.numberOfDays, 10));
        var docDate = new Date(r.created);
        if (docDate >= date) {
          subset.push(r);
        }
      });
    } else {
      subset = $scope.allDocuments;
    }
    return subset;
  }


  var dateFormat = "date:'MM-dd-yyyy'";

  $scope.gridOptions = {
    columnDefs: [
      { field: 'type', displayName: 'Type' },
      // { field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="docs/{{row.getProperty(\'id\')}}"><span ng-cell-text>{{row.getProperty(col.field)}}</span></a></div> }' },
      { field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="" ng-click="doSomething()"><span ng-cell-text>{{row.getProperty(col.field)}}</span></a></div> }' },
      { field: 'size', displayName: 'Size' },
      { field: 'creator', displayName: 'Creator', headerClass: 'ageHeader' },
      { field: 'created', displayName: 'Created', cellFilter: dateFormat },
      { field: 'modified', displayName: 'Modified', cellFilter: dateFormat },
      { sortable: false, displayName: 'Actions', cellTemplate: "<actions ng-class='{ folder: row.getProperty(\"type\") === \"folder\"}' upload='upload(row)'></actions>" }
    ],
    data: 'filteredDocuments',
    enablePaging: true,
    showFooter: true,
    footerRowHeight: 60,
    enableColumnResize: true,
    enableRowSelection: false,
    totalServerItems: 'totalServerItems',
    pagingOptions: $scope.pagingOptions,
    filterOptions: $scope.filterOptions,
    rowTemplate: '<row-template></row-template>',
    footerTemplate: 'footer-tester.html',
    useExternalSorting: true
  };
});
