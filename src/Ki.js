import 'babel-polyfill';
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
    this.direction = 'left';
    for (var i = 0; i < 100; i++) {
      this.posArray.push(i);
    }
    this.schiffstypen = [
      ['schlachtschiff', 1, 5],
      ['kreuzer', 2, 4],
      ['zerstörer', 3, 3],
      ['uboot', 4, 2]
    ];
    this.gen = this.schiffeplatzieren();
    this.counter = 0;
  }

  // Platzieren der Schiffe
  *schiffeplatzieren() {
    // Für jeden Schiffstyp im Array Schiffstypen...
    for (let schiffstyp of this.schiffstypen) {
      // ...Solange i kleiner als die Anzahl Variable des schiffstyps ist dann i++.
      for (var i = 0; i < schiffstyp[1]; i++) {
          // Gibt den aktuellen Schiffstyp zurück und pausiert die generator Funktion.
        yield schiffstyp;
      }
    }
  }
  /**
   * { function_description }
   *
   * @method createPosition
   * @param  {number} length     Die Länge des Schiffs
   * @param  {String} startPoint Der Index der Startposition
   * @return {Array}  Die berechneten Positionen des Schiffs, in Abhängigkeit
   *                  zur Startposition und Länge
   */
  createPosition(length, startPoint) {
    /**
     * Startposition
     *
     * @type   {Array}
     */
    var position = [parseInt(startPoint, 10)];
    // Variable i wird deklariert und wenn sie kleiner als die länge des
    // schiffes ist i++.
    for (var i = 1; i < length; i++) {
      // Neues Element wird hinzugefügt.
      position.push(parseInt(startPoint, 10) + i);
    }

    return position;
  }

  /**
   * Prüft ob die Positionen valide sind.
   *
   * @method checkPosition
   * @param  {number} length Die Länge des Schiffs
   * @param  {String} typ    Schiffstypbezeichnung
   */
  checkPosition(length, typ) {
    this.counter++;
    var tds = document.querySelectorAll('#gegner table td');
    var startPosition = Math.floor(Math.random() * 100);
    var lastPosition = startPosition + length - 1;
    var error = true;
    var first = startPosition.toString()[0];
    var last = lastPosition.toString()[0];
    var lengthfirst = startPosition.toString().length;
    var lengthlast = lastPosition.toString().length;

    if (lengthfirst === lengthlast && first === last) {
      error = false;
      if (tds[startPosition].getAttribute('data-id') === '1') {
        error = true;
      }
      if (tds[lastPosition].getAttribute('data-id') === '1') {
        error = true;
      }
    }
    // Wenn die Schiffe beim 1000 versuch nicht platziert werden konnten wird ein Alert ausgegeben.
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
// Generiert eine zufällige Schussposition
  randomTarget() {
    var index = Math.floor(Math.random() * this.posArray.length);
    var target = this.posArray[index];
    this.isRandomTarget = true;
    this.posArray.splice(index, 1);
    return parseInt(target, 10);
  }
// Generiert keine zufällige Schussposition.
  notrandomTarget() {
    this.isRandomTarget = false;
    let target;
    let index;
    let left;
    let right;

    if (this.direction === 'left') {
      target = this.firstHit[this.firstHit.length - 1] - 1;
      if (this.directionchange) {
        target = this.firstHit[0] - 1;
        this.directionchange = false;
      }

      index = this.posArray.indexOf(target);
      left = target.toString()[0];
      right = (target + 1).toString()[0];
      // Hier wird die Richtung geändert! Links nach Rechts.
      if (left < right || index === -1) {
        this.direction = 'right';
        target = this.firstHit[0] + 1;
      }
    }

    if (this.direction === 'right') {
      target = this.firstHit[this.firstHit.length - 1] + 1;
      if (this.directionchange) {
        target = this.firstHit[0] + 1;
        this.directionchange = false;
      }

      index = this.posArray.indexOf(target);
      left = target.toString()[0];
      right = (target - 1).toString()[0];
      // Hier wird die Richtung geändert! Rechts nach Links.
      if (left < right || index === -1) {
        this.direction = 'left';
        target = this.firstHit[0] - 1;
      }
    }
    index = this.posArray.indexOf(target);
    this.posArray.splice(index, 1);

    return target;
  }
//  Ki schiesst auf ein feld welches sie vorher überprft hatte ob die data id höher als 0 ist, weil wenn die data-id
//  höher wie 0 ist schießt sie auf ein anderes feld.
  computershoot(tablespieler, scoreboardspieler) {
    this.bistdudran = true;
    setTimeout(function() {
      var shotposition = this.randomTarget();
      if (this.firstHit.length > 0) {
        shotposition = this.notrandomTarget();
      }

      var td = tablespieler.querySelector('td[data-pos="' + shotposition + '"]');
      var dataId = parseInt(td.getAttribute('data-id'), 10);
      if (dataId < 2) {
        td.setAttribute('data-id', dataId + 2);
        spielfeld.render(tablespieler, false);
        var data = spielfeld.updateData(shotposition, this.player.schiffe, this.firstHit);
        this.player.updateSchiffe(data[0]);
        this.firstHit = data[1];
        scoreboard.updateScoreboard(scoreboardspieler, this.player.schiffe);
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
          if (this.direction === 'right') {
            this.direction = 'left';
            this.directionchange = true;
          } else {
            this.direction = 'right';
            this.directionchange = true;
          }
        }
      } else {
        alert('Das Feld wurde schon beschossen');
      }
      this.bistdudran = false;
    }.bind(this), 500);
  }
}
