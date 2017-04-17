angular
    .module('wdd')
    .controller('tableController', ['$uibModalInstance', function (modalInstance) {

        var self = this;

        self.cancel = function () {
            modalInstance.dismiss('cancel');
        };

        return self;
    }]);