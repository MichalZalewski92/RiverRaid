const player = document.querySelector(".player");
const gameContainer = document.querySelector(".game-container");
console.log(gameContainer)
console.log(player)


// let playerX = 300;
// let playerY = 450;
// let playerZ = 100;
let playerPosition = player.getAttribute("width");
console.log(playerPosition);
let gameContainerWidth = gameContainer.getAttribute("width");
console.log(gameContainerWidth);
// player.style.left = playerX + "px";
// player.style.top = playerY + "px";





document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && playerX > -60) {
    playerX -= 10;
  } else if (event.key === "ArrowRight" && playerX + playerPosition < gameContainerWidth) {
    playerX += 10;
  } else if (event.key === "ArrowUp"){
    playerZ += 10;
  } else if (event.key === "ArrowDown"){
    playerZ -= 10;
  }

//   player.style.left = playerX + "px";
});