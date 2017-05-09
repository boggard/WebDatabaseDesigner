app.controller('mainController', ['$uibModal', '$scope', '$sce', '$timeout', 'mainService',
    function (uibModal, scope, sce, timeout, mainService) {
        var self = this;
        var localTables = localStorage.getItem("tables");
        self.tables = localTables !== null ? angular.fromJson(localTables) : [];
        timeout(function () {
            setDraggable();
            addAllConnections(self.tables);
        }, 50);
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
                    self.setToStorage();
                }, 50);
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
        };

        self.getPositions = function (target) {
            target.forEach(function (elem) {
                var table = angular.element(document.querySelector("#" + elem.name));
                elem.leftPos = table[0].offsetLeft;
                elem.topPos = table[0].offsetTop;
            })
        };

        self.setToStorage = function () {
            var clone = cloneObject(self.tables);
            self.getPositions(clone);
            localStorage.setItem("tables", angular.toJson(clone));
        };

        self.clear = function () {
            removeAllConnection(self.tables);
            self.tables = [];
        };

        window.onbeforeunload = self.setToStorage;
    }]);