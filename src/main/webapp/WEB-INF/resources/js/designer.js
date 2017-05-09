var instance;
var connections = [];
var connection;

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
        item.connection = instance.connect({
            source: table.name + "-" + item.field.name,
            anchor: "Left",
            target: item.table.name + "-" + item.foreignField.name
        })
    });
}

function addAllConnections(tables) {
    tables.forEach(function (table) {
        table.foreignKeys.forEach(function (item, i, arr) {
            item.connection = instance.connect({
                source: table.name + "-" + item.field.name,
                anchor: "Left",
                target: item.table.name + "-" + item.foreignField.name
            })
        });
    })
}

function addFkConnections(table, foreignKeys) {
    foreignKeys.forEach(function (item, i, arr) {
        item.connection = instance.connect({
            source: table.name + "-" + item.field.name,
            anchor: "Left",
            target: item.table.name + "-" + item.foreignField.name
        })
    });
}


function addConnection(table, foreignKey) {
    foreignKey.connection = instance.connect({
        source: table.name + "-" + foreignKey.fieldName,
        anchor: "Left",
        target: foreignKey.table.name + "-" + foreignKey.foreignField
    })
}

function removeConnection(table, foreignKey) {
    /*var connection = connections.find(function (item, i, arr) {
     return item.name === table.name + "-" + foreignKey.fieldName + "/" + foreignKey.table.name + "-" + foreignKey.foreignField;
     });*/
    instance.detach(foreignKey.connection);
}