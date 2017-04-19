angular
    .module('wdd')
    .controller('mainController', ['$uibModal', function (uibModal) {
        var self = this;
        self.text = "asd";

        self.addTable = function () {
            var modalInstance = uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'tableModal',
                controller: 'tableController',
                controllerAs: 'tableCtrl'
            }).result.catch(function(res) {
                if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
                    throw res;
                }
            });
        }

    }]);