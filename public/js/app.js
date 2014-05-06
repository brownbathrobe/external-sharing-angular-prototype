'use strict';

var esApp = angular.module('esApp', ['ui.bootstrap', 'ui.router', 'ngResource']);
esApp.run(
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ui-sref-active="active }"> will set the <li> // to active whenever
    // 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)
.config(
  ['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');

      $locationProvider.html5Mode(true);

      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {
          url: "/",
          templateUrl: '/templates/recent.html'
        })

        .state('library', {
          url: '/library',
          templateUrl: "templates/library.html"
        })

        .state('tasks', {
          url: '/tasks',
          templateUrl: "templates/tasks.html"
        })

        .state('reports', {
          url: '/reports',
          templateUrl: "templates/reports.html"
        })
    }
  ]
);


esApp.controller('LibraryCtrl', function ($scope, DocumentsData) {
  DocumentsData.getAll().then(function (res) {
    $scope.documents = res;
  });
  $scope.totalItems = 100;
  $scope.currentPage = 3;
  $scope.maxSize = 5;
  $scope.totalItems = 175;
  $scope.currentPage = 1;
  $scope.setPage = function (page) {
    $scope.currentPage = page;
  }
});

esApp.controller('PaginationCtrl', function ($scope) {
  $scope.totalItems = 64;
  $scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
});

esApp.controller('MenuCtrl', function ($scope, $location, DocumentsData) {
  $scope.oneAtATime = true;

  $scope.goThere = function (group) {
    $location.url(group.title);
  };

  DocumentsData.getAll().then(function (res) {
    $scope.groups = res;
  });

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});
