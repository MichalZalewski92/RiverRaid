const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");


let playerX = 375;
let playerY = 500;
let isShooting = false;
player.style.left = playerX + "px";
player.style.top = playerY + "px";



function shoot() {
    if (!isShooting) {
      isShooting = true;
      const bullet = document.createElement("div");
      bullet.className = "bullet";
      bullet.style.left = playerX + playerWidth / 2 - 2.5 + "px";
      bullet.style.bottom = "50px";
      gameContainer.appendChild(bullet);

      const bulletMoveInterval = setInterval(() => {
        const bulletBottom = parseInt(bullet.style.bottom) || 0;
        bullet.style.bottom = bulletBottom + 10 + "px";

        if (bulletBottom >= gameContainer.clientHeight) {
          gameContainer.removeChild(bullet);
          isShooting = false;
          clearInterval(bulletMoveInterval);
        }
      }, 1000 / 60);
    }
  }

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    playerX -= 10;
  } else if (event.key === "ArrowRight") {
    playerX += 10;
  }
  player.style.left = playerX + "px";
});