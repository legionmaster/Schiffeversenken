export class Scoreboard {
  updateScoreboard(scoreboardtable, ships) {
    var tds = scoreboardtable.querySelectorAll("td:first-child");
    var kreuzercount = 0
    var zerstoerercount = 0
    var schlachtschiffcount = 0
    var ubootcount = 0
    for (var i = 0; i < ships.length; i++) {
      ships[i]
      switch (ships[i].name){
        case("schlachtschiff"):
          schlachtschiffcount++;
          break;
        case("zerstörer"):
          zerstoerercount++;
          break;
        case("kreuzer"):
          kreuzercount++;
          break;
        case("u-boot"):
          ubootcount++;
          break;
        default:
      }
    }
    tds[3].querySelector("span").innerHTML= schlachtschiffcount;
    tds[2].querySelector("span").innerHTML= kreuzercount;
    tds[1].querySelector("span").innerHTML= zerstoerercount;
    tds[0].querySelector("span").innerHTML= ubootcount;
  }
}
