export class Scoreboard {
  // Updatet das Scoreboard und zeigt an Wie viele Schiffsytpen es noch gibt.
  updateScoreboard(scoreboardtable, ships) {
    const tds = scoreboardtable.querySelectorAll('td:first-child');
    let kreuzercount = 0;
    let zerstoerercount = 0;
    let schlachtschiffcount = 0;
    let ubootcount = 0;
    let summe = 0;
    let i = 0;
    for (i; i < ships.length; i++) {
      switch (ships[i].typ) {
        case ('schlachtschiff'):
          schlachtschiffcount++;
          break;
        case ('zerstörer'):
          zerstoerercount++;
          break;
        case ('kreuzer'):
          kreuzercount++;
          break;
        case ('uboot'):
          ubootcount++;
          break;
        default:
      }
    }
    // Wenn alle Schiffe zerstört sind und das Scoreboard bei jedem 0 anzeigt
    // kommt ein Alert das das Spiel vorbei ist.
    tds[3].querySelector('span').innerHTML = schlachtschiffcount;
    tds[2].querySelector('span').innerHTML = kreuzercount;
    tds[1].querySelector('span').innerHTML = zerstoerercount;
    tds[0].querySelector('span').innerHTML = ubootcount;
    summe = kreuzercount + zerstoerercount + schlachtschiffcount + ubootcount;
    if (summe === 0) {
      alert('Spiel vorbei!');
      // Nach dem Alert wird die Seite neu geladen und eine neue Runde startet.
      window.open('http://localhost:8080', '_self');
    }
  }
}
