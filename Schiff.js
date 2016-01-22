export class Schiff {
  constructor(typ,laenge,position) {
    this.typ = typ;
    this.laenge = laenge;
    this.position = position;

    this.shipsKI = [
      {"typ": "schlachtschiff", "position": [15, 16, 17, 18, 19]},
      {"typ": "kreuzer", "position": [34, 35, 36, 37]},
      {"typ": "kreuzer", "position": [76, 77, 78, 79]},
      {"typ": "zerstörer", "position": [0, 1, 2]},
      {"typ": "zerstörer", "position": [91, 92, 93]},
      {"typ": "zerstörer", "position": [51, 52,53 ]},
      {"typ": "uboot", "position": [63, 64]},
      {"typ": "uboot", "position": [67, 68]},
      {"typ": "uboot", "position": [86, 87]},
      {"typ": "uboot", "position": [82, 83]}
    ];
  }

  updateShips(ships) {
    this.ships = ships;
  }

  updateShipsKi(shipsKI) {
    this.shipsKI = shipsKI;
  }
}
