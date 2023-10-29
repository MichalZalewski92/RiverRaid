const game = document.querySelector(".game");

const gameWidth = 800;
const gameHeight = 600;
const playerWidth = 150;
const playerHeight = 150;

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
  bullets: [],
  enemies: [],
  enemyBullets: []
}

function setPosition($el, x, y) {
  $el.style.transform = `translate(${x}px, ${y}px)`;
}

function intersect (r1, r2) {
  return !(
      r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top
  );
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

function createOpponent(game) {
  const minDistance = 50;
  const x = Math.random() * (gameWidth - playerWidth);
  const y = Math.random() * (gameHeight - playerHeight);
  const isTooClose = gameStatus.enemies.some((enemy) => {
    const distance = Math.sqrt((x - enemy.x) ** 2 + (y - enemy.y) ** 2);
    return distance < minDistance;
  });
  if (!isTooClose && gameStatus.enemies.length < 10) {
    const opponent = document.createElement("img");
    opponent.src = "images/opponent.png";
    opponent.className = "opponent";
    game.appendChild(opponent);
    const enemy = {
      x,
      y,
      opponent
    };
    gameStatus.enemies.push(enemy);
    setPosition(opponent, x, y);
  }
}


function updateOpponent (game) {

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
    const r1 = $bullet.bullet.getBoundingClientRect();
    const enemies = gameStatus.enemies;
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      if (enemy.isRemoved) continue;
      const r2 = enemy.opponent.getBoundingClientRect();
      if (intersect(r1, r2)) {
        eraseBullet(game, $bullet);
        eraseOpponent(game, enemy);
        createOpponent(game);
        break;
      }
    }
  }
  gameStatus.bullets = gameStatus.bullets.filter(e => !e.isRemoved);
}

function eraseBullet(game, $bullet) {
  game.removeChild($bullet.bullet);
  $bullet.isRemoved = true
}

function eraseOpponent(game, enemy) {
  game.removeChild(enemy.opponent);
  enemy.isRemoved = true

}

function update() {
  updatePlayer(game)
  updateBullet(game)
  createOpponent(game)
  // updateOpponent(game)

  window.requestAnimationFrame(update);
}

function onKeyDown(e) {
  // console.log(e);
  if (e.keyCode === 37 || e.keyCode === 65) {
    gameStatus.leftPressed = true;
  } else if (e.keyCode === 39 || e.keyCode === 68) {
    gameStatus.rightPressed = true;
  } else if (e.keyCode === 38 || e.keyCode === 87) {
    gameStatus.upPressed = true;
  } else if (e.keyCode === 40 || e.keyCode === 83) {
    gameStatus.downPressed = true;
  } else if (e.keyCode === 32) {
    gameStatus.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === 37 || e.keyCode === 65) {
    gameStatus.leftPressed = false;
  } else if (e.keyCode === 39 || e.keyCode === 68) {
    gameStatus.rightPressed = false;
  } else if (e.keyCode === 38 || e.keyCode === 87) {
    gameStatus.upPressed = false;
  } else if (e.keyCode === 40 || e.keyCode === 83) {
    gameStatus.downPressed = false;
  } else if (e.keyCode === 32) {
    gameStatus.spacePressed = false;
  }
}

function sound() {
  let gameSound = new Audio("sound/gameMusic.mp3");
  gameSound.autoplay = true;
  gameSound.loop = true;
  document.getElementById("musicStop").onclick = function () { gameSound.pause(); };
  document.getElementById("musicPlay").onclick = function () { gameSound.play(); };
}


function init() {
  sound()
  createPlayer(game)
  // createOpponent(game)

}


init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);

