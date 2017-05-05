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
                        if (editTable !== undefined) {
                            var clone = cloneObject(editTable);
                            clone.editTable = editTable;
                            return clone;
                        }
                        return editTable;
                    }
                }
            }).result.then(function (table) {
                if (editTable === undefined) {
                    self.tables.push(table);
                    timeout(function () {
                        setDraggable();
                        addConnections(table);
                    }, 500);
                }
                else {
                    var newFK = [];
                    newFK.push(table.foreignKeys);
                    delete table.foreignKeys;
                    Object.assign(editTable, table);
                    var addFk, updateFK = [];
                    newFK.forEach(function (elem, i, arr) {
                        if (editTable.foreignKeys.find(function (elemE) {
                                return elem === elemE;
                            })) {
                            var index = editTable.foreignKeys.indexOf(elem);
                            editTable.foreignKeys.splice(index, 1);
                            updateFK.push(elem);
                        } else {
                            addFk.push(elem);
                        }
                    });
                    editTable.foreignKeys.forEach(function (elem, i, arr) {
                        removeConnection(editTable, elem);
                    });
                    editTable.foreignKeys.push(updateFK);
                    editTable.foreignKeys.push(addFk);
                    timeout(function () {
                        setDraggable();
                        addFkConnections(table);
                    }, 500);
                }
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

function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        if (key === 'connection') {
            temp[key] = obj[key];
            continue;
        }
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}