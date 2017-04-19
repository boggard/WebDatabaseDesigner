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
    table.fields.forEach(function(currentValue, index, arr) {
        label += "\n" + currentValue.name + ": " + currentValue.type;
    });
    table.label = label;
}

angular
    .module('wdd')
    .directive('contenteditable', ['$sce', function($sce) {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function() {
                element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                scope.$evalAsync(read);
            });
            read(); // initialize

            // Write data to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if (attrs.stripBr && html === '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
        }
    };
}]);