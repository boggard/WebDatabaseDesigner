app.controller('tableController', ['$uibModalInstance', '$scope', '$sce', function (modalInstance, scope, sce) {

        var self = this;

        self.table  = {
            name: 'Table',
            fields: [],
            foreignKeys: []
        };

        self.addField  = function () {
            self.table.fields.push(
                {
                    name: 'field',
                    type: 'BIGINT',
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
            modalInstance.close(self.table);
        };

    self.actionForeignKey = function (field) {
        if (field.foreignKey) {
            self.table.foreignKeys.push(
                {
                    fieldName: field.name,
                    tableName: '',
                    foreignField: ''
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

        return self;
    }]);

