const game = document.querySelector(".game");

const gameWidth = 800;
const gameHeight = 600;
const playerWidth = 150;
const playerHeight = 150;

const keyLeft = 37;
const keyRight = 39;
const keyUp = 38;
const keyDown = 40;
const keySpace = 32;

const bulletFrequency = 50;

const gameStatus = {
  leftPressed: 0,
  rightPressed: 0,
  upPressed: 0,
  downPressed: 0,
  spacePressed: 0,
  playerX: 0,
  playerY: 0,
  bulletFrequency: 0,
  bullets: []
}

function setPosition($el, x, y) {
  $el.style.transform = `translate(${x}px, ${y}px)`;
}

function createPlayer(game) {
  gameStatus.playerX = gameWidth / 2 - playerWidth / 2;
  gameStatus.playerY = gameHeight - 120
  const player = document.createElement("img");
  player.src = "images/aircraft.png";
  player.className = "player";
  game.appendChild(player);
  setPosition(player, gameStatus.playerX, gameStatus.playerY);
}

function createBullet(game, x, y) {
  const bullet = document.createElement("img")
  bullet.src = "images/bullet.png";
  bullet.className = "bullet"
  game.appendChild(bullet);
  const $bullet = {x, y, bullet}
  gameStatus.bullets.push($bullet)
  setPosition(bullet, x, y)
  const audio = new Audio("sound/bulletSound.mp3")
  audio.play()
}
function range(v, min, max) {
  if (v < min) {
    return min;
  }   else if (v > max) {
    return max;
  }   else {
    return v;
  }
}

function updatePlayer(game) {
  if (gameStatus.leftPressed) {
    gameStatus.playerX -= 5;
  }
  if (gameStatus.rightPressed) {
    gameStatus.playerX += 5;
  }
  if (gameStatus.upPressed) {
    gameStatus.playerY -= 5;
  }
  if (gameStatus.downPressed) {
    gameStatus.playerY += 5;
  }
  if (gameStatus.spacePressed && gameStatus.bulletFrequency <= 0) {
    createBullet(game, gameStatus.playerX + 72, gameStatus.playerY + 60);
    gameStatus.bulletFrequency = bulletFrequency;
  }
  if (gameStatus.bulletFrequency > 0) {
    gameStatus.bulletFrequency -= 5;
  }

  gameStatus.playerX = range(gameStatus.playerX, -50, gameWidth - 100);
  gameStatus.playerY = range(gameStatus.playerY, -50, gameHeight - 100);
  const player = document.querySelector(".player");
  setPosition(player, gameStatus.playerX, gameStatus.playerY);
}

function updateBullet(game) {
  const bullets = gameStatus.bullets;
  for (let i = 0; i < bullets.length; i++) {
    const $bullet = bullets[i];
    $bullet.y -= 5
    if ($bullet.y < 0) {
      eraseBullet(game, $bullet);
    }
    setPosition($bullet.bullet, $bullet.x, $bullet.y)
  }
  gameStatus.bullets = gameStatus.bullets.filter(e => !e.isRemoved);
}

function eraseBullet(game, $bullet) {
  game.removeChild($bullet.bullet);
  $bullet.isRemoved = true
}
function update() {
  // const game = document.querySelector(".game");
  updatePlayer(game)
  updateBullet(game)
  // createBullet()
  window.requestAnimationFrame(update);
}

function onKeyDown(e) {
  if (e.keyCode === keyLeft) {
    gameStatus.leftPressed = true;
  } else if (e.keyCode === keyRight) {
    gameStatus.rightPressed = true;
  } else if (e.keyCode === keyUp) {
    gameStatus.upPressed = true;
  } else if (e.keyCode === keyDown) {
    gameStatus.downPressed = true;
  } else if (e.keyCode === keySpace) {
    gameStatus.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === keyLeft) {
    gameStatus.leftPressed = false;
  } else if (e.keyCode === keyRight) {
    gameStatus.rightPressed = false;
  } else if (e.keyCode === keyUp) {
    gameStatus.upPressed = false;
  } else if (e.keyCode === keyDown) {
    gameStatus.downPressed = false;
  } else if (e.keyCode === keySpace) {
    gameStatus.spacePressed = false;
  }
}



function init() {
  let gameSound = new Audio("sound/gameMusic.mp3");
  gameSound.autoplay = true;
  gameSound.loop = true;
  document.getElementById("musicStop").onclick = function () { gameSound.pause(); };
  document.getElementById("musicPlay").onclick = function () { gameSound.play(); };
  // document.addEventListener("keydown", function () {
  //   gameSound.play();
  // });
  createPlayer(game)
}


init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);


// let playerX = player.offsetWidth
// let playerY = player.offsetHeight
// console.log(playerX)
// let playerZ = 100;
// // let playerPosition = player.getAttribute("width");
// // console.log(playerPosition);
// // let gameContainerWidth = gameContainer.offsetWidth
// // console.log(gameContainerWidth);
// player.style.left = playerX + "px";
// player.style.top = playerY + "px";


// document.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowLeft" && playerX > -60) {
//     playerX -= 10;
//   } else if (event.key === "ArrowRight" && playerX + playerY < gameContainerWidth) {
//     playerX += 10;
//   } else if (event.key === "ArrowUp"){
//     playerZ += 10;
//   } else if (event.key === "ArrowDown"){
//     playerZ -= 10;
//   }
//
//   player.style.left = playerX + "px";
// });