// DOM elements
const body = document.body;
const colorCode = document.getElementById('colorCode');
const colorBtns = document.querySelectorAll('.color-btn');
const gradientBtn = document.getElementById('gradientBtn');
const pulseBtn = document.getElementById('pulseBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const randomBtn = document.getElementById('randomBtn');
const colorPicker = document.getElementById('colorPicker');
const applyCustomBtn = document.getElementById('applyCustom');

// Current state
let currentColor = '#3498db';
let gradientMode = false;
let pulseMode = false;
let rainbowMode = false;

// Initialize the app
function init() {
    // Set initial color
    setColor('#3498db');
    
    // Add event listeners
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.dataset.color;
            clearEffects();
            setColor(color);
        });
    });
    
    gradientBtn.addEventListener('click', toggleGradient);
    pulseBtn.addEventListener('click', togglePulse);
    rainbowBtn.addEventListener('click', toggleRainbow);
    randomBtn.addEventListener('click', setRandomColor);
    
    applyCustomBtn.addEventListener('click', () => {
        const customColor = colorPicker.value;
        clearEffects();
        setColor(customColor);
    });
    
    // Sync color picker with current color
    colorPicker.addEventListener('input', () => {
        colorPicker.style.backgroundColor = colorPicker.value;
    });
}

// Set color function
function setColor(color) {
    currentColor = color;
    body.style.backgroundColor = color;
    colorCode.textContent = color.toUpperCase();
    colorPicker.value = color;
    
    // Update color variables for effects
    document.documentElement.style.setProperty('--main-color', color);
    
    // Calculate a lighter version of the color for pulse effect
    const lighterColor = calculateLighterColor(color);
    document.documentElement.style.setProperty('--pulse-color', lighterColor);
}

// Toggle gradient mode
function toggleGradient() {
    clearEffects();
    gradientMode = !gradientMode;
    
    if (gradientMode) {
        const randomAngle = Math.floor(Math.random() * 360);
        const secondColor = getComplementaryColor(currentColor);
        
        body.style.background = `linear-gradient(${randomAngle}deg, ${currentColor}, ${secondColor})`;
        gradientBtn.textContent = "Disable Gradient";
        colorCode.textContent = "Gradient Mode";
    } else {
        body.style.background = currentColor;
        gradientBtn.textContent = "Gradient Mode";
        colorCode.textContent = currentColor.toUpperCase();
    }
}

// Toggle pulse effect
function togglePulse() {
    clearEffects();
    pulseMode = !pulseMode;
    
    if (pulseMode) {
        body.classList.add('pulse');
        pulseBtn.textContent = "Disable Pulse";
        colorCode.textContent = "Pulse Effect";
    } else {
        body.classList.remove('pulse');
        pulseBtn.textContent = "Pulse Effect";
        colorCode.textContent = currentColor.toUpperCase();
    }
}

// Toggle rainbow mode
function toggleRainbow() {
    clearEffects();
    rainbowMode = !rainbowMode;
    
    if (rainbowMode) {
        body.classList.add('rainbow');
        rainbowBtn.textContent = "Disable Rainbow";
        colorCode.textContent = "Rainbow Mode";
    } else {
        body.classList.remove('rainbow');
        rainbowBtn.textContent = "Rainbow Mode";
        colorCode.textContent = currentColor.toUpperCase();
    }
}

// Set random color
function setRandomColor() {
    clearEffects();
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setColor(randomColor);
}

// Clear all effects
function clearEffects() {
    // Reset UI elements
    body.classList.remove('pulse', 'rainbow');
    body.style.background = currentColor;
    
    // Reset buttons text
    gradientBtn.textContent = "Gradient Mode";
    pulseBtn.textContent = "Pulse Effect";
    rainbowBtn.textContent = "Rainbow Mode";
    
    // Reset mode flags
    gradientMode = false;
    pulseMode = false;
    rainbowMode = false;
}

// Helper function: Calculate a lighter version of a color
function calculateLighterColor(hex) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    // Make it lighter
    r = Math.min(255, r + 80);
    g = Math.min(255, g + 80);
    b = Math.min(255, b + 80);
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Helper function: Get complementary color
function getComplementaryColor(hex) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    
    // Invert the colors (255 - value)
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);