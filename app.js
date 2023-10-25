const player = document.getElementById("player");


let playerX = 375;
let playerY = 500;
player.style.left = playerX + "px";
player.style.top = playerY + "px";


window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    playerX -= 10;
  } else if (event.key === "ArrowRight") {
    playerX += 10;
  }
  player.style.left = playerX + "px";
});