angular.module('esApp').factory('LibraryData', function ($resource, $q) {
  var resource = $resource("/api/library");
  return {
    getStuff: function (query) {
      query || (query = {});
      var deferred = $q.defer();
      resource.get({ foo: query.folder },
        function (response) { deferred.resolve(response) },
        function (response) { deferred.reject(response) });

      return deferred.promise;
    }
  }
});
