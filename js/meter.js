var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var mouseIsPressed = false;
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);
var clickX = 0;
var clickY = 0;
var progressMulti = 2;

var clickBoxX = canvas.width/2;
var clickBoxY = canvas.height-150;
var clickBoxLength = 50;

var outlineBuffer = 50;
var h = 300;
var w = 56;
var w2 = 50;
var outlineX = canvas.width - outlineBuffer - w;
var outlineY = canvas.height - outlineBuffer - h;
var innerX = canvas.width - outlineBuffer - w2 - ((w - w2)/2);
var innerY = canvas.height - outlineBuffer;

function draw() {
    drawRects();
}

function drawRects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.rect(clickBoxX, clickBoxY, clickBoxLength, clickBoxLength);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(outlineX, outlineY, w, h);
    ctx.strokeStyle = "rgba(255, 0, 0, 2.0)";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(innerX, innerY, w2, canvas.height - outlineBuffer - innerY);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}


function mouseDownHandler(e) {
    mouseIsPressed = true;
    clickX = e.clientX - canvas.offsetLeft;
    clickY = e.clientY - canvas.offsetTop;
}

function mouseUpHandler(e) {
    mouseIsPressed = false;
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(mouseIsPressed && isInClickBox(relativeX, relativeY)) {
        addProgress(relativeX, relativeY);
    }
}

function isInClickBox(x, y) {
    return ((x >= clickBoxX && x <= clickBoxX + clickBoxLength) && (y >= clickBoxY && y <= clickBoxY + clickBoxLength)) 
}

function addProgress(x, y) {
    var dist = Math.sqrt((x - clickX) + (y - clickY));
    if(innerY - (dist*progressMulti) >= outlineY) {
        innerY -= (dist*progressMulti);
    }
    clickX = x;
    clickY = y;
}

function reset() {
    clickX = 0;
    clickY = 0;
    innerY = canvas.height - outlineBuffer;
    drawRects();
}

setInterval(draw, 10);
