angular.module( 'company.home', [
  'ui.router',
  'company.yahooAPI'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(['$stateProvider', function config( $stateProvider) {
  'use strict';
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
}]);
