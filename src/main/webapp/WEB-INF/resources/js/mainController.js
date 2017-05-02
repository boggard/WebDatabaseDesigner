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
                    /*if(editTable !== undefined) {
                     var clone = cloneObject(editTable);
                     clone.editTable = editTable;
                     return clone;
                     }*/
                    return editTable;
                }
            }
        }).result.then(function (table) {
            if (editTable === undefined) {
                self.tables.push(table);
            }
            /* else {
             Object.assign(editTable,table)
             }*/
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
                    alert(response.data);
                }, function (error) {
                    alert("asd");
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
            continue;
        }
        temp[key] = cloneObject(obj[key]);
    }

    return temp;
}