// create an array with nodes
var nodes = new vis.DataSet([
    {id: 1,title: "sds", label: "0x00405a2e:\nmov    DWORD PTR ss:[esp + 0x000000b0], 0x00000002\nmov    DWORD PTR ss:[ebp + 0x00], esi\ntest   bl, 0x02\nje     0x00405a49<<Insn>>\n", date: '2013-06-20', balance: 100},
    {id: 2, label: 'Пользователи\n-----------------------\n🔐id:BIGINT\nname:VARCHAR', date: '2013-06-20', balance: 100},
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
        shape: 'box'
    },
    physics: {
        enabled: false
    }
};

// initialize your network!
var network = new vis.Network(container, data, options);