var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Aufgabe 1

const width = 20;
const height = 20;

var snake = [
  { x: 3, y: 2 },
  { x: 4, y: 2 },
  { x: 5, y: 2 },
];

var fruit = { x: 5, y: 5 };

var currentDirection = { x: -1, y: 0 };

// Aufgabe 2

function drawFruit(fruit) {
  ctx.fillStyle = "#538700";
  ctx.fillRect(fruit.x * width, fruit.y * height, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#D3D3D3";
  ctx.strokeRect(fruit.x * width, fruit.y * height, width, height);
}

function drawSnake(snake) {
  var head = snake[0];

  ctx.fillStyle = "#000000";
  ctx.fillRect(head.x * width, head.y * height, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#D3D3D3";
  ctx.strokeRect(head.x * width, head.y * height, width, height);

  for (var i = 1; i < snake.length; i++) {
    var snakeT = snake[i];

    ctx.fillStyle = "#00538E";
    ctx.fillRect(snakeT.x * width, snakeT.y * height, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#D3D3D3";
    ctx.strokeRect(snakeT.x * width, snakeT.y * height, width, height);
  }
}

function drawGameOver(points) {
  ctx.font = "50px Arial";
  ctx.fillStyle = "weiß";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);

  ctx.font = "25px Arial";
  ctx.fillText(points + " Punkte", canvas.width / 2, canvas.height / 2 + 30);
}

// Aufgabe 3
function fruitCollidesWithSnake(snake, fruit) {
  if (snake[0].x == fruit.x && snake[0].y == fruit.y) {
    return true;
  } else {
    return false;
  }
}

function randomCoordinatesOutsideSnake(snake) {
  var fruit = {
    x: randomPos(),
    y: randomPos(),
  };

  for (var i = 0; i < snake.length; i++) {
    if (fruit.x == snake[i].x && fruit.y == snake[i].y) {
      fruit = {
        x: randomPos(),
        y: randomPos(),
      };
    }
  }

  return fruit;
}

function randomPos() {
  return Math.floor(Math.random() * 20);
}

function snakeHeadCollidesWithSnake(snake) {
  var collided = false;
  for (var i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        return true;
    } else {
        collided = false;
    }
  }
  return collided;
}

function moveSnake(snake, currentDirection) {
  var head = snake[0];
  snake.pop();
  var newHead = {
    x: head.x + currentDirection.x,
    y: head.y + currentDirection.y,
  };
  snake.unshift(newHead);

  for (var i = 0; i < snake.length; i++) {
    if (
      snake[i].x < 0 ||
      snake[i].y < 0 ||
      snake[i].x >= 20 ||
      snake[i].y >= 20
    ) {
      snake[i].x = mod(snake[i].x, 20);
      snake[i].y = mod(snake[i].y, 20);
    }
  }
}

// Berechnet n modulo m
function mod(n, m) {
  return ((n % m) + m) % m;
}

// Aufgabe 4
var intervalID = setInterval(func, 150);

function func() {
  void ctx.clearRect(0, 0, 400, 400);
  drawFruit(fruit);
  drawSnake(snake);

  if (fruitCollidesWithSnake(snake, fruit)) {
    snake.push({
      x: snake[snake.length - 1].x + currentDirection.x,
      y: snake[snake.length - 1].y + currentDirection.y,
    });
    fruit = randomCoordinatesOutsideSnake(snake);
  }

  if (snakeHeadCollidesWithSnake(snake)) {
    clearInterval(intervalID);
    drawGameOver(snake.length - 3); //spiel beenden??
  }

  moveSnake(snake, currentDirection); //soll sich am Anfang nach links bewegen (var currentDirection [Z.18])
  directionChange; //defaultwert (currentDirection) nicht mit enthalten
}

document.body.addEventListener("keydown", directionChange);

function directionChange(event) {
  var head = snake[0];
  var second = snake[1];
  if (event.key == "ArrowLeft" && !(head.x > second.x))
    currentDirection = { x: -1, y: 0 };
  if (event.key == "ArrowRight" && !(head.x < second.x))
    currentDirection = { x: 1, y: 0 };
  if (event.key == "ArrowUp" && !(head.y > second.y))
    currentDirection = { x: 0, y: -1 };
  if (event.key == "ArrowDown" && !(head.y < second.y))
    currentDirection = { x: 0, y: 1 };
}
