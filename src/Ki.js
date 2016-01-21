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
      td.setAttribute('data-id', dataId + 2);
      spielfeld.render(tablespieler, false);
      var data = spielfeld.updateData(shotposition, schiffe.ships,this.firstHit);
      schiffe.updateShips(data[0]);
      this.firstHit = data[1];
      scoreboard.updateScoreboard(scoreboardspieler, schiffe.ships);
      // Wenn der Schuss ein Treffer war...
      if (statusfeld.updateStatus(dataId)) {
        // ...und der Schuss ein Zufallsschuss oder ein weiterer gezielter Schuss war
        if (this.isRandomTarget ||
            (!this.isRandomTarget && this.firstHit.length > 0)) {
          // füge die getroffene Position dem firstHit-Array hinzu
          this.firstHit.push(shotposition);
        }
        // ...schiesst die KI nochmal
        this.computershoot(tablespieler, scoreboardspieler);
      // Wenn der Schuss ein Fehlschuss war...
      } else {
        // ...und es ein Zufallsschuss war
        if (this.isRandomTarget) {
          // vergiss alle getroffenen Felder
          this.firstHit = [];
        }
        // ...außerdem wechsele die Schussrichtung
        // und gebe Bescheid, dass ein Richtungswechsel
        // stattgefunden hat.
        if (this.direction === "right") {
          this.direction ="left";
          this.directionchange = true;
        } else {
          this.direction ="right";
          this.directionchange = true;
        }
      }
      this.bistdudran = false;
    }.bind(this), 500);
  }
}
