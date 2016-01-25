import "babel-polyfill";
import {Scoreboard} from './Scoreboard';
import {Spielfeld} from './Spielfeld';
import {Statusfeld} from './Statusfeld';
import {Schiff} from './Schiff';
import {Spieler} from './Spieler';

var scoreboard = new Scoreboard();
var spielfeld = new Spielfeld();
var statusfeld = new Statusfeld();

export class Ki extends Spieler {
  constructor(player) {
    super();
    this.player = player;
    this.bistdudran = false;
    this.directionchange = false;
    this.isRandomTarget = true;
    this.posArray = [];
    this.firstHit = [];
    this.direction = "left";
    for (var i = 0; i < 100 ; i++) {
      this.posArray.push(i);
    }
    this.schiffstypen = [
      ["schlachtschiff", 1, 5],
      ["kreuzer", 2, 4],
      ["zerstörer", 3, 3],
      ["uboot", 4, 2]
    ];
    this.gen = this.schiffeplatzieren();
    this.counter = 0;
  }

  *schiffeplatzieren() {
    for (let schiffstyp of this.schiffstypen) {
      for (var i = 0; i < schiffstyp[1]; i++) {
        yield schiffstyp;
      }
    }
  }

  createPosition(length, startPoint) {
    var position = [parseInt(startPoint)];
    for (var i = 1; i < length; i++) {
      position.push(parseInt(startPoint) + i);
    }
    return position;
  }

  checkPosition(length, typ) {
    this.counter++;
    var tds = document.querySelectorAll("#gegner table td");
    var startPosition = Math.floor(Math.random() * 100);
    var lastPosition = startPosition + length - 1;
    var error = true;
    var first = startPosition.toString()[0];
    var last = lastPosition.toString()[0];
    var lengthfirst = startPosition.toString().length;
    var lengthlast = lastPosition.toString().length;

    if (lengthfirst === lengthlast && first===last) {
      error = false;
      if (tds[startPosition].getAttribute("data-id") === "1") {
        error = true;
      }
      if (tds[lastPosition].getAttribute("data-id") === "1") {
        error = true;
      }
    }
    if (this.counter > 1000) {
      alert('Konnte nicht alle Schiffe platzieren. Bitte die Seite neuladen');
      return;
    }

    if (error) {
      this.checkPosition(length, typ);
    } else {
      var position = this.createPosition(length, startPosition);
      this.schiffesetzen(new Schiff(typ, length, position), tds);
      var schiffstyp = this.gen.next();
      if (!schiffstyp.done) {
        this.checkPosition(schiffstyp.value[2], schiffstyp.value[0]);
      }
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
        var data = spielfeld.updateData(shotposition, this.player.schiffe, this.firstHit);
        this.player.updateSchiffe(data[0]);
        this.firstHit = data[1];
        scoreboard.updateScoreboard(scoreboardspieler, this.player.schiffe);
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
