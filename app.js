const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

// Variables to track drawing state
let drawing = false;
let tool = 'line'; 
let startX, startY;

// Event listeners for mouse events
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    
    ctx.beginPath();
    if (tool === 'line') {
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});
