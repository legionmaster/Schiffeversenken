var ships = [
  {"name": "schlachtschiff", "position": [15, 16, 17, 18, 19]},
  {"name": "kreuzer", "position": [34, 35, 36, 37]},
  {"name": "kreuzer", "position": [76, 77, 78, 79]},
  {"name": "zerstörer", "position": [0, 1, 2]},
  {"name": "zerstörer", "position": [91, 92, 93]},
  {"name": "zerstörer", "position": [51, 52,53 ]},
  {"name": "u-boot", "position": [63, 64]},
  {"name": "u-boot", "position": [67, 68]},
  {"name": "u-boot", "position": [86, 87]},
  {"name": "u-boot", "position": [82, 83]}
]

var shipsKI = [
  {"name": "schlachtschiff", "position": [15, 16, 17, 18, 19]},
  {"name": "kreuzer", "position": [34, 35, 36, 37]},
  {"name": "kreuzer", "position": [76, 77, 78, 79]},
  {"name": "zerstörer", "position": [0, 1, 2]},
  {"name": "zerstörer", "position": [91, 92, 93]},
  {"name": "zerstörer", "position": [51, 52,53 ]},
  {"name": "u-boot", "position": [63, 64]},
  {"name": "u-boot", "position": [67, 68]},
  {"name": "u-boot", "position": [86, 87]},
  {"name": "u-boot", "position": [82, 83]}
]

var posArray = [];
for (var i = 0; i < 100 ; i++) {
  posArray.push(i);
}

function randomTarget() {
  var index = Math.floor(Math.random() * posArray.length);
  var target = posArray[index];
  posArray.splice(index, 1);
  return parseInt(target);
}

function createTable(table, x, y) {
  var count = 0;
  for (var i=0; i < x;i++) {
    var tr = document.createElement("tr");
    for(var j=0; j < y; j++) {
      var td = document.createElement("td");
      td.setAttribute("data-id", "0");
      td.setAttribute("data-pos", count);
      tr.appendChild(td);
      count++;
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

function schiffeerstellen(table,ships) {
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


function updateStatus (dataId) {
  if (dataId + 2 == 2){
    var status = document.querySelector(".status h1");
    status.innerHTML = "Daneben!";
    status = document.querySelector(".status h2");
    status.innerHTML = "Nächster Spieler ist an der Reihe!"
    return false;
  }
  if (dataId + 2 == 3){
    var status = document.querySelector(".status h1");
    status.innerHTML = "Getroffen!";
    status = document.querySelector(".status h2");
    status.innerHTML = "Du bist wieder an der Reihe!"
    return true;
  }
}

function updateData(shotposition, ships) {
  ships.map(function(ship) {
      var newpos = ship.position.filter(function(pos) {
          return pos !== shotposition;
      });
      ship.position = newpos;
  });
  var newShips = ships.filter(function(elem) {
      if (elem.position.length > 0) {
        return elem;
      }
      var status = document.querySelector(".status h2");
      status.innerHTML = "Schiff zerstört!"
  });
  return newShips;
}


function updateScoreboard(scoreboardtable, ships) {
  var tds = scoreboardtable.querySelectorAll("td:first-child");
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
  tds[2].querySelector("span").innerHTML= kreuzercount;
  tds[1].querySelector("span").innerHTML= zerstoerercount;
  tds[0].querySelector("span").innerHTML= ubootcount;
}

function computershoot(tablespieler, scoreboardspieler) {
  setTimeout(function() {
    var shotposition = randomTarget();
    var td = tablespieler.querySelector('td[data-pos="' + shotposition + '"]');
    var dataId = parseInt(td.getAttribute("data-id"));
    td.setAttribute('data-id', dataId + 2);
    render(tablespieler, false);
    ships = updateData(shotposition, ships);
    updateScoreboard(scoreboardspieler, ships);
    if (updateStatus(dataId)) {
      computershoot(tablespieler, scoreboardspieler);
    }
  }, 500);

}

function main(args) {
  createTable(args.tablespieler, 10, 10);
  createTable(args.tablegegner, 10, 10);
  schiffeerstellen(args.tablespieler, ships);
  schiffeerstellen(args.tablegegner, shipsKI);
  updateScoreboard(args.scoreboardgegner, shipsKI);
  updateScoreboard(args.scoreboardspieler, ships);
  render(args.tablespieler, false);
  render(args.tablegegner, true);
}

ready(function() {
  var tablespieler = document.querySelector("#spieler table");
  var tablegegner = document.querySelector("#gegner table");
  var scoreboardgegner = document.querySelector("#gegner .scoreboard table");
  var scoreboardspieler = document.querySelector("#spieler .scoreboard table");
  main({
    "tablespieler": tablespieler,
    "tablegegner": tablegegner,
    "scoreboardgegner": scoreboardgegner,
    "scoreboardspieler": scoreboardspieler
  });
  // tablespieler.addEventListener("click", function() {
  //   schiessen(event, tablespieler, false);
  // });
  tablegegner.addEventListener("click", function() {
    if(event.target && event.target.nodeName == "TD") {
      var td = event.target;
      var dataId = parseInt(td.getAttribute('data-id'));
      var shotposition = parseInt(td.getAttribute('data-pos'));
      if (dataId < 2){
        td.setAttribute('data-id', dataId + 2);
        render(tablegegner, true);
        shipsKI = updateData(shotposition, shipsKI);
        updateScoreboard(scoreboardgegner, shipsKI);
        if (!updateStatus(dataId)) {
          computershoot(tablespieler, scoreboardspieler);
        }
      }
    }
  });
});
