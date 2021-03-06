app.controller('mainController', ['$uibModal', '$scope', '$sce', '$timeout', 'mainService', 'Upload',
    function (uibModal, scope, sce, timeout, mainService, Upload) {
        var self = this;
        self.link = function () {
            self.tables.forEach(function (table) {
                table.foreignKeys.forEach(function (key) {
                    key.table = self.tables.find(function (elem) {
                        return elem.name === key.table.name;
                    });
                    key.foreignField = key.table.fields.find(function (elem) {
                        return elem.name === key.foreignField.name;
                    })
                })
            });
        };

        var localTables = localStorage.getItem("tables");
        self.tables = localTables !== null ? angular.fromJson(localTables) : [];
        self.link();
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
                backdrop: 'static',
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

        self.uploadFiles = function (file) {
            if (file) {
                file.upload = Upload.upload({
                    url: "/parse_sql",
                    file: file
                });

                file.upload.then(function (response) {
                    self.clear();
                    self.tables = response.data;
                    self.link();
                    var left = 0, top = 0;
                    self.tables.forEach(function (elem) {
                        elem.leftPos = left;
                        elem.topPos = top;
                        left += 100;
                        top += 100;
                    });
                    timeout(function () {
                        setDraggable();
                        addAllConnections(self.tables);
                    }, 500);
                }, function (response) {

                });
            }
        };


        window.onbeforeunload = self.setToStorage;
    }]);