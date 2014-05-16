'use strict';

var esApp = angular.module('esApp', ['ui.bootstrap', 'ui.router', 'ngResource', 'ui.tree', 'ngGrid', 'angularFileUpload']);
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
          templateUrl: '/templates/recent.html',
          controller: 'RecentCtrl'
        })

        .state('library', {
          url: '/library',
          templateUrl: "/templates/library.html",
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

// esApp.controller('UploadCtrl', function ($scope, $upload) {
//   $scope.onFileSelect = function(files) {
//     debugger;
//     //$files: an array of files selected, each file has name, size, and type.
//     for (var i = 0; i < files.length; i++) {
//       var file = files[i];
//       $scope.upload = $upload.upload({
//         url: '/api/upload', //upload.php script, node.js route, or servlet url
//         // method: 'POST' or 'PUT',
//         // headers: {'header-key': 'header-value'},
//         // withCredentials: true,
//         data: {
//           title: $scope.title,
//           fileName: $scope.fileName,
//           description: $scope.description
//         },
// 
//         file: file, // or list of files: $files for html5 only
//         /* set the file formData name ('Content-Desposition'). Default is 'file' */
//         //fileFormDataName: myFile, //or a list of names for multiple files (html5).
//         /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
//         //formDataAppender: function(formData, key, val){}
//       }).progress(function(evt) {
//         console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
//       }).success(function(data, status, headers, config) {
//         // file is uploaded successfully
//         console.log(data);
//       })
//       .error(function () { alert('fail'); });
//       //.then(success, error, progress);
//       //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
//     }
//     /* alternative way of uploading, send the file binary with the file's content-type.
//        Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
//        It could also be used to monitor the progress of a normal http post/put request with large data*/
//     // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
//   };
// });

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

esApp.factory('Config', function () {
  return {
    apiPath: '/api'
  };
});
