var instance;

jsPlumb.bind("ready", function () {
    instance = jsPlumb.getInstance({
        Container: "network"
    });
    setDraggable();
});

function setDraggable() {
    instance.draggable(jsPlumb.getSelector(".table-node"));
}

function connect(source, target) {
    return instance.connect({
        source: source,
        anchor: ["Left", "Right"],
        target: target,
        detachable: false
    })
}

function addConnections(table) {
    table.foreignKeys.forEach(function (item, i, arr) {
        item.connection = connect(table.name + "-" + item.field.name,
            item.table.name + "-" + item.foreignField.name);
    });
}

function addAllConnections(tables) {
    tables.forEach(function (table) {
        table.foreignKeys.forEach(function (item, i, arr) {
            item.connection = connect(table.name + "-" + item.field.name,
                item.table.name + "-" + item.foreignField.name);
        });
    })
}


function removeConnection(foreignKey) {
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