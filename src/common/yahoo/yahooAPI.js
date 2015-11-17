angular.module('company.yahooAPI', ['ngResource'])
  .factory('yahooAPI', ['$resource', function ($resource) {
    'use strict';
    var APIHandle = $resource('https://query.yahooapis.com/v1/public/yql', {});
    return {
      getWeatherForCity: function (woeID) {
        var query = 'select * from weather.forecast where woeid=' + woeID; // leave the security to yahoo
        return APIHandle.get({ q: query, format: 'json', diagnostics: true, callback: '' });
      },
      getCitiesByName: function (name) {
        var query = 'select * from geo.places where text = "' + name + '*"'; // leave the security to yahoo
        return APIHandle.get({ q: query, format: 'json' });
      }
    };
  }]);
