app.controller('tableController', ['$uibModalInstance', '$scope', '$sce', 'tables',
    function (modalInstance, scope, sce, tables) {

        var self = this;

        self.tables = tables;

        self.table = {
            name: 'Table',
            fields: [],
            foreignKeys: []
        };

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
                if (!self.checkFieldValid(item)) {
                    valid = false;
                }
            });
            if (!valid) {
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
                self.table.foreignKeys.push(
                    {
                        fieldName: field.name
                    }
                )
            } else {
                var elem = self.table.foreignKeys.find(function (element, index, array) {
                    return element.fieldName === field.name;
                });
                var index = self.table.foreignKeys.indexOf(elem);
                if (index !== -1) {
                    self.table.foreignKeys.splice(index, 1);
                }
            }
        };

        self.checkFieldValid = function (field) {
            if (!field.name.trim()) {
                self.errorMessage = "Имя поля таблицы не должно быть пустым";
                return false;
            }
            if (!field.type.trim()) {
                self.errorMessage = "Тип поля таблицы не должен быть пустым";
                return false;
            }
            self.errorMessage = null;
            return true;
        };

        return self;
    }]);

