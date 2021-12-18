const { body } = document,
  activeToolEl = document.querySelector("#active-tool"),
  brushColorBtn = document.querySelector("#brush-color"),
  brushIcon = document.querySelector("#brush"),
  brushSize = document.querySelector("#brush-size"),
  brushSlider = document.querySelector("#brush-slider"),
  bucketColorBtn = document.querySelector("#bucket-color"),
  eraser = document.querySelector("#eraser"),
  clearCanvasBtn = document.querySelector("#clear-canvas"),
  saveStorageBtn = document.querySelector("#save-storage"),
  loadStorageBtn = document.querySelector("#load-storage"),
  clearStorageBtn = document.querySelector("#clear-storage"),
  downloadBtn = document.querySelector("#download");

// Global Variables
const canvas = document.createElement("canvas");
canvas.id = "canvas";
const context = canvas.getContext("2d");
let currentSize = 10;
let bucketColor = "#FFFFFF";
let currentColor = "#A51DAB";
let isEraser = false;
let isMouseDown = false;
let drawnArray = [];

// Formatting Brush Size
function displayBrushSize() {
  if (brushSlider.value < 10) {
    brushSize.textContent = `0${brushSlider.value}`;
  } else {
    brushSize.textContent = brushSlider.value;
  }
}

// Setting Brush Size
brushSlider.addEventListener("change", () => {
  currentSize = brushSlider.value;
  displayBrushSize();
});

// Setting Brush Color
brushColorBtn.addEventListener("change", () => {
  isEraser = false;
  currentColor = `#${brushColorBtn.value}`;
});

// Setting Background Color
bucketColorBtn.addEventListener("change", () => {
  bucketColor = `#${bucketColorBtn.value}`;
  createCanvas();
  restoreCanvas();
});

// Eraser
eraser.addEventListener("click", () => {
  isEraser = true;
  brushIcon.style.color = "white";
  eraser.style.color = "black";
  activeToolEl.textContent = "Eraser";
  currentColor = bucketColor;
  currentSize = 50;
});

// Switch back to Brush
function switchToBrush() {
  isEraser = false;
  activeToolEl.textContent = "Brush";
  brushIcon.style.color = "black";
  eraser.style.color = "white";
  currentColor = `#${brushColorBtn.value}`;
  currentSize = 10;
  brushSlider.value = 10;
  displayBrushSize();
}
// Event Listener
brushIcon.addEventListener("click", switchToBrush);

// Create Canvas
function createCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;
  context.fillStyle = bucketColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  body.appendChild(canvas);
  switchToBrush();
}

// Draw what is stored in DrawnArray
function restoreCanvas() {
  for (let i = 1; i < drawnArray.length; i++) {
    context.beginPath();
    context.moveTo(drawnArray[i - 1].x, drawnArray[i - 1].y);
    context.lineWidth = drawnArray[i].size;
    context.lineCap = "round";
    if (drawnArray[i].eraser) {
      context.strokeStyle = bucketColor;
    } else {
      context.strokeStyle = drawnArray[i].color;
    }
    context.lineTo(drawnArray[i].x, drawnArray[i].y);
    context.stroke();
  }
}

// Clear Canvas
clearCanvasBtn.addEventListener("click", () => {
  createCanvas();
  drawnArray = [];
  // Active Tool
  activeToolEl.textContent = "Canvas Cleared";
  setTimeout(switchToBrush, 1500);
});

// Store Drawn Lines in DrawnArray
function storeDrawn(x, y, size, color, erase) {
  const line = {
    x,
    y,
    size,
    color,
    erase,
  };
  drawnArray.push(line);
}

// Get Mouse Position
function getMousePosition(e) {
  const boundaries = canvas.getBoundingClientRect();
  return {
    x: e.clientX - boundaries.left,
    y: e.clientY - boundaries.top,
  };
}

// Mouse Move
canvas.addEventListener("mousemove", (e) => {
  if (isMouseDown) {
    const currentPosition = getMousePosition(e);
    context.lineTo(currentPosition.x, currentPosition.y);
    context.stroke();
    storeDrawn(
      currentPosition.x,
      currentPosition.y,
      currentSize,
      currentColor,
      isEraser
    );
  } else {
    storeDrawn(undefined);
  }
});

// Mouse Up
canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// Mouse Down
canvas.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  const currentPosition = getMousePosition(e);
  context.moveTo(currentPosition.x, currentPosition.y);
  context.beginPath();
  context.lineWidth = currentSize;
  context.lineCap = "round";
  context.strokeStyle = currentColor;
});

// Save to Local Storage
saveStorageBtn.addEventListener("click", () => {
  localStorage.setItem("savedCanvas", JSON.stringify(drawnArray));
  // Active Tool
  activeToolEl.textContent = "Canvas Saved";
  setTimeout(switchToBrush, 1500);
});

// Load from Local Storage
loadStorageBtn.addEventListener("click", () => {
  if (localStorage.getItem("savedCanvas")) {
    drawnArray = JSON.parse(localStorage.savedCanvas);
    restoreCanvas();
    // Active Tool
    activeToolEl.textContent = "Canvas Loaded";
    setTimeout(switchToBrush, 1500);
  } else {
    activeToolEl.textContent = "No Canvas Found";
    setTimeout(switchToBrush, 1500);
  }
});

// Clear Local Storage
clearStorageBtn.addEventListener("click", () => {
  localStorage.removeItem("savedCanvas");
  // Active Tool
  activeToolEl.textContent = "Local Storage Cleared";
  setTimeout(switchToBrush, 1500);
});

// Download Image
downloadBtn.addEventListener("click", () => {
  downloadBtn.href = canvas.toDataURL("image/jpeg", 1);
  downloadBtn.download = "paint-example.jpeg";
  // Active Tool
  activeToolEl.textContent = "Image File Saved";
  setTimeout(switchToBrush, 1500);
});

// On Load
createCanvas();
