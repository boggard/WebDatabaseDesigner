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
    instance.detach(foreignKey.connection);
}

function removeAllConnection(tables) {
    tables.forEach(function (table) {
        table.foreignKeys.forEach(function (item, i, arr) {
            if (item.connection !== undefined) {
                instance.detach(item.connection);
            }
        })
    });
}