const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");

// Variables to track drawing state
let drawing = false;
let tool = "line";
let startX, startY;

// Event listeners for mouse events
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    ctx.beginPath();
    if (tool === "line") {
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

// Update the tool based on the selected radio button
const tools = document.querySelectorAll('input[name="tool"]');
tools.forEach((toolOption) => {
    toolOption.addEventListener("change", (e) => {
        tool = e.target.value;
    });
});

// Implement shape drawing logic
canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    if (tool === "line") {
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (tool === "rectangle") {
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;
        ctx.rect(startX, startY, width, height);
        ctx.stroke();
    } else if (tool === "circle") {
        const radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
});
// Set drawing color from color picker
const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("input", (e) => {
    ctx.strokeStyle = e.target.value;
});

// Clear canvas button functionality
const clearButton = document.getElementById("clear-canvas");
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Initialize default drawing color
ctx.strokeStyle = colorPicker.value;
