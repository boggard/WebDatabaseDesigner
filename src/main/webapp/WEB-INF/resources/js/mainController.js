app.controller('mainController', ['$uibModal', '$scope', '$sce', '$timeout', function (uibModal, scope, sce, timeout) {
        var self = this;
    self.tables = [];

        self.addTable = function () {
            var modalInstance = uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'tableModal',
                controller: 'tableController',
                controllerAs: 'tableCtrl',
                resolve: {
                    tables: function () {
                        return self.tables;
                    }
                }
            }).result.then(function (table) {
                self.tables.push(table);
                timeout(function () {
                    setDraggable();
                    addConnection();
                }, 500);
            }).catch(function (res) {
                if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
                    throw res;
                }
            });
        };
    }]);