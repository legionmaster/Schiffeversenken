import 'babel-polyfill';
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
// Sorgt dafür dass das javascript erst ausgefüghrt wird wenn das gesamte HTML Dokument geladen ist.
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/**
 * Ein Array mit einzelnen Schiffstypen, die selbst ein Array sind
 * und folgende Werte enthalten:
 * die Bezeichnung des Schiffes, die Anzahl der Schiffe von diesem Typ und
 * die Länge dieses Schiffstypen.
 * @type {Array}
 */
var schiffstypen = [
  ['schlachtschiff', 1, 5],
  ['kreuzer', 2, 4],
  ['zerstörer', 3, 3],
  ['uboot', 4, 2]
];

/**
 * Eine Generator-Funktion, die einen Schiffstypen zurückgibt
 * @yield {Array} ein Done-Flag und ein Schiffstyp. Achtung yield, kein return
 */
function* schiffeplatzieren() {
  // Für jeden Schiffstyp im Array Schiffstypen...
  for (let schiffstyp of schiffstypen) {
    // ...Solange i kleiner als die Anzahl Variable des schiffstyps ist dann i++.
    for (var i = 0; i < schiffstyp[1]; i++) {
      // Gibt den aktuellen Schiffstyp zurück und pausiert die generator Funktion.
      yield schiffstyp;
    }
  }
}
// Erstellt die start Position.
/**
 * Erstellt die start Position
 * @param  {Number} length     Die Länge des Schiffs
 * @param  {Number} startPoint Die Position des ersten Kästchens des Schiffs
 * @return {Array}             Positionen auf denen das Schiff liegt.
 */
function createPosition(length, startPoint) {
  // Variable mit der Startposition wird deklariert.
  var position = [parseInt(startPoint, 10)];
  // Variable i wird deklariert und wenn sie kleiner als die länge des schiffes ist i++.
  for (var i = 1; i < length; i++) {
    // Neues Element wird hinzugefügt.
    position.push(parseInt(startPoint, 10) + i);
  }
  // Die position wird returnt.
  return position;
}
// Bekommt die ersten Elemente der Klassen.
ready(() => {
  var tablespieler = document.querySelector('#spieler table');
  var tablegegner = document.querySelector('#gegner table');
  var scoreboardgegner = document.querySelector('#gegner .scoreboard table');
  var scoreboardspieler = document.querySelector('#spieler .scoreboard table');
  // Speilfeld für Gegner und Spieler wird erstellt.
  spielfeld.createTable(tablespieler, 10, 10);
  spielfeld.createTable(tablegegner, 10, 10);
  // tdsSpieler Variable wird deklariert und bekommt das erste Elemnt von der td Klasse.
  var tdsSpieler = tablespieler.querySelectorAll('td');
// kiSchiffstyp Variable wird deklariert.
  var kiSchiffstyp = ki.gen.next();
  // Die Position wird geprüft.
  ki.checkPosition(kiSchiffstyp.value[2], kiSchiffstyp.value[0]);
  // Das Scoreboard wird geupdated.
  scoreboard.updateScoreboard(scoreboardgegner, ki.schiffe);
  // Die Spielfelder werden gerendert.
  spielfeld.render(tablespieler, false);
  spielfeld.render(tablegegner, true);
  // Generator wird erstellt. Damit pausiert werden kann.
  var gen = schiffeplatzieren();
  // Variable enthält A
  var message = gen.next();
  statusfeld.setStatus(message.value[0] + ' setzen!');

  // Mit jedem Klick setzt der Spieler das entsprechende Schiff
  tablespieler.addEventListener('click', (event) => {
    if (!message.done) {
      // Die Variable position wird deklariert und bekommt die Value des Klassen Attributes von data-pos.
      var position = createPosition(message.value[2], event.target.getAttribute('data-pos'));
      player.schiffesetzen(new Schiff(message.value[0], message.value[2], position), tdsSpieler);
      message = gen.next();
      // Scoreboard wird geupdated.
      scoreboard.updateScoreboard(scoreboardspieler, player.schiffe);
      // Das Spielfeld vom Spiler wird gerendert.
      spielfeld.render(tablespieler, false);
      // Wenn nicht gesetzt wurde...
      if (typeof message.value !== 'undefined') {
        // ...Soll im Statusfeld setzen stehen.
        statusfeld.setStatus(message.value[0] + ' setzen!');
        // Wenn nicht soll Start im Statusfeld stehen.
      } else {
        statusfeld.setStatus('Start!');
      }
    } else {
      statusfeld.setStatus('Start!');
      scoreboard.updateScoreboard(scoreboardspieler, player.schiffe);
    }
  });
//  Mouseover Funktion wird erstellt.
  tablespieler.addEventListener('mouseover', (event) => {
    var pos = parseInt(event.target.getAttribute('data-pos'), 10);
    var id = parseInt(event.target.getAttribute('data-id'), 10);
    if (id === 0) {
      for (var i = 0; i < message.value[2]; i++) {
        // Wenn man mit der Muas über einem Fled ist kommt die Klasse markiert ins Spiel.
        tdsSpieler[pos + i].classList.add('markiert');
        tdsSpieler[pos + i].classList.remove('wasser');
      }
    }
  });
// Mouseout Funktion wird erstellt.
  tablespieler.addEventListener('mouseout', (event) => {
    var pos = parseInt(event.target.getAttribute('data-pos'), 10);
    var id = parseInt(event.target.getAttribute('data-id'), 10);
    if (id === 0) {
      for (var i = 0; i < message.value[2]; i++) {
        // Wenn man von dem Wasserfeld weg ist soll es nicht mehr markiert sein.
        tdsSpieler[pos + i].classList.add('wasser');
        tdsSpieler[pos + i].classList.remove('markiert');
      }
    }
  });
// Wenn geklickt wird und kein Schiff getroffen wird ist der andere dran.
  tablegegner.addEventListener('click', () => {
    if (!ki.bistdudran) {
      if (event.target && event.target.nodeName === 'TD') {
        var td = event.target;
        var dataId = parseInt(td.getAttribute('data-id'), 10);
        var shotposition = parseInt(td.getAttribute('data-pos'), 10);
        if (dataId < 2) {
          // Wo man hin geschossen hat erhöht sich die Data-id +2.
          td.setAttribute('data-id', dataId + 2);
          // Spielfeld wird neu gerendert bei jedem klick.
          spielfeld.render(tablegegner, true);
          var data = spielfeld.updateData(shotposition, ki.schiffe);
          // Schiffe und Scoreboard wird bei jedem klick geupdated.
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
