angular.module('esApp').factory('RecentData', function ($resource, $q, Config) {
  var resource = $resource(Config.apiPath + '/recent');
  return {
    getStuff: function () {
      var deferred = $q.defer();
      resource.query({},
        function (response) { deferred.resolve(response) },
        function (response) { deferred.reject(response) });

      return deferred.promise;
    }
  }
});
