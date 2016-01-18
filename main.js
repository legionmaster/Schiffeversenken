var ships = [
  {"name": "schlachtschiff", "position": [15, 16, 17, 18, 19]},
  {"name": "kreuzer", "position": [34, 35, 36, 37]},
  {"name": "kreuzer", "position": [77, 78, 79, 80]},
  {"name": "zerstörer", "position": [0, 1, 2]},
  {"name": "zerstörer", "position": [91, 92, 93]},
  {"name": "zerstörer", "position": [51, 52,53 ]},
  {"name": "u-boot", "position": [63, 64]},
  {"name": "u-boot", "position": [67, 68]},
  {"name": "u-boot", "position": [86, 87]},
  {"name": "u-boot", "position": [82, 83]}
]

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

function schiffeerstellen(table, ships) {
  var tds = table.getElementsByTagName("td");
  for (var i = 0; i < ships.length; i++) {
    for (var j = 0; j < ships[i].position.length; j++) {
      tds[ships[i].position[j]].setAttribute("data-id", 1);
    }
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

function updateScoreboard(table) {
  var tds = table.querySelectorAll("#gegner .scoreboard table td:first-child");
  var kreuzercount = 0
  var zerstoerercount = 0
  var schlachtschiffcount = 0
  var ubootcount = 0
  for (var i = 0; i < ships.length; i++) {
    ships[i]
    switch (ships[i].name){
      case("schlachtschiff"):
        schlachtschiffcount++;
        break;
      case("zerstörer"):
        zerstoerercount++;
        break;
      case("kreuzer"):
        kreuzercount++;
        break;
      case("u-boot"):
        ubootcount++;
        break;
      default:
    }
  }
  tds[3].querySelector("span").innerHTML= schlachtschiffcount;
  tds[2].querySelector("span").innerHTML= zerstoerercount;
  tds[1].querySelector("span").innerHTML= kreuzercount;
  tds[0].querySelector("span").innerHTML= ubootcount;
}

function main(args) {
  createTable(args.tablespieler, 10, 10);
  createTable(args.tablegegner, 10, 10);
  schiffeerstellen(args.tablespieler, ships);
  schiffeerstellen(args.tablegegner, ships);
  updateScoreboard(args.tablegegner, ships);
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
