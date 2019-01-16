var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
var snake, dir, headX, headY, foodX, foodY;
var size = 20;
var timer = null;

function Start() {
    headX = 0;
    headY = 0;
    snake = [[headX, headY]];
    dir = 'right';
    ctx.clearRect(0, 0, c.width, c.height);
    clearInterval(timer);
    drawSnake();
    ctx.save();
    drawFood();
    ctx.restore();
    timer = setInterval(function () {
        move();
    }, 500)
}

function drawFood() {
//画板上显示食物
    foodX = size * Math.floor(Math.random()*10);
    foodY = size *Math.floor(Math.random()*10);
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, size, size);
}

function drawSnake() {
    ctx.fillStyle = 'black';
    ctx.fillRect(headX, headY, size, size);
    switch (dir) {
        case "up":
            drawBody(headX, headY + size, headX, headY + 2 * size);
            break;
        case "right":
            drawBody(headX - size, headY, headX - 2 * size, headY);
            break;
        case "down":
            drawBody(headX, headY - size, headX, headY - 2 * size);
            break;
        case "left":
            drawBody(headX + size, headY, headX + 2 * size, headY);
            break;
    }

}

function drawBody(x1, y1, x2, y2) {
    ctx.fillRect(x1, y1, size, size);
    ctx.fillRect(x2, y2, size, size);
    snake.push([x1, y1]);
    snake.push([x2, y2]);
}

function move() {
    switch (dir) {
        case "up":
            headY -= size;
            break;
        case "right":
            headX += size;
            break;
        case "down":
            headY += size;
            break;
        case "left":
            headX -= size;
            break;
    }
    if (headX > c.width - size || headY > c.height - size || headX < 0 || headY < 0) {
        alert('撞墙了');
        clearInterval(timer);
    }
    moveStep(headX, headY);
}

function moveStep(x, y) {
    ctx.style = "black";
    ctx.fillRect(x, y, size, size);
    var newSnake = [[x, y]];
    snake = newSnake.concat(snake);
    console.log(snake);
    if (eatFood() === false) {
        var snakeTail = snake.pop();
        ctx.clearRect(snakeTail[0], snakeTail[1], size, size);
    }
}

document.onkeydown = function (e) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var code = e.keyCode;
    switch (code) {
        case 38 :
            dir = "up";
            break;
        case 39 :
            dir = "right";
            break;
        case 40 :
            dir = "down";
            break;
        case 37 :
            dir = "left";
            break;
    }
};

function eatFood() {
    if (headX == foodX && headY == foodY) {
        ctx.fillStyle = "block";
        ctx.fillRect(foodX, foodY, size, size);
        drawFood();
        console.log(1)
        return true;
    }
    return false;
}

