export class Ki {
  constructor(){
    this.posArray = [];
    for (var i = 0; i < 100 ; i++) {
      this.posArray.push(i);
    }
  }

  randomTarget() {
    var index = Math.floor(Math.random() * this.posArray.length);
    var target = this.posArray[index];
    this.posArray.splice(index, 1);
    return parseInt(target);
  }

  computershoot(tablespieler, scoreboardspieler) {
    setTimeout(function() {
      var shotposition = randomTarget();
      var td = tablespieler.querySelector('td[data-pos="' + shotposition + '"]');
      var dataId = parseInt(td.getAttribute("data-id"));
      td.setAttribute('data-id', dataId + 2);
      render(tablespieler, false);
      ships = updateData(shotposition, ships);
      updateScoreboard(scoreboardspieler, ships);
      if (updateStatus(dataId)) {
        computershoot(tablespieler, scoreboardspieler);
      }
    }, 500);
  }
}
