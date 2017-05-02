app.controller('tableController', ['$uibModalInstance', '$scope', '$sce', 'tables', 'editTable',
    function (modalInstance, scope, sce, tables, editTable) {

        var self = this;

        self.tables = tables;

        if (editTable !== undefined) {
            self.table = editTable;
            self.mainBtn = "Изменить";
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
                    foreignKey: false
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
            // delete self.table.editTable;
            modalInstance.close(self.table);
        };

        self.actionForeignKey = function (field) {
            if (field.foreignKey) {
                if (!self.checkFieldValid(field)) {
                    field.foreignKey = false;
                    return;
                }
                tables.some(function (elem) {
                    if (elem.fields.length > 0) {
                        self.table.foreignKeys.push(
                            {
                                fieldName: field.name,
                                table: elem,
                                foreignField: elem.fields[0].name
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
                    return element.fieldName === field.name;
                });
                var index = self.table.foreignKeys.indexOf(elem);
                if (index !== -1) {
                    removeConnection(self.table, self.table.foreignKeys[index]);
                    self.table.foreignKeys.splice(index, 1);
                }
            }
        };

        self.checkFieldValid = function (field, close) {
            if (!field.name.trim()) {
                self.errorMessage = "Имя поля таблицы не должно быть пустым";
                return false;
            }
            if (!field.type.trim()) {
                self.errorMessage = "Тип поля таблицы не должен быть пустым";
                return false;
            }
            if (self.table.fields.find(function (elem, i, arr) {
                    return elem.name === field.name && elem !== field;
                })) {
                self.errorMessage = "Поле с таким именем уже существует";
                return false;
            }
            if (tables.filter(function (elem, i, attr) {
                    return elem !== self.table/*.editTable*/;
                }).length === 0 && !close) {
                self.errorMessage = "Нет других таблиц для добавления внешнего ключа";
                return false;
            }
            self.errorMessage = null;
            return true;
        };

        self.checkTableValid = function () {
            if (!self.table.name.trim()) {
                self.errorMessage = "Имя таблицы не должно быть пустым";
                return false;
            }
            if (self.tables.find(function (elem, i, arr) {
                    return elem.name === self.table.name && elem !== self.table/*.editTable*/;
                })) {
                self.errorMessage = "Таблица с таким именем уже существует";
                return false;
            }
            self.errorMessage = null;
            return true;
        };

        return self;
    }]);

