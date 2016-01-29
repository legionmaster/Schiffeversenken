export class Spieler{
  constructor() {
    /** @type {Array} Beinhaltet die Schiffsobjekte */
    this.schiffe = [];
  }
// Ein Element wird zum Schiff Array hinzugefügt.
  schiffesetzen(schiff, tds) {
    this.schiffe.push(schiff);
    for (var j = 0; j < schiff.position.length; j++) {
      tds[schiff.position[j]].setAttribute("data-id", 1);
      // tds[schiff.position[j]].setAttribute("data-batt", (j + 1));
    }
    // Wenn die position des Schiffen 5 ist werden 5 Kästchen markiert.
    if (schiff.position.length === 5) {
      tds[schiff.position[0]].setAttribute("data-batt", 1);
      tds[schiff.position[1]].setAttribute("data-batt", 2);
      tds[schiff.position[2]].setAttribute("data-batt", 3);
      tds[schiff.position[3]].setAttribute("data-batt", 4);
      tds[schiff.position[4]].setAttribute("data-batt", 5);
    }
// Wenn die position des Schiffen 4 ist werden 4 Kästchen markiert.
    if (schiff.position.length === 4) {
      tds[schiff.position[0]].setAttribute("data-batt", 1);
      tds[schiff.position[1]].setAttribute("data-batt", 2);
      tds[schiff.position[2]].setAttribute("data-batt", 4);
      tds[schiff.position[3]].setAttribute("data-batt", 5);
    }
// Wenn die position des Schiffen 3 ist werden 3 Kästchen markiert.
    if (schiff.position.length === 3) {
      tds[schiff.position[0]].setAttribute("data-batt", 1);
      tds[schiff.position[1]].setAttribute("data-batt", 3);
      tds[schiff.position[2]].setAttribute("data-batt", 5);
    }
// Wenn die position des Schiffen 2 ist werden 2 Kästchen markiert.
    if (schiff.position.length === 2) {
      tds[schiff.position[0]].setAttribute("data-batt", 1);
      tds[schiff.position[1]].setAttribute("data-batt", 5);
    }

  }
  updateSchiffe(schiffe) {
    this.schiffe = schiffe;
  }
}
