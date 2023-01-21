'use strict';

const scores = document.querySelectorAll('span');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const canvasX = canvas.width;
const canvasY = canvas.height;

const speed = 30;

let ballX = canvasX / 2;
let ballY = canvasY / 2;

let ballXDirection = 1;
let ballYDirection = -1;

let ballRadius = 12;
let ballSpeed = 4;

let scorePlayer = 0;
let scorePlayer2 = 0;

let paddle1 = {
  width: 25,
  height: 100,
  x: 10,
  y: 10
};

let paddle2 = {
  width: 25,
  height: 100,
  x: canvasX - 25 - 10,
  y: canvasY - 100 - 10
};

function draw(ballX, ballY) {
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvasX, canvasY);

  ctx.fillStyle = 'white';
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = 'white';
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.fill();
}

function moveBall() {
  if (ballY <= 0 + ballRadius) {
    ballYDirection = 1;
  } else if (ballY >= canvasY - ballRadius) {
    ballYDirection = -1;
  }

  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}

function checkCollision() {
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius;
      ballXDirection *= -1;
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius;
      ballXDirection *= -1;
    }
  }
}

function score() {
  if (ballX <= 0 + ballRadius) {
    scorePlayer++;
    scores[0].innerHTML = scorePlayer;
    ballX = canvasX / 2;
    ballY = canvasY / 2;
  } else if (ballX >= canvasX - ballRadius) {
    scorePlayer2++;
    scores[1].innerHTML = scorePlayer2;
    ballX = canvasX / 2;
    ballY = canvasY / 2;
  }

  if (scorePlayer == 5 || scorePlayer2 == 5) {
    scorePlayer = 0;
    scorePlayer2 = 0;
    scores[0].innerHTML = 0;
    scores[1].innerHTML = 0;
    paddle1 = {
      width: 25,
      height: 100,
      x: 10,
      y: 10
    };

    paddle2 = {
      width: 25,
      height: 100,
      x: canvasX - 25 - 10,
      y: canvasY - 100 - 10
    };
  }
}

addEventListener('keydown', event => {
  if (event.key == 'w' && paddle1.y > 0) {
    paddle1.y -= speed;
  } else if (event.key == 's' && paddle1.y < canvasY - paddle1.height) {
    paddle1.y += speed;
  }

  if (event.key == 'ArrowUp' && paddle2.y > 0) {
    paddle2.y -= speed;
  } else if (event.key == 'ArrowDown' && paddle2.y < canvasY - paddle2.height) {
    paddle2.y += speed;
  }
});

function animate() {
  requestAnimationFrame(animate);
  draw(ballX, ballY);
  moveBall();
  checkCollision();
  score();
}

animate();
