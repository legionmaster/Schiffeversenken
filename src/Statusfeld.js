export class Statusfeld {
  updateStatus (dataId) {
    if (dataId + 2 == 2){
      var status = document.querySelector(".status h1");
      status.innerHTML = "Daneben!";
      status = document.querySelector(".status h2");
      status.innerHTML = "Nächster Spieler ist an der Reihe!"
      return false;
    }
    if (dataId + 2 == 3){
      var status = document.querySelector(".status h1");
      status.innerHTML = "Getroffen!";
      status = document.querySelector(".status h2");
      status.innerHTML = "Du bist wieder an der Reihe!"
      return true;
    }
  }
}
