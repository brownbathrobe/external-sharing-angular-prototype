'use strict';
var esApp = angular.module('esApp', ['ui.bootstrap', 'ui.router', 'ngResource', 'ui.tree', 'ngGrid', 'angularFileUpload', 'esTemplates']);
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
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');

      // use pushState
      $locationProvider.html5Mode(true);

      // Use $stateProvider to configure your states.
      $stateProvider

        .state("home", {
          url: "/",
          templateUrl: 'templates/recent.html',
          controller: 'RecentCtrl'
        })

        .state('library', {
          url: '/library',
          templateUrl: "templates/library.html",
          controller: 'LibraryCtrl',
          resolve: {
            folderData: function ($q, $location, LibraryData) {
              var query = $location.search();
              var deferred = $q.defer();
              deferred.resolve(LibraryData.getStuff(query));
              return deferred.promise;
            }
          }
        })

        .state('tasks', {
          url: '/tasks',
          templateUrl: "templates/tasks.html",
          controller: 'TasksCtrl',
          resolve: {
            tasks: function (TasksData, $q) {
              var deferred = $q.defer();
              deferred.resolve(TasksData.query());
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
    templateUrl: "row-template.html",
    link: function ($scope) {
      $scope.doIt = function () {
        alert('doit!!!');
      }
    }
  }
});

esApp.directive('actions', function () {
  return {
    restrict: "E",
    templateUrl: "actions.html"
  }
});

esApp.controller('TreeCtrl', function ($scope, TreeData, $timeout) {
  $scope.data = TreeData.query();
  $scope.initialState = true;
});

esApp.controller('MenuCtrl', function ($scope) {
});

esApp.directive('whenActive', function ($location) {
  return {
    scope: true,
    link: function (scope, element, attrs) {
      scope.$watch(function () {
        return $location.path();
      }, function (newPath, oldPath) {
        _.each(element.find('> li'), function (li) {
          var $li = angular.element(li),
              pattern = $li.data('match-route'),
              regexp = new RegExp('^\\' + pattern + "$", ['i']);
          $li.toggleClass('active', regexp.test(newPath));
        });
      });
    }
  };
});

esApp.directive('fileUpload', function () {
  return {
    restrict: "E",
    template: '<div class="row"><div class="col-xs-9"><input type="text" class="form-control" readonly /></div>' +
      '<div class="col-xs-3"><button class="btn btn-default">Browse</button><input type="file" style="display: none;" /></div>',

    link: function (scope, elem, attrs) {
      var $real = elem.find('input[type="file"]'),
          $fake = elem.find('button'),
          $filename = elem.find('input[type="text"]');

      $real.change(function (e) {
        $filename.val($(this).val());
      });

      $fake.on('click', function () {
        $real.trigger('click');
      });
    }
  }
});

esApp.constant('Config', {
  apiPath: '/api'
});

esApp.directive('activeSegment', function ($location) {
  return {
    restrict: "E",
    scope: {
      segment: "=",
      current: "="
    },
    replace: true,
    template:
      '<li ng-class="{ active: segment.id === current.id }" ng-switch="segment.id === current.id">' +
      '<span ng-switch-when="true">{{ segment.name }}</span>' +
      '<a ng-switch-when="false" href="/library?folder={{segment.id}}">{{segment.name}}</a></li>'
  }
});
