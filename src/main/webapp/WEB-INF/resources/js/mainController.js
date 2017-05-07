app.controller('mainController', ['$uibModal', '$scope', '$sce', '$timeout', 'mainService',
    function (uibModal, scope, sce, timeout, mainService) {
        var self = this;
        self.tables = [];

        self.addTable = function (editTable) {
            uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'tableModal',
                controller: 'tableController',
                controllerAs: 'tableCtrl',
                resolve: {
                    tables: function () {
                        return self.tables;
                    },
                    editTable: function () {
                        return editTable;
                    }
                }
            }).result.then(function (table) {
                if (editTable === undefined) {
                    self.tables.push(table);
                }
                timeout(function () {
                    setDraggable();
                    addConnections(table);
                }, 500);
            }).catch(function (res) {
                if (!(res === 'cancel' || res === 'escape key press' || res === 'backdrop click')) {
                    throw res;
                }
            });
        };

        self.getSql = function () {
            mainService.getSql(self.tables)
                .then(function (response) {
                    var blob = new Blob([response.data]);
                    saveAs(blob, "dump.sql");
                })
        }
    }]);