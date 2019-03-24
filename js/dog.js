var parent = document.getElementById("canvasParent");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

fitToContainer(canvas, parent);

var fontSize = canvas.width/50;
ctx.font = fontSize + "px Varela Round";
var resetText = "RESET";

var dog1 = new Image();
var dog2 = new Image();
var dog3 = new Image();
var handOn = new Image();
var handOff = new Image();
dog1.src = "../resources/1_strip.png";
dog2.src = "../resources/2_strip.png";
dog3.src = "../resources/3_strip.png";
handOn.src = "../resources/handOn.png";
handOff.src = "../resources/handOff.png";

var imgObj1 = {
    'source': dog1,
    'current': 0,
    'total_frames': 5,
    'width': 1920,
    'height': 1080
};

var imgObj2 = {
    'source': dog2,
    'current': 0,
    'total_frames': 24,
    'width': 1920,
    'height': 1080
};

var imgObj3 = {
    'source': dog3,
    'current': 0,
    'total_frames': 40,
    'width': 1920,
    'height': 1080
};

// img_obj.source = dog1;

var mouseIsPressed = false;
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);
var clickX = 0;
var clickY = 0;
var cursorX = 0;
var cursorY = 0;
var progressMulti = 0.15;

//dog click box
var dogBoxWidth = canvas.width;
var dogBoxHeight = 0.5625 * dogBoxWidth;
var dogBoxX = canvas.width/2 - dogBoxWidth/2;
var dogBoxY = canvas.height/2 - dogBoxHeight/2;
console.log("x: " + dogBoxX + ", y: " + dogBoxY + ", width: " + dogBoxWidth + ", height: " + dogBoxHeight);

//progress meter shapes
var outlineBuffer = 50;
var h = 300;
var w = 56;
var w2 = 50;
var outlineX = canvas.width - outlineBuffer - w;
var outlineY = canvas.height - outlineBuffer - h;
var innerX = canvas.width - outlineBuffer - w2 - ((w - w2)/2);
var innerY = canvas.height - outlineBuffer;

function draw() {
    drawImages();
}

function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //add reset button
    // ctx.fillStyle = "black";
    // ctx.fillText(resetText, 10, 50);

    //ctx.drawImage(dog, dogBoxX, dogBoxY, dogBoxWidth, dogBoxHeight);
    draw_anim(ctx, dogBoxX, dogBoxY, imgObj3);
    draw_anim(ctx, dogBoxX, dogBoxY, imgObj2);
    draw_anim(ctx, dogBoxX, dogBoxY, imgObj1);



    //draw hand at cursor location, image source changes based on mouse button held down or not
    ctx.drawImage((mouseIsPressed ? handOn : handOff), cursorX, cursorY, dogBoxWidth/10, dogBoxWidth/10);

    //draw progress meter
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

    checkProgress();
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
    cursorX = e.clientX - canvas.offsetLeft;
    cursorY = e.clientY - canvas.offsetTop;
    if(mouseIsPressed && isInClickBox(cursorX, cursorY, dogBoxX, dogBoxY, dogBoxWidth, dogBoxHeight)) {
        addProgress(cursorX, cursorY);
    }
}

function isInClickBox(x, y, clickBoxX, clickBoxY, clickBoxWidth, clickBoxHeight) {
    return ((x >= clickBoxX && x <= clickBoxX + clickBoxWidth) && (y >= clickBoxY && y <= clickBoxY + clickBoxHeight)) 
}

function addProgress(x, y) {
    var dist = Math.sqrt(Math.pow((x - clickX), 2) + Math.pow((y - clickY), 2));
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

function fitToContainer(canvas, parent){
    canvas.width  = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
}

function draw_anim(context, x, y, iobj) { // context is the canvas 2d context.
    if (iobj.source != null)
        context.drawImage(iobj.source, 0, iobj.current * iobj.height,
                          iobj.width, iobj.height,
                          x, y, dogBoxWidth, dogBoxHeight);
    iobj.current = (iobj.current + 1) % iobj.total_frames;
                   // incrementing the current frame and assuring animation loop
}

function checkProgress() {
    var progressBarHeight = canvas.height - outlineBuffer - innerY;
    var maxHeight = h;
    var progress = progressBarHeight/maxHeight;
    if(progress >= 0.50 && imgObj1.source != null) {
        imgObj1.source = null;
    }
    if(progress >= 0.98 && imgObj2.source != null) {
        imgObj2.source = null;
    }
}

setInterval(draw, 33.3667000334); //29.97 FPS
