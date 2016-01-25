export class Spieler{
  constructor() {
    this.schiffe = [];
  }
  schiffesetzen(schiff, tds) {
    this.schiffe.push(schiff);
    for (var j = 0; j < schiff.position.length; j++) {
      tds[schiff.position[j]].setAttribute("data-id", 1);
    }
  }
  updateSchiffe(schiffe) {
    this.schiffe = schiffe;
  }
}
