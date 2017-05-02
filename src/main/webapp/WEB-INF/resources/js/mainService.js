angular
    .module('wdd')
    .factory('mainService', function ($http) {
        return {
            getSql: function (tables) {
                return $http({
                    method: 'POST',
                    url: "/generate_sql",
                    data: JSON.stringify(tables),
                    headers: {'Content-Type': 'application/json'}
                })
            }
        }
    });
