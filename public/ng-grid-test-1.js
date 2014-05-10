var app = angular.module('myApp', ['ngGrid', 'ui.bootstrap']);

app.directive('rowTemplate', function () {
  return {
    restrict: "E",
    templateUrl: "row-template.html",
    link: function ($scope) {
      $scope.doIt = function () {
        alert('doit!!!');
      }
    }
  }
});

app.controller('MyCtrl', function($scope, $http) {
  $scope.filterOptions = {
    filterText: "",
    useExternalFilter: true
  };

  $scope.totalServerItems = 0;
  $scope.pagingOptions = {
    pageSizes: [5, 10, 15],
    pageSize: 5,
    currentPage: 1
  };

  $scope.setPagingData = function(data, page, pageSize){
    window.DDD = data = _.flatten(data.map(function (d) {
      return d.documents;
    }));

    var folders = [
      { name: 'folder1', folder: true },
      { name: 'folder2', folder: true },
      { name: 'folder3', folder: true }
    ];

    data = data.concat(folders);
    console.log(data);

    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
    $scope.myData = pagedData;
    $scope.totalServerItems = data.length;
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  };

  $scope.getPagedDataAsync = function (pageSize, page, searchText) {
    setTimeout(function () {
      var data;
      if (searchText) {
        var ft = searchText.toLowerCase();
        $http.get('/api/documents').success(function (largeLoad) {
          data = largeLoad.filter(function(item) {
            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
          });
          $scope.setPagingData(data,page,pageSize);
        });
      } else {
        $http.get('/api/documents').success(function (largeLoad) {
          $scope.setPagingData(largeLoad,page,pageSize);
        });
      }
    }, 100);
  };

  $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

  $scope.$watch('pagingOptions', function (newVal, oldVal) {
    if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
      $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    }
  }, true);

  $scope.$watch('filterOptions', function (newVal, oldVal) {
    if (newVal !== oldVal) {
      $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    }
  }, true);

  $scope.upload = function (row) {
    debugger;
  };

  $scope.dateFormat = "date:'MM-dd-yyyy'";

  $scope.gridOptions = {
    columnDefs: [
      { field: 'name', displayName: 'Name', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="docs/{{row.getProperty(\'id\')}}"><span ng-cell-text>{{row.getProperty(col.field)}}</span></a></div> }' },
      { field: 'size', displayName: 'Size' },
      { field: 'creator', displayName: 'Creator', headerClass: 'ageHeader' },
      { field: 'created', displayName: 'Created', cellFilter: $scope.dateFormat },
      { field: 'modified', displayName: 'Modified', cellFilter: $scope.dateFormat },
      { sortable: false, displayName: 'Actions', cellTemplate: "<actions ng-class='{ folder: row.getProperty(\"folder\")}' upload='upload(row)'></actions>" }
      // { sortable: false, displayName: 'Actions', cellTemplate: "<actions foo='{{ row }}'></actions>" }
      // { sortable: false, displayName: 'Actions', cellTemplate: "<span ng-click='alert(row.getProperty(\"folder\"))'>yyoyoyoy</span>" }
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
});

app.directive('actions', function () {
  return {
    scope: {
      upload: "&"
    },
    restrict: "E",
    templateUrl: "actions.html"
  }
});
