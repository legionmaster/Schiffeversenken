import {Scoreboard} from './Scoreboard';
import {Spielfeld} from './Spielfeld';
import {Statusfeld} from './Statusfeld';
import {Schiff} from './Schiff';

var scoreboard = new Scoreboard();
var spielfeld = new Spielfeld();
var statusfeld = new Statusfeld();
var schiffe = new Schiff();

export class Ki {
  constructor() {
    this.posArray = [];
    for (var i = 0; i < 100 ; i++) {
      this.posArray.push(i);
    }
  }

  randomTarget() {
    var index = Math.floor(Math.random() * this.posArray.length);
    var target = this.posArray[index];
    this.posArray.splice(index, 1);
    return parseInt(target);
  }

  computershoot(tablespieler, scoreboardspieler) {
    setTimeout(function() {
      var shotposition = this.randomTarget();
      var td = tablespieler.querySelector('td[data-pos="' + shotposition + '"]');
      var dataId = parseInt(td.getAttribute("data-id"));
      td.setAttribute('data-id', dataId + 2);
      spielfeld.render(tablespieler, false);
      schiffe.updateShips(spielfeld.updateData(shotposition, schiffe.ships));
      scoreboard.updateScoreboard(scoreboardspieler, schiffe.ships);
      if (statusfeld.updateStatus(dataId)) {
        this.computershoot(tablespieler, scoreboardspieler);
      }
    }.bind(this), 500);
  }
}
