angular.module('company.weather', [
    'ui.router',
    'company.yahooAPI',
    'company.weather.srvc'
])

.config(['$stateProvider',
    function config($stateProvider) {
        'use strict';
        $stateProvider.state('weather', {
            url: '/weather',
            views: {
                "main": {
                    controller: 'WeatherCtrl',
                    templateUrl: 'weather/weather.tpl.html'
                }
            },
            data: {
                pageTitle: 'Weather'
            }
        });
    }
])
//controller best practise according John Papa
//https://github.com/johnpapa/angular-styleguide#controllers
.controller('WeatherCtrl', ['$log', '$timeout', 'yahooAPI', 'weatherSrvc',
    function WeatherController($log, $timeout, yahooAPI, weatherSrvc) {
        'use strict';

        //WeatherCtrl as wc
        var wc = this;

        //variables
        wc.cities = {};
        wc.delaySearch = false;
        wc.tab = 'cityTab';
        wc.timeToWait = 100;

        //functions
        wc.getCities = getCities;
        wc.getSelectedCity = getSelectedCity;
        wc.getForecast = getForecast;

        //configuration for chart
        wc.config = {
            column: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Temperatures'
                },
                exporting: {
                    enabled: false
                },
                //xAxis is dynamically created in the weatherSrvc
                xAxis: {},
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Celsius'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                tooltip: {
                    pointFormat: "{series.name}: <b>{point.y:.0f}</b> C"
                },
                colors: ['#90ed7d', '#f76635']
            }
        };

        function getForecast(city) {
            if (city) {
                yahooAPI.getWeatherForCity(city.woeid)
                    .$promise.then(function(response) {
                        var forecast = response.query.results.channel.item.forecast;

                        //get chart series and attached to the variable in the view
                        wc.chart = weatherSrvc.getChartSeries(forecast, wc.config.column);

                        $log.info('Got weather/drawing chart for ' + wc.cities.selectedCity.name,
                            wc.cities.selectedCity.forecast);
                    });
            }
        }

        function getSelectedCity(cityName) {
            $log.info('Selected city ' + cityName);

            //get city model from city name
            wc.cities.selectedCity = _.find(wc.cities.models, function(city) {
                return city.name = cityName;
            });

            //once user selects city, it gets forecast
            getForecast(wc.cities.selectedCity);
        }

        //populate autocomplete field
        //has a configurable time in order to call api for avoiding unecessary calls.
        function getCities(typed) {
            if (typed) {
                if (wc.delaySearch) {
                    $timeout.cancel(wc.delaySearch);
                }
                wc.delaySearch = $timeout(function() {
                    yahooAPI.getCitiesByName(typed)
                        .$promise.then(function(response) {
                            $log.info('Cities starting with ' + typed, response.query.results.place);
                            wc.cities.models = response.query.results.place;
                            wc.cities.names = weatherSrvc.getCityName(response.query.results.place);
                        });
                }, 150);
            }
        }
    }
]);