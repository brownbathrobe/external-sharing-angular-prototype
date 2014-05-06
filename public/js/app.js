'use strict';

var esApp = angular.module('esApp', ['ui.bootstrap', 'ui.router']);
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
  ['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

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


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("home", {

          // Use a url of "/" to set a states as the "index".
          url: "/",

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          templateUrl: '/templates/home.html'
        })

        ///////////
        // About //
        ///////////

        .state('library', {
          url: '/library',

          // Showing off how you could return a promise from templateProvider
          templateUrl: "templates/library.html"
        })

        .state('about', {
          url: '/about',
          templateUrl: "templates/about.html"
        })
    }
  ]
);
esApp.controller('LibraryCtrl', function ($scope) {
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

esApp.controller('MenuCtrl', function ($scope, $location) {
  $scope.oneAtATime = true;

  $scope.goThere = function (group) {
    $location.url(group.title);
    debugger;
  };

  $scope.groups = [
    {
      title: 'library',
      docs: [
        { name: "foo" },
        { name: "bar" },
        { name: "baz" }
      ]
    },
    {
      title: 'Favorites',
      content: 'Dynamic Group Body - 2'
    }
  ];

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
