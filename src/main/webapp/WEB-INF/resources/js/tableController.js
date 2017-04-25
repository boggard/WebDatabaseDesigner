app.controller('tableController', ['$uibModalInstance', '$scope', '$sce', function (modalInstance, scope, sce) {

        var self = this;

        self.table  = {
            name: 'Table',
            fields: []
        };

        self.addField  = function () {
            self.table.fields.push(
                {
                    name: 'field',
                    type: 'BIGINT',
                    primaryKey: false
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

        return self;
    }]);

