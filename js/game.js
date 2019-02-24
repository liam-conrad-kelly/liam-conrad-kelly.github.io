var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-150;
var r = 100;
var dx = 2;
var dy = -2;
var img = new Image();
var mouseIsPressed = false;
img.src = "./resources/DVD_logo.svg";
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);


function draw() {
    drawBall();
    // determineDirection();
 //    x += dx;
 //    y += dy;
}

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, r, r);
    // ctx.beginPath();
    // ctx.arc(x, y, r, 0, Math.PI*2);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();
}

function determineDirection() {
    if((x + r >= canvas.width) || (x - r/2 <= r/2)) {
        dx = dx * -1;
    } 
    if((y + r >= canvas.height) || (y - r/2 <= r/2)) {
        dy = dy * -1;
    }
}

function mouseDownHandler(e) {
    mouseIsPressed = true;
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeX > 0 && relativeX < canvas.width) {
        x = relativeX - r/2;
    }
    if(relativeY > 0 && relativeY < canvas.height) {
        y = relativeY - r/2;
    }
}

function mouseUpHandler(e) {
    mouseIsPressed = false;
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeX > 0 && relativeX < canvas.width && mouseIsPressed == true) {
        x = relativeX - r/2;
    }
    if(relativeY > 0 && relativeY < canvas.height && mouseIsPressed == true) {
        y = relativeY - r/2;
    }
}

setInterval(draw, 10);
