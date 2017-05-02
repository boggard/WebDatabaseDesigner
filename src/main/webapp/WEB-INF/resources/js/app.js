var app = angular.module('wdd', ['ui.bootstrap', 'ngSanitize']);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
