const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsFill");
const saveBtn = document.getElementById("jsSave");



const INITIAL_COLOR = "#2c2c2c";
const  CANVAS_SIZE_X= 800;
const CANVAS_SIZE_Y = 400;

canvas.width =CANVAS_SIZE_X;
canvas.height =CANVAS_SIZE_Y; 

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth =2.5;

let painting = false;
let filling = false;

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
  }
  
  function handleModeClick() {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
    }
  }
  

function startPainting() {
    painting = true;
    
}
function stopPainting() {
painting= false;
    
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  }

  function handleCanvasClick() {
    if (filling) {
      ctx.fillRect(0, 0, CANVAS_SIZE_X, CANVAS_SIZE_Y);
    }
  }
  
  
function handleCM(event) {
    event.preventDefault();
  }
  
  function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
  }

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );


  if (range) {
    range.addEventListener("input", handleRangeChange);
  }
  
  if (mode) {
    mode.addEventListener("click", handleModeClick);
  }
  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }