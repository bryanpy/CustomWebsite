var canvas = document.getElementById("canvas-one");
canvas.style.background = "rgb(20, 19, 31)"
var context = canvas.getContext("2d");

var mouseX = -1;
var mouseY = -1;
var mousePoints = []

setInterval(() => {
    mousePoints.shift()
},12)

setInterval(() => {
    context.fillStyle = "rgb(20, 19, 31)"
    context.fillRect(0, 0, 1500, 700)
    context.beginPath()
    context.strokeStyle = "#ffffff"
    context.lineWidth = 10
    context.lineCap = "round"
    if (mousePoints[0]){
        context.moveTo(mousePoints[0].x, mousePoints[0].y)
        for (let index = 0; index < mousePoints.length; index++){
            // context.strokeStyle = mousePoints[index].color
            context.lineTo(mousePoints[index].x, mousePoints[index].y)
        }
        // context.closePath()
        // context.fill()
    }
    context.stroke()
}, 1)

document.onmousemove = function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
    if(mouseX)
        mousePoints.push({ x: mouseX, y: mouseY, color: context.strokeStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"})
}



// var timmer = 0

// timmer += 1
// var delDur = document.getElementById("durSlider").value
// if(timmer >= delDur){
    //     mousePoints.shift()
    //     timmer=1
    // }