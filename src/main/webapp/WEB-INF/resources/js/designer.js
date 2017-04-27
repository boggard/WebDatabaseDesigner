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

function addConnections(table) {
    table.foreignKeys.forEach(function (item, i, arr) {
        instance.connect({
            source: table.name + "-" + item.fieldName,
            anchor: "Left",
            target: item.table.name + "-" + item.foreignField
        });
    });
}