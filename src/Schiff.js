export class Schiff {
  constructor() {
    this.ships = [
      {'name': 'schlachtschiff', 'position': [15, 16, 17, 18, 19]},
      {'name': 'kreuzer', 'position': [34, 35, 36, 37]},
      {'name': 'kreuzer', 'position': [76, 77, 78, 79]},
      {'name': 'zerstörer', 'position': [0, 1, 2]},
      {'name': 'zerstörer', 'position': [91, 92, 93]},
      {'name': 'zerstörer', 'position': [51, 52, 53]},
      {'name': 'u-boot', 'position': [63, 64]},
      {'name': 'u-boot', 'position': [67, 68]},
      {'name': 'u-boot', 'position': [86, 87]},
      {'name': 'u-boot', 'position': [82, 83]}
    ];

    this.shipsKI = [
      {'name': 'schlachtschiff', 'position': [15, 16, 17, 18, 19]},
      {'name': 'kreuzer', 'position': [34, 35, 36, 37]},
      {'name': 'kreuzer', 'position': [76, 77, 78, 79]},
      {'name': 'zerstörer', 'position': [0, 1, 2]},
      {'name': 'zerstörer', 'position': [91, 92, 93]},
      {'name': 'zerstörer', 'position': [51, 52, 53]},
      {'name': 'u-boot', 'position': [63, 64]},
      {'name': 'u-boot', 'position': [67, 68]},
      {'name': 'u-boot', 'position': [86, 87]},
      {'name': 'u-boot', 'position': [82, 83]}
    ];
  }

  updateShips(ships) {
    this.ships = ships;
  }

  updateShipsKi(shipsKI) {
    this.shipsKI = shipsKI;
  }
}
