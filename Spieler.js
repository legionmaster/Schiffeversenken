export class Spieler{
  constructor(ki = null){
    this.schiffe = [];
    this.ki = ki;
  }
  schiffesetzen(schiff){
    this.schiffe.push(schiff);
  }
  updateSchiffe(schiffe) {
    this.schiffe = schiffe;
  }
}
