import {Scoreboard} from './Scoreboard';
import {Spielfeld} from './Spielfeld';
import {Statusfeld} from './Statusfeld';
import {Schiff} from './Schiff';
import {Ki} from './Ki';

var scoreboard = new Scoreboard();
var spielfeld = new Spielfeld();
var statusfeld = new Statusfeld();
var ki = new Ki();
var schiffe = new Schiff();


function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function main(args) {
  spielfeld.createTable(args.tablespieler, 10, 10);
  spielfeld.createTable(args.tablegegner, 10, 10);
  spielfeld.schiffeerstellen(args.tablespieler, schiffe.ships);
  spielfeld.schiffeerstellen(args.tablegegner, schiffe.shipsKI);
  scoreboard.updateScoreboard(args.scoreboardgegner, schiffe.shipsKI);
  scoreboard.updateScoreboard(args.scoreboardspieler, schiffe.ships);
  spielfeld.render(args.tablespieler, false);
  spielfeld.render(args.tablegegner, true);
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

  tablegegner.addEventListener("click", function() {
    if(!ki.bistdudran){
      if(event.target && event.target.nodeName == "TD") {
        var td = event.target;
        var dataId = parseInt(td.getAttribute('data-id'));
        var shotposition = parseInt(td.getAttribute('data-pos'));
        if (dataId < 2){
          td.setAttribute('data-id', dataId + 2);
          spielfeld.render(tablegegner, true);
          var data = spielfeld.updateData(shotposition, schiffe.shipsKI);
          schiffe.updateShipsKi(data[0]);
          scoreboard.updateScoreboard(scoreboardgegner, schiffe.shipsKI);
          if (!statusfeld.updateStatus(dataId)) {
            ki.computershoot(tablespieler, scoreboardspieler);
          }
        }
      }
    }
  });
});
