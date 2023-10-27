const player = document.querySelector(".player");
const opponent = document.querySelector(".opponent");
const gameContainer = document.querySelector(".game-container");
console.log(gameContainer)
console.log(player)
console.log(opponent)


let playerX = player.offsetWidth
let playerY = player.offsetHeight
console.log(playerX)
let playerZ = 100;
// let playerPosition = player.getAttribute("width");
// console.log(playerPosition);
let gameContainerWidth = gameContainer.offsetWidth
console.log(gameContainerWidth);
player.style.left = playerX + "px";
player.style.top = playerY + "px";





document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && playerX > -60) {
    playerX -= 10;
  } else if (event.key === "ArrowRight" && playerX + playerY < gameContainerWidth) {
    playerX += 10;
  } else if (event.key === "ArrowUp"){
    playerZ += 10;
  } else if (event.key === "ArrowDown"){
    playerZ -= 10;
  }

  player.style.left = playerX + "px";
});