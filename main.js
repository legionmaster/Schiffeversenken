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

function render(table, gegner) {
  var tds = table.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) {
    var dataId = parseInt(tds[i].getAttribute("data-id"));
    switch (dataId) {
      case 0:
        tds[i].setAttribute("class", "wasser");
        break;
      case 1:
        if (!gegner) {
          tds[i].setAttribute("class", "schiff");
        } else {
          tds[i].setAttribute("class", "wasser");
        }
        break;
      case 2:
        tds[i].setAttribute("class", "daneben");
        break;
      case 3:
        tds[i].setAttribute("class", "treffer");
        break;
      default:
    }
  }
}

function schiffeerstellen(table) {
  var schiffe = [4, 5, 6, 64, 65, 66, 67];
  var tds = table.getElementsByTagName("td");
  for (var i = 0; i < schiffe.length; i++) {
    tds[schiffe[i]].setAttribute("data-id", 1);
  }
}

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function schiessen(event, table, gegner) {
  if(event.target && event.target.nodeName == "TD") {
    var td = event.target;
    var dataId = parseInt(td.getAttribute('data-id'));
    if (dataId < 2){
      td.setAttribute('data-id', dataId + 2);
      render(table, gegner);
    }
  }
}

function main(args) {
  createTable(args.tablespieler, 10, 10);
  createTable(args.tablegegner, 10, 10);
  schiffeerstellen(args.tablespieler);
  schiffeerstellen(args.tablegegner);
  render(args.tablespieler, false);
  render(args.tablegegner, true);
}

ready(function() {
  var tablespieler = document.querySelector("#spieler table");
  var tablegegner = document.querySelector("#gegner table");
  main({
    "tablespieler": tablespieler,
    "tablegegner": tablegegner
  });
  // tablespieler.addEventListener("click", function() {
  //   schiessen(event, tablespieler, false);
  // });
  tablegegner.addEventListener("click", function() {
    schiessen(event, tablegegner, true);
  });
});
