var instance;
var connections = [];

jsPlumb.bind("ready", function () {
    instance = jsPlumb.getInstance({
        Container: "network"
    });


    setDraggable();
});

function setDraggable() {
    instance.draggable(jsPlumb.getSelector(".table-node"));
}

function addConnections(table) {
    table.foreignKeys.forEach(function (item, i, arr) {
        var connection = {
            name: table.name + "-" + item.fieldName + "/" + item.table.name + "-" + item.foreignField,
            connection: instance.connect({
                source: table.name + "-" + item.fieldName,
                anchor: "Left",
                target: item.table.name + "-" + item.foreignField
            })
        };
        connections.push(connection);
    });
}

function removeConnection(table, foreignKey) {
    var connection = connections.find(function (item, i, arr) {
        return item.name === table.name + "-" + foreignKey.fieldName + "/" + foreignKey.table.name + "-" + foreignKey.foreignField;
    });
    instance.detachAllConnections(connection.connection);
}