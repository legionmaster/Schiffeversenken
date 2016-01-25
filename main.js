import "babel-polyfill";
import {Scoreboard} from './Scoreboard';
import {Spielfeld} from './Spielfeld';
import {Statusfeld} from './Statusfeld';
import {Schiff} from './Schiff';
import {Spieler} from './Spieler';
import {Ki} from './Ki';

var scoreboard = new Scoreboard();
var spielfeld = new Spielfeld();
var statusfeld = new Statusfeld();
var player = new Spieler();
var ki = new Ki(player);

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var schiffstypen = [
  ["schlachtschiff", 1, 5],
  ["kreuzer", 2, 4],
  ["zerstörer", 3, 3],
  ["uboot", 4, 2]
];

function* schiffeplatzieren() {
  for (let schiffstyp of schiffstypen) {
    for (var i = 0; i < schiffstyp[1]; i++) {
      yield schiffstyp;
    }
  }
}

function createPosition(length, startPoint) {
  var position = [parseInt(startPoint)];
  for (var i = 1; i < length; i++) {
    position.push(parseInt(startPoint) + i);
  }
  return position;
}

ready(function() {
  var tablespieler = document.querySelector("#spieler table");
  var tablegegner = document.querySelector("#gegner table");
  var scoreboardgegner = document.querySelector("#gegner .scoreboard table");
  var scoreboardspieler = document.querySelector("#spieler .scoreboard table");

  spielfeld.createTable(tablespieler, 10, 10);
  spielfeld.createTable(tablegegner, 10, 10);

  var kiSchiffstyp = ki.gen.next();
  ki.checkPosition(kiSchiffstyp.value[2], kiSchiffstyp.value[0]);
  scoreboard.updateScoreboard(scoreboardgegner, ki.schiffe);
  spielfeld.render(tablespieler, false);
  spielfeld.render(tablegegner, true);

  var gen = schiffeplatzieren();
  var message = gen.next();
  statusfeld.setStatus(message.value[0] + " setzen!");

  // Mit jedem Klick setzt der Spieler das entsprechende Schiff
  tablespieler.addEventListener("click", function(event) {
    if (!message.done) {
      var position = createPosition(message.value[2], event.target.getAttribute("data-pos"))
      player.schiffesetzen(new Schiff(message.value[0], message.value[2], position), tablespieler.querySelectorAll("td"));
      message = gen.next();
      scoreboard.updateScoreboard(scoreboardspieler, player.schiffe);
      spielfeld.render(tablespieler, false);
      if (typeof message.value !== 'undefined') {
        statusfeld.setStatus(message.value[0] + " setzen!");
      } else {
        statusfeld.setStatus("Start!");
      }
    } else {
      statusfeld.setStatus("Start!");
      scoreboard.updateScoreboard(scoreboardspieler, player.schiffe);
    }
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
          var data = spielfeld.updateData(shotposition, ki.schiffe);
          ki.updateSchiffe(data[0]);
          scoreboard.updateScoreboard(scoreboardgegner, ki.schiffe);
          if (!statusfeld.updateStatus(dataId)) {
            ki.computershoot(tablespieler, scoreboardspieler);
          }
        }
      }
    }
  });
});
