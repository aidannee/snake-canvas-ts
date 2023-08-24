let gameOn: boolean = true;

function toggleGameOn() {
  gameOn = !gameOn;
  if ((gameOn = false)) {
    gameOn = true;
  } else {
    gameOn = false;
  }
}

export { toggleGameOn, gameOn };
