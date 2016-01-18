var tablespieler = document.querySelector("#spieler table");
var tablegegner = document.querySelector("#gegner table");

function createTable(table,x,y) {
  for (var i=0; i < x;i++) {
    var tr = document.createElement("tr");
    for(var j=0; j < y; j++) {
      var td = document.createElement("td");
      td.setAttribute("data-id", "0");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function render(table) {
  var tds = table.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) {
    var dataId = parseInt(tds[i].getAttribute("data-id"));
    switch (dataId) {
      case 0:
        tds[i].setAttribute("class", "wasser");
        break;
      case 1:
        tds[i].setAttribute("class", "schiff")
        break;
      case 2:
        tds[i].setAttribute("class", "daneben")
        break;
      case 3:
        tds[i].setAttribute("class", "getroffen")
        break;
      default:

    }
  }
}
function main() {
  createTable(tablespieler, 10, 10);
  createTable(tablegegner, 10, 10);
  render(tablespieler);
  render(tablegegner);
}
main();
