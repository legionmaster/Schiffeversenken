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
    this.isRandomTarget = true;
    this.posArray = [];
    this.firstHit = [];
    this.direction = "left";
    for (var i = 0; i < 100 ; i++) {
      this.posArray.push(i);
    }
  }

  randomTarget() {
    var index = Math.floor(Math.random() * this.posArray.length);
    var target = this.posArray[index];
    this.posArray.splice(index, 1);
    return parseInt(target);
    this.isRandomTarget = true;
  }

  notrandomTarget() {

    if (this.direction === "left") {
      var target = this.firstHit[this.firstHit.length - 1] - 1;
      var left = target.toString()[0];
      var right = (target + 1).toString()[0];
      this.isRandomTarget = "false";
      if(left < right) {
        this.direction = "right";
        target = this.firstHit[0] + 1;
      }
    }
    if(this.direction === "right"){
      var target = this.firstHit[this.firstHit.length - 1] + 1;
      var left = target.toString()[0];
      var right = (target - 1).toString()[0];
      if(left < right) {
        this.direction = "left";
        target = this.firstHit[0] - 1;
      }
    }
    return target;
  }

  computershoot(tablespieler, scoreboardspieler) {
    setTimeout(function() {
      if(this.firstHit.length > 0){
      var shotposition = this.notrandomTarget();
      } else {
        var shotposition = this.randomTarget();
      }
      var td = tablespieler.querySelector('td[data-pos="' + shotposition + '"]');
      var dataId = parseInt(td.getAttribute("data-id"));
      td.setAttribute('data-id', dataId + 2);
      spielfeld.render(tablespieler, false);
      var data = spielfeld.updateData(shotposition, schiffe.ships,this.firstHit);
      schiffe.updateShips(data[0]);
      this.firstHit = data[1];
      scoreboard.updateScoreboard(scoreboardspieler, schiffe.ships);
      if (statusfeld.updateStatus(dataId)) {
        this.firstHit.push(shotposition);
        this.computershoot(tablespieler, scoreboardspieler);
      } else {
        if(this.isRandomTarget === true){
        this.firstHit = [];
      }
        if (this.direction === "right") {
          this.direction ="left";
        } else {
          this.direction ="right";
        }
      }
    }.bind(this), 500);
  }
}
