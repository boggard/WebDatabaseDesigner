/*
// create an array with nodes
var nodes = new vis.DataSet([
    {id: 1,title: "sds", label: "0x00405a2e:\nmov    DWORD PTR ss:[esp + 0x000000b0], 0x00000002\nmov    DWORD PTR ss:[ebp + 0x00], esi\ntest   bl, 0x02\nje     0x00405a49<<Insn>>\n", date: '2013-06-20', balance: 100},
    {id: 2, label: 'Пользователи\n-----------------------\n🔐id:BIGINT\nname:VARCHAR', date: '2013-06-20', balance: 100},
 {id: 3, label: 'Node 3\n         sdsds', date: '2013-06-20', balance: 100},
    {id: 4, label: 'Node 4', date: '2013-06-20', balance: 100},
    {id: 5, label: 'Node 5', date: '2013-06-20', balance: 100}
]);

// create an array with edges
var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
]);

// create a network
var container = document.getElementById('network');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    nodes: {
 shape: 'box',
 font: {
 align: 'left',
 multi: true
 }
    },
    physics: {
        enabled: false
    }
};

// initialize your network!
 var network = new vis.Network(container, data, options);*/

var instance;

jsPlumb.bind("ready", function () {
    /*var e0 = jsPlumb.addEndpoint("container0"),
     e1 = jsPlumb.addEndpoint("container1");
     var dynamicAnchors = [ [ 0.2, 0, 0, -1 ],  [ 1, 0.2, 1, 0 ],
     [ 0.8, 1, 0, 1 ], [ 0, 0.8, -1, 0 ] ];

     jsPlumb.connect({ source:e0, anchor:dynamicAnchors, target:e1});*/

    instance = jsPlumb.getInstance({
        Container: "network"
    });


    setDraggable();
});

function setDraggable() {
    instance.draggable(jsPlumb.getSelector(".table-node"));
}

function addConnection() {

    /*var exampleDropOptions = {
        tolerance: "touch",
        hoverClass: "dropHover",
        activeClass: "dragActive"
    };

    var exampleColor = "#00f";
    var color2 = "#316b31";
    var exampleEndpoint2 = {
        endpoint: ["Dot", {radius: 11}],
        paintStyle: {fill: color2},
        isSource: true,
        scope: "green",
        connectorStyle: {stroke: color2, strokeWidth: 6},
        connector: ["Bezier", {curviness: 63}],
        maxConnections: 3,
        isTarget: true,
        dropOptions: exampleDropOptions
     };*/

    //instance.connect({source:"Table",  anchor:"Left", target:"Table1"});
    instance.connect({source: "Table-id", anchor: "Left", target: "Table1-id"});
    //var e1 = instance.connect('Table-id', {anchor:[ 0.5, 1, 0, 1, 0, 50 ]}, 'Table1-id');
}