angular
    .module('wdd')
    .controller('tableController', ['$uibModalInstance', '$scope', function (modalInstance, scope) {

        var self = this;

        var id = 1;
        self.table  = {
            label: '',
            name: 'Table',
            fields: []
        };

        self.addField  = function () {
            self.table.fields.push(
                {
                    label: '',
                    id: id,
                    name: 'field' + id,
                    type: 'BIGINT'
                }
            );
            id++;
        };

        scope.name = "sd";
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
            setLabel(self.table);
            nodes.add(self.table);

            self.cancel();
        };

        return self;
    }]);

function setLabel(table) {
    var label = table.name + "\n-------------";
    var spacesCount = 0;
    table.fields.forEach(function(currentValue, index, arr) {
        if (spacesCount < currentValue.name.length) {
            spacesCount = currentValue.name.length;
        }
    });
    table.fields.forEach(function (currentValue, index, arr) {
        label += "\n";
        for (i = 0; i < spacesCount - currentValue.name.length; i++) {
            label += " ";
        }
        label += currentValue.name + ": " + currentValue.type;
    });
    table.label = label;
}

