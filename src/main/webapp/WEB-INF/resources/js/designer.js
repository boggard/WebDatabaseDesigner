// create an array with nodes
var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1', date: '2013-06-20', balance: 100},
    {id: 2, label: 'Node 2', date: '2013-06-20', balance: 100},
    {id: 3, label: 'Node 3', date: '2013-06-20', balance: 100},
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
        shape: 'square'
    },
    physics: {
        enabled: false
    }
};

// initialize your network!
var network = new vis.Network(container, data, options);