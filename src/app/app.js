angular.module( 'company', [
  'templates-app',
  'templates-common',
  'company.home',
  'company.weather',
  'ui.router',
  'autocomplete',
  'highcharts-ng'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  'use strict';
  $urlRouterProvider.otherwise( 'weather' );
})

.run( function run () {
})

.controller( 'AppCtrl', ['$scope', '$location', function AppCtrl ( $scope, $location ) {
  'use strict';
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | company' ;
    }
  });
}])

;

