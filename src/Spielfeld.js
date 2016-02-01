export class Spielfeld {
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
      var status = document.querySelector('.status h2');
      status.innerHTML = 'Schiff zerstört!';
      firstHit = [];
    });
    return [newShips, firstHit];
  }

  schiffeerstellen(table, ships) {
    var tds = table.getElementsByTagName('td');
    for (var i = 0; i < ships.length; i++) {
      for (var j = 0; j < ships[i].position.length; j++) {
        tds[ships[i].position[j]].setAttribute('data-id', 1);
      }
    }
  }

  render(table, gegner) {
    var tds = table.getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++) {
      var dataId = parseInt(tds[i].getAttribute('data-id'), 10);
      switch (dataId) {
        case 0:
          tds[i].setAttribute('class', 'wasser');
          break;
        case 1:
          if (!gegner) {
            tds[i].setAttribute('class', 'schiff');
          } else {
            tds[i].setAttribute('class', 'wasser');
          }
          break;
        case 2:
          tds[i].setAttribute('class', 'daneben');
          break;
        case 3:
          tds[i].setAttribute('class', 'treffer');
          break;
        default:
      }
    }
  }

  createTable(table, x, y) {
    var count = 0;
    for (var i = 0; i < x; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < y; j++) {
        var td = document.createElement('td');
        td.setAttribute('data-id', '0');
        td.setAttribute('data-pos', count);
        tr.appendChild(td);
        count++;
      }
      table.appendChild(tr);
    }
  }
}
