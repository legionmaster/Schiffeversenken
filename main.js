import {Scoreboard} from './Scoreboard';
import {Spielfeld} from './Spielfeld';
import {Statusfeld} from './Statusfeld';
import {ships, shipsKI} from './Schiff';
import {Ki} from './Ki';

var scoreboard = new Scoreboard();
var spielfeld = new Spielfeld();
var schiff = new Schiff();
var statusfeld = new Statusfeld();
var ki = new Ki(schiff);

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
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
