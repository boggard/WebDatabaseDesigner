app.controller('tableController', ['$uibModalInstance', '$timeout', '$sce', 'tables', 'editTable',
    function (modalInstance, timeout, sce, tables, editTable) {

        var self = this;

        self.tables = [].concat(tables);

        if (editTable !== undefined) {
            self.table = editTable;
            self.changing = true;
            self.tables.splice(self.tables.indexOf(editTable), 1);
        } else {
            self.table = {
                name: 'Table',
                fields: [],
                foreignKeys: []
            };
            self.mainBtn = "Добавить";
        }

        self.addField = function () {
            self.table.fields.push(
                {
                    name: '',
                    type: '',
                    primaryKey: false,
                    foreignKey: false,
                    notNull: false
                }
            );
        };

        self.removeField = function (field) {
            var index = self.table.fields.indexOf(field);
            if (index !== -1) {
                self.table.fields.splice(index, 1);
            }
        };

        self.cancel = function () {
            modalInstance.dismiss('cancel');
        };

        self.addTable = function () {
            var valid = true;
            self.table.fields.forEach(function (item, i, arr) {
                if (!self.checkFieldValid(item, close)) {
                    valid = false;
                }
            });
            if (!valid || !self.checkTableValid()) {
                return;
            }
            modalInstance.close(self.table);
        };

        self.actionForeignKey = function (field) {
            if (field.foreignKey) {
                if (!self.checkFieldValid(field)) {
                    field.foreignKey = false;
                    return;
                }
                self.tables.some(function (elem) {
                    if (elem.fields.length > 0) {
                        self.table.foreignKeys.push(
                            {
                                field: field,
                                table: elem,
                                foreignField: elem.fields[0]
                            }
                        );
                        return true;
                    }
                });
                if (self.table.foreignKeys.length === 0) {
                    field.foreignKey = false;
                    self.errorMessage = "Нет внешних полей для связи";
                }
            } else {
                var elem = self.table.foreignKeys.find(function (element, index, array) {
                    return element.field === field;
                });
                var index = self.table.foreignKeys.indexOf(elem);
                if (index !== -1) {
                    if (self.table.foreignKeys[index].connection !== undefined) {
                        removeConnection(self.table.foreignKeys[index]);
                    }
                    self.table.foreignKeys.splice(index, 1);
                }
            }
        };

        self.checkFieldValid = function (field, close) {
            if (!field.name.trim()) {
                return false;
            }
            if (!field.type.trim()) {
                return false;
            }
            if (self.table.fields.find(function (elem, i, arr) {
                    return elem.name === field.name && elem !== field;
                })) {
                field.errorMessage = "Поле с таким именем уже существует";
                return false;
            }
            if (self.tables.filter(function (elem, i, attr) {
                    return elem !== self.table /*&& elem !== self.table.editTable*/;
                }).length === 0 && !close) {
                field.errorMessage = "Нет других таблиц для добавления внешнего ключа";
                return false;
            }
            self.errorMessage = null;
            field.errorMessage = null;
            return true;
        };

        self.checkTableValid = function () {
            if (!self.table.name.trim()) {
                return false;
            }
            if (self.tables.find(function (elem, i, arr) {
                    return elem.name === self.table.name /*&& elem !== self.table.editTable*/;
                })) {
                self.errorMessage = "Таблица с таким именем уже существует";
                return false;
            }
            self.errorMessage = null;
            return true;
        };

        self.removeTable = function () {
            self.table.foreignKeys.forEach(function (fk) {
                if (fk.connection !== undefined) {
                    removeConnection(fk);
                }
            });
            self.tables.forEach(function (table) {
                table.foreignKeys.forEach(function (fk, index, arr) {
                    if (fk.connection !== undefined && fk.table === self.table) {
                        removeConnection(fk);
                        arr.splice(index, 1);
                    }
                })
            });
            tables.splice(tables.indexOf(self.table), 1);
            modalInstance.dismiss('cancel');
        };

        return self;
    }]);

