var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');


const storeName = "PPName";
const storeScore = "PPMaxScore";
const rod1Name = "player 1";
const rod2Name = "player 2";


let score,
    maxScore,
    movement,
    rod,
    ballSpeedX = 3,
    ballSpeedY = 3;

let gameOn = false;

let windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;


    function displayAlert(message) {
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        // Create message element
        const messageEl = document.createElement('p');
        messageEl.innerText = message;
        modal.appendChild(messageEl);
        
        // Position modal in center of screen
        modal.style.top = (window.innerHeight - modal.offsetHeight) / 2 + 'px';
        modal.style.left = (window.innerWidth - modal.offsetWidth) / 2 + 'px';
        
        // Append modal to body
        document.body.appendChild(modal);
        
        // Remove modal after 3 seconds
        setTimeout(function() {
          modal.remove();
        }, 3000);
      }
      
      // Usage
      
      

(function () {
    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);

    if (rod === "null" || maxScore === "null") {
        displayAlert("This is the first time you are playing this game. LET'S START");
        maxScore = 0;
        rod = "Rod1"
    } else {
        displayAlert(rod + " has maximum score of " + maxScore * 100);
    }

    resetBoard(rod);
})();



function resetBoard(rodName) {

    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';


    // Lossing player gets the ball
    if (rodName === rod2Name) {
        ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
        ballSpeedY = 3;
    } else if (rodName === rod1Name) {
        ball.style.top = (rod2.offsetTop - rod2.offsetHeight) + 'px';
        ballSpeedY = -3;
    }

    score = 0;
    gameOn = false;

}



function storeWin(rod, score) {

    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storeScore, maxScore);
        
    }

    clearInterval(movement);
    resetBoard(rod);

    displayAlert(rod + " wins with a score of " + (score * 100) + ". Max score is: " + (maxScore * 100));

}


  


window.addEventListener('keypress', function () {
    let rodSpeed = 25;

    let rodRect = rod1.getBoundingClientRect();


    if (event.code === "KeyD" && ((rodRect.x + rodRect.width) < window.innerWidth)) {
        rod1.style.left = (rodRect.x) + rodSpeed + 'px';
        rod2.style.left = rod1.style.left;
    } else if (event.code === "KeyA" && (rodRect.x > 0)) {
        rod1.style.left = (rodRect.x) - rodSpeed + 'px';
        rod2.style.left = rod1.style.left;
    }
   
});
const playButton = document.getElementById('play-btn');
playButton.addEventListener('click', function() {
  if (!gameOn) {
    gameOn = true;
    var ballRect = ball.getBoundingClientRect();
    var ballX = ballRect.x;
    var ballY = ballRect.y;
    var ballDia = ballRect.width;

    var rod1Height = rod1.offsetHeight;
    var rod2Height = rod2.offsetHeight;
    var rod1Width = rod1.offsetWidth;
    var rod2Width = rod2.offsetWidth;

    movement = setInterval(function () {
      // Move ball 
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      var rod1X = rod1.getBoundingClientRect().x;
      var rod2X = rod2.getBoundingClientRect().x;

      ball.style.left = ballX + 'px';
      ball.style.top = ballY + 'px';

      if ((ballX + ballDia) > windowWidth || ballX < 0) {
        ballSpeedX = -ballSpeedX; // Reverses the direction
      }

      // It specifies the center of the ball on the viewport
      var ballPos = ballX + ballDia / 2;

      // Check for Rod 1
      if (ballY <= rod1Height) {
        ballSpeedY = -ballSpeedY; // Reverses the direction
        score++;

        // Check if the game ends
        if ((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))) {
          storeWin(rod2Name, score);
        }
      }

      // Check for Rod 2
      else if ((ballY + ballDia) >= (windowHeight - rod2Height)) {
        ballSpeedY = -ballSpeedY; // Reverses the direction
        score++;

        // Check if the game ends
        if ((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))) {
          storeWin(rod1Name, score);
        }
      }

    }, 10);
  }
});
  
