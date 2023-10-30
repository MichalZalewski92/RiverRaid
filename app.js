const grid = document.querySelector('.grid')
let currentShooterIndex = 202
let resultDisplay = document.querySelector('.result')
let width = 15
let direction = 1
let invadersID
let goingRight = true
let aliensRemoved = []
let results = 0
let startTime = null
let gameDuration = 0;


for (let i = 0; i < 450; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for (let i = 0 ; i < alienInvaders.length; i ++){
        if (!aliensRemoved.includes(i)){
            squares[alienInvaders[i]].classList.add('invader')
        }      
    }
}

draw()

function removeInvaders(){
    for (let i =0 ; i < alienInvaders.length; i ++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}

squares[currentShooterIndex].classList.add('shooter')
startGame()

function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break
        case 'ArrowRight':
            if (currentShooterIndex % width < width -1) currentShooterIndex += 1
            break
    }
squares[currentShooterIndex].classList.add('shooter')

}
document.addEventListener('keydown', moveShooter)


function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
    removeInvaders()

    if (rightEdge && goingRight ){
        for ( let i = 0; i < alienInvaders.length; i ++){
            alienInvaders[i] += width +1
            direction = -1
            goingRight = false

        }
    }

    if (leftEdge && !goingRight){
        for (let i =0 ; i < alienInvaders.length; i++ ){
            alienInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }
    for ( let i = 0; i < alienInvaders.length; i ++){
        alienInvaders[i] += direction
    }
   draw()

   if (squares[currentShooterIndex].classList.contains('invader', 'shooter')){
       endGame()
    alert('Game Over')
    clearInterval(invadersID)
   }
   for (let i =0 ; i < alienInvaders.length; i ++){
    if(alienInvaders[i] > squares.length ){
        endGame()
        alert("GAME OVER")
        clearInterval(invadersID)
    }
   }

   if (aliensRemoved.length === alienInvaders.length){
       endGame()
    alert(`You win! You scored ${results} points in ${gameDuration} seconds`)
    clearInterval(invadersID)
   }

}
invadersID = setInterval(moveInvaders, 600)

function shoot(e){
    let laserID
    let currentLaserIndex = currentShooterIndex
    function moveLaser(){
        squares[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add('laser')

        if (squares[currentLaserIndex].classList.contains('invader')){
            squares[currentLaserIndex].classList.remove('laser')
            squares[currentLaserIndex].classList.remove('invader')
            squares[currentLaserIndex].classList.add('boom')

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'),50)
            clearInterval(laserID)

            const alienRemoval = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoval)
            results++
            document.querySelector('.result').innerHTML = `Score: ${results} points`;
            

        }
    }

    switch(e.key){
        case ' ':
            const audio = new Audio("sound/bulletSound.mp3");
            audio.play();
        laserID = setInterval(moveLaser,100)
        break

    }
}

document.addEventListener('keydown', shoot)


function updateGameDuration() {
    if (startTime !== null) {
        const currentTime = new Date().getTime();
        gameDuration = Math.floor((currentTime - startTime) / 1000);
        const hours = Math.floor(gameDuration / 3600);
        const minutes = Math.floor((gameDuration % 3600) / 60);
        const seconds = gameDuration % 60;
        const formattedTime = `${String(hours).padStart(2, '0')}:
                                        ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.querySelector('.game-duration').innerHTML = `Game Time: ${formattedTime}`;
    }
}

function startGame() {
    startTime = new Date().getTime();
    sound()
}

function endGame() {
    if (startTime !== null) {
        clearInterval(timerInterval);
    }
}

function sound() {
    let gameSound = new Audio("sound/gameMusic.mp3");
    gameSound.autoplay = true;
    gameSound.loop = true;
    document.getElementById("musicStop").onclick = function () { gameSound.pause(); };
    document.getElementById("musicPlay").onclick = function () { gameSound.play(); };
}

const timerInterval = setInterval(updateGameDuration, 1000);


