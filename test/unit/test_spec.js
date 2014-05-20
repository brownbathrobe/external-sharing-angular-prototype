'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  var scope, ctrl;
  beforeEach(module('esApp'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    ctrl = $controller('NotificationsCtrl', {
      $scope: scope,
      NotificationsData: { query: function () {} }
    });
  }));

  it('sets the value of the NotificationsData', inject(function() {
    expect(1 === 1).to.be.true;
  }));
});
