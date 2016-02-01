export class Statusfeld {
  updateStatus(dataId) {
    var status = document.querySelector('.status h1');
    if (dataId + 2 === 2) {
      status.innerHTML = 'Daneben!';
      status = document.querySelector('.status h2');
      status.innerHTML = 'Nächster Spieler ist an der Reihe!';
      return false;
    }
    if (dataId + 2 === 3) {
      status.innerHTML = 'Getroffen!';
      status = document.querySelector('.status h2');
      status.innerHTML = 'Du bist wieder an der Reihe!';
      return true;
    }
  }

  setStatus(text) {
    var status = document.querySelector('.status h1');
    status.innerHTML = text;
  }
}
