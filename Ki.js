import {Scoreboard} from './Scoreboard';
import {Spielfeld} from './Spielfeld';
import {Statusfeld} from './Statusfeld';

var scoreboard = new Scoreboard();
var spielfeld = new Spielfeld();
var statusfeld = new Statusfeld();

export class Ki {
  constructor(spieler) {
    this.spieler = spieler;
    this.bistdudran = false;
    this.directionchange = false;
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
    this.isRandomTarget = true;
    this.posArray.splice(index, 1);
    return parseInt(target);
  }

  notrandomTarget() {
    this.isRandomTarget = false;
    var target;
    if (this.direction === "left") {
      if (this.directionchange) {
        target = this.firstHit[0] - 1;
        this.directionchange = false;
      } else {
        target = this.firstHit[this.firstHit.length - 1] - 1;
      }
      var index = this.posArray.indexOf(target);
      var left = target.toString()[0];
      var right = (target + 1).toString()[0];
      // Hier wird die Richtung geändert! Links nach Rechts.
      if (left < right || index === -1) {
        this.direction = "right";
        target = this.firstHit[0] + 1;
      }
    }
    if(this.direction === "right"){
      if (this.directionchange) {
        target = this.firstHit[0] + 1;
        this.directionchange = false;
      } else {
        target = this.firstHit[this.firstHit.length - 1] + 1;
      }
      var index = this.posArray.indexOf(target);
      var left = target.toString()[0];
      var right = (target - 1).toString()[0];
      // Hier wird die Richtung geändert! Rechts nach Links.
      if(left < right || index === -1) {
        this.direction = "left";
        target = this.firstHit[0] - 1;
      }
    }
    var index = this.posArray.indexOf(target);
    this.posArray.splice(index, 1);
    return target;
  }

  computershoot(tablespieler, scoreboardspieler) {
    this.bistdudran = true;
    setTimeout(function() {
      if (this.firstHit.length > 0){
        var shotposition = this.notrandomTarget();
      } else {
        var shotposition = this.randomTarget();
      }
      var td = tablespieler.querySelector('td[data-pos="' + shotposition + '"]');
      var dataId = parseInt(td.getAttribute("data-id"));
      if (dataId < 2) {
        td.setAttribute('data-id', dataId + 2);
        spielfeld.render(tablespieler, false);
        var data = spielfeld.updateData(shotposition, this.spieler.schiffe, this.firstHit);
        this.spieler.updateSchiffe(data[0]);
        console.log(this.spieler.schiffe);
        this.firstHit = data[1];
        scoreboard.updateScoreboard(scoreboardspieler, this.spieler.schiffe);
        if (statusfeld.updateStatus(dataId)) {
          if (this.isRandomTarget || (!this.isRandomTarget && this.firstHit.length > 0)) {
            this.firstHit.push(shotposition);
          }
          this.computershoot(tablespieler, scoreboardspieler);
        } else {
          if (this.isRandomTarget) {
            this.firstHit = [];
          }
          if (this.direction === "right") {
            this.direction ="left";
            this.directionchange = true;
          } else {
            this.direction ="right";
            this.directionchange = true;
          }
        }
      } else {
        alert("Das Feld wurde schon beschossen");
      }
      this.bistdudran = false;
    }.bind(this), 500);
  }
}
