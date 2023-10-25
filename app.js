const player = document.getElementById("player");


let playerX = 300;
let playerY = 450;
player.style.left = playerX + "px";
player.style.top = playerY + "px";


document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    playerX -= 10;
  } else if (event.key === "ArrowRight") {
    playerX += 10;
  }
  player.style.left = playerX + "px";
});