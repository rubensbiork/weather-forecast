angular.module('company.weather.srvc', [])
    .service('weatherSrvc', [
        '$log',
        function($log) {

            //weatherSrvc as wSrvc
            var wSrvc = this;

            //expose get city names function: looping through array of cities
            //avoid duplicated city (some cities yahoo returns duplicated)
            wSrvc.getCityName = function(cities) {
                if (angular.isArray(cities)) {
                    return _.uniq(cities.map(function(city) {
                        if (city && city.name) {
                            return city.name;
                        }
                    }));
                }
            };

            //expose to controller: add min and max temp for serie
            this.getChartSeries = function(forecast, config) {
                var arr = [],
                    categories = [];
                $log.info(forecast);

                //build low/high series for each day
                arr.push({
                    name: 'Low',
                    data: toCelsius(reduce(forecast, 'low'))
                }, {
                    name: 'High',
                    data: toCelsius(reduce(forecast, 'high'))
                });

                //add days at xAxis dynamically
                categories = reduce(forecast, 'date');

                $log.info('Column series added.');

                return mountChart(arr, categories, config);
            };

            //set options and series for chart object
            function mountChart(data, categories, chartConfig) {
                $log.info('Mounting chart object.');

                chartConfig.xAxis.categories = categories;
                return {
                    options: chartConfig,
                    series: data
                };
            }

            //convert from Fahrenheit to Celsius
            function toCelsius(arr) {
                _.forEach(arr, function(t, i) {
                    arr[i] = (parseFloat(t) - 32) * (5 / 9);
                });
                return arr;
            }

            //reusable map function
            function reduce(arr, field) {
                if (arr) {
                    return arr.map(function(t) {
                        return t[field];
                    });
                }
            }

        }
    ]);