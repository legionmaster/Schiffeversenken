var tablespieler = document.querySelector("#spieler table");
var tablegegner = document.querySelector("#gegner table");

function createTable(table,x,y) {
  for (var i=0; i < x;i++) {
    var tr = document.createElement("tr");
    for(var j=0; j < y; j++) {
      var td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

createTable(tablespieler, 10, 10);
createTable(tablegegner, 10, 10);
