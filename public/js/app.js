'use strict';

var esApp = angular.module('esApp', ['ui.bootstrap', 'ui.router', 'ngResource', 'ui.tree']);
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
          templateUrl: "templates/library.html",
          controller: 'LibraryCtrl'
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

esApp.controller('TreeCtrl', function ($scope, DocumentsData) {
  $scope.$watch('abc.currentNode', function( newObj, oldObj ) {
    var stuff = ['foo', 'bar', 'baz', 'wow', 'ho', 'ugh', 'meh', 'derp'],
        name = stuff[Math.floor(Math.random() * stuff.length)],
        id = Math.floor(Math.random() * 10000),
        currentNode;

    if($scope.abc && angular.isObject($scope.abc.currentNode)) {
      currentNode = $scope.abc.currentNode;
      console.log('Node Selected: ', currentNode);
      currentNode.children || (currentNode.children = []);
      $scope.abc.currentNode.children.push({ label: name, id: id });
    }
  }, false);

  $scope.data = [
    {
      "id": 1,
      "title": "node1",
      "nodes": [
        {
          "id": 11,
          "title": "node1.1",
          "nodes": [
            {
              "id": 111,
              "title": "node1.1.1",
              "nodes": []
            }
          ]
        },
        {
          "id": 12,
          "title": "node1.2",
          "nodes": []
        }
      ]
    },
    {
      "id": 2,
      "title": "node2",
      "nodes": [
        {
          "id": 21,
          "title": "node2.1",
          "nodes": []
        },
        {
          "id": 22,
          "title": "node2.2",
          "nodes": []
        }
      ]
    },
    {
      "id": 3,
      "title": "node3",
      "nodes": [
        {
          "id": 31,
          "title": "node3.1",
          "nodes": []
        }
      ]
    },
    {
      "id": 4,
      "title": "node4",
      "nodes": [
        {
          "id": 41,
          "title": "node4.1",
          "nodes": []
        }
      ]
    }
]
  $scope.doIt = function () {
    debugger;
  };
});

esApp.controller('MenuCtrl', function ($scope, $location, DocumentsData) {
});
