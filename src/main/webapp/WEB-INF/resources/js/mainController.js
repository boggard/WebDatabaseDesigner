angular
    .module('wdd')
    .controller('mainController', ['$uibModal', '$scope', '$sce', function (uibModal, scope, sce) {
        var self = this;
        self.text = "asd";

        self.addTable = function () {
            self.items.push({id: 3});
            var modalInstance = uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'tableModal',
                controller: 'tableController',
                controllerAs: 'tableCtrl'
            }).result.then(function (result) {
                $scope.hour = result;
            }).catch(function (res) {
                if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
                    throw res;
                }
            });
        };

        self.tables = [{
            label: '',
            name: 'Table1',
            fields: []
        }, {
            label: '',
            name: 'Table2',
            fields: []
        }];

        self.h = '<div ng-repeat="item in mainCtrl.items">{{item.id}}</div>';

        self.variable = '<div compile="mainCtrl.h"></div>';

        // scope.thisCanBeusedInsideNgBindHtml = sce.trustAsHtml('<div ng-repeat="item in mainCtrl.items">{{item.id}}</div>');
    }]);