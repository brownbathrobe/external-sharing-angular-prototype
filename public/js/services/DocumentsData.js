angular.module('esApp').factory('DocumentsData', function ($resource, $q) {
  var resource = $resource("/api/documents");
  return {
    getAll: function () {
      var deferred = $q.defer();
      var data = [
        { label: "ONE", id: 'one', children: [{ label: 'kid', id: 'kid' }] },
        { label: "TWO", id: 'two' },
        { label: "THREE", id: 'three' }
      ];

      resource.query({},
        function (response) { deferred.resolve(response) },
        function (response) { deferred.reject(response) });

      return deferred.promise;
    }
  }
});
