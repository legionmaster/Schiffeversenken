export class Spielfeld {
  /**
   * [updateData description]
   * @param  {[type]} shotposition [description]
   * @param  {[type]} ships        [description]
   * @param  {[type]} firstHit     [description]
   * @return {[type]}              [description]
   */
  updateData(shotposition, ships, firstHit = []) {
    ships.map(function(ship) {
        var newpos = ship.position.filter(function(pos) {
            return pos !== shotposition;
        });
        ship.position = newpos;
    });
    var newShips = ships.filter(function(elem) {
        if (elem.position.length > 0) {
          return elem;
        }
        alert("Schiff zerstört!");
        firstHit = [];
    });
    return [newShips, firstHit];
  }
/**
 * Das feld wird je nach data-id gerendert.
 * @param  {HTML-Element} table  Es ist die Tabelle die gerendert werden soll
 * @param  {BOOL} gegner Wenn der wert true ist sollen die schiffe zu sehen sein und wenn false dann nicht.
 */
  render(table, gegner) {
    var tds = table.getElementsByTagName('td');
    // Der loop durchläuft alle td´s und setzt die CSS Klasse entsprechend der Data-id
    for (var i = 0; i < tds.length; i++) {
      var dataId = parseInt(tds[i].getAttribute("data-id"));
      switch (dataId) {
        case 0:
          tds[i].setAttribute("class", "wasser");
          break;
        case 1:
          if (!gegner) {
            tds[i].setAttribute("class", "schiff");
          } else {
            tds[i].setAttribute("class", "wasser");
          }
          break;
        case 2:
          tds[i].setAttribute("class", "daneben");
          break;
        case 3:
          tds[i].setAttribute("class", "treffer");
          break;
        default:
      }
    }
  }

  /**
   * Erstellt eine HTML Tabelle mit x Reihen(tr) und y Spalten(td)
   * @param  {HTML-Element} table Die HTML Tabelle, die mit TRs und TDs gefüllt wird.
   * @param  {Number} x     Die Anzahl der Table-Rows (tr)
   * @param  {Number} y     Die Anzahl der Table-Data (td)
   */
  createTable(table, x, y) {
    // Zählervariable, gibt die Nummer für das
    // data-pos Attribut.
    var count = 0;
    // Äußerer Loop erstellt die Table-Rows, entsprechend der Anzahl x.
    for (var i=0; i < x; i++) {
      // Bei jedem durchlauf wird eine neue tr Variable erstellt,
      // die ein neues tr-HTML-Element enthält.
      var tr = document.createElement("tr");
      // Innerer Loop erstellt jeweils ein TD und fügt es an das oben erstellte
      // TR dran.
      for(var j=0; j < y; j++) {
        // Bei jedem durchlauf wird eine neue td Variable erstellt,
        // die ein neues td-HTML-Element enthält.
        var td = document.createElement("td");
        // das td bekommt ein data-id Attribut mit default-Wert 0
        td.setAttribute("data-id", "0");
        //
        td.setAttribute("data-pos", count);
        tr.appendChild(td);
        count++;
      }
      table.appendChild(tr);
    }
  }
}
