'use strict';

var esApp = angular.module('esApp', ['ui.bootstrap', 'ui.router', 'ngResource', 'ui.tree', 'ngGrid']);
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

      // use pushState
      $locationProvider.html5Mode(true);

      // Use $stateProvider to configure your states.
      $stateProvider

        .state("home", {
          url: "/",
          templateUrl: '/templates/recent.html',
          controller: 'RecentCtrl'
        })

        .state('library', {
          url: '/library',
          templateUrl: "/templates/library.html",
          controller: 'LibraryCtrl',
          resolve: {
            stuff: function ($q, LibraryData) {
              var deferred = $q.defer();
              deferred.resolve(LibraryData.getStuff());
              console.log('resolving');
              return deferred.promise;
            }
          }
        })

        .state('bll', {
          url: '/library/:id',
          templateUrl: "/templates/library.html",
          controller: 'LibraryCtrl',
          resolve: {
            stuff: function ($q, LibraryData) {
              var deferred = $q.defer();
              deferred.resolve(LibraryData.getStuff());
              return deferred.promise;
              console.log('resolving library');
            }
          }
        })

        .state('tasks', {
          url: '/tasks',
          templateUrl: "templates/tasks.html",
          controller: 'TasksCtrl',
          resolve: {
            events: function (DocumentsData, $q) {
              var deferred = $q.defer();
              deferred.resolve(DocumentsData.getAll());
              return deferred.promise;
            }
          }

        })

        .state('reports', {
          url: '/reports',
          templateUrl: "templates/reports.html"
        })
    }
  ]
);

esApp.directive('rowTemplate', function () {
  return {
    restrict: "E",
    templateUrl: "/row-template.html",
    link: function ($scope) {
      $scope.doIt = function () {
        alert('doit!!!');
      }
    }
  }
});

esApp.directive('actions', function () {
  return {
    scope: {
      upload: "&"
    },
    restrict: "E",
    templateUrl: "/actions.html"
  }
});

esApp.controller('TreeCtrl', function ($scope, TreeData) {
  $scope.data = TreeData.query();
});

esApp.controller('MenuCtrl', function ($scope, $stateParams, $location, DocumentsData) {
  window.LLL = $scope.location = $location;
});
