document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('drawCross').addEventListener('click', drawCross);
document.getElementById('drawDiagonal').addEventListener('click', drawDiagonals);
document.getElementById('drawDiamond1').addEventListener('click', drawDiamond1);
document.getElementById('drawDiamond2').addEventListener('click', drawDiamond2);
document.getElementById('drawDiamond3').addEventListener('click', drawDiamond3);
document.getElementById('drawDiamond4').addEventListener('click', drawDiamond4);


document.getElementById('drawGrid3').addEventListener('click', drawGrid3);
document.getElementById('drawGrid7').addEventListener('click', drawGrid7);
document.getElementById('drawGrid15').addEventListener('click', drawGrid15);
document.getElementById('drawGrid31').addEventListener('click', drawGrid31);



document.getElementById('clearLines').addEventListener('click',clearLines);
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let img = new Image();
let lineWidth = 2;
let widthPx = 0;
let heightPx = 0;
let widthCm = 0;
let heightCm = 0;
const InchToCm = 2.54;


function handleImageUpload(event) {
    let reader = new FileReader();
    reader.onload = function(e) {
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.style.display = 'block';

            // Read EXIF metadata to get DPI
            EXIF.getData(img, function() {
                let xDpi = EXIF.getTag(this, 'XResolution') || 96; // Use 96 if not found
                let yDpi = EXIF.getTag(this, 'YResolution') || 96; // Use 96 if not found
                let dpi = (xDpi + yDpi) / 2; // Average DPI for horizontal and vertical
                canvas.dpi = dpi;
                // Call function to display dimensions with actual DPI
                getImageDimensions(img, dpi);
            });

        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

// Updated function to calculate and display dimensions using the DPI from EXIF
function getImageDimensions(img, dpi) {
    widthPx = img.width;
    heightPx = img.height;

    // Convert pixels to centimeters using the DPI value
    const widthCm = (widthPx / dpi) * InchToCm;
    const heightCm = (heightPx / dpi) * InchToCm;



    const dimensionsText = `
            Image dimensions:
            ${widthPx}px x ${heightPx}px<br>
            Approximate size in cm: ${widthCm.toFixed(2)}cm x ${heightCm.toFixed(2)}cm (DPI: ${dpi})
        `;

        // Display the dimensions in the HTML div
        document.getElementById('imageDimensions').innerHTML = dimensionsText;

    console.log(`Image dpi: ${dpi}PPI`);
    console.log(`Image dimensions in pixels: ${widthPx}px x ${heightPx}px`);
    console.log(`Image dimensions in centimeters: ${widthCm.toFixed(2)}cm x ${heightCm.toFixed(2)}cm (DPI: ${dpi})`);
}

function applyGrid() {
    console.log(`applyGrid triggered ${canvas.dpi} is canvas.dpi`);

    const spacingCm = parseInt(document.getElementById('gridSpacing').value, 10);

    if (isNaN(spacingCm) || spacingCm <= 0) {
        alert("Please enter a valid number for grid spacing in cm.");
        return;
    }

    // Ensure canvas DPI is available before calling the grid function
    if (canvas.dpi) {
        drawGridOverlay(canvas.dpi, spacingCm);
    } else {
        alert("Please upload an image first to determine DPI.");
    }
}
function drawGridOverlay(dpi, nCmSpacing) {
    console.log(`drawGridOverlay triggered with ${nCmSpacing}cm spacing for ${dpi}PPI dpi `);

    const spacingPx = (nCmSpacing / InchToCm) * dpi; // Convert cm to pixels
    const width = canvas.width;
    const height = canvas.height;

    // Draw grid
    ctx.beginPath();
    let lineColor = document.getElementById('lineColor').value;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor; // Semi-transparent black for the grid lines
    // Draw vertical lines
    for (let x = spacingPx; x < width; x += spacingPx) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    // Draw horizontal lines
    for (let y = spacingPx; y < height; y += spacingPx) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }

    ctx.stroke(); // Draw all the lines
    ctx.closePath();
    showDownloadLink();
}

function checkUserUploadedImage(){
    if (!img.src) {
        alert("Please upload an image first.");
        return;
    }
}

function clearLines(){
    ctx.drawImage(img, 0, 0); // Redraw the original image
    let downloadLink = document.getElementById('downloadLink');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.style.display = 'block'; // remove download link
}

function drawCross(){
    checkUserUploadedImage()
    grid(2);
    showDownloadLink();
}

function drawGrid3(){
    checkUserUploadedImage()
    grid(4);
    showDownloadLink();
}

function drawGrid7(){
    checkUserUploadedImage()
    grid(8);
    showDownloadLink();
}



function drawGrid15(){
    checkUserUploadedImage()
    grid(16);
    showDownloadLink();
}

function drawGrid31(){
    checkUserUploadedImage()
    grid(32);
    showDownloadLink();
}

function drawDiagonals() {
    checkUserUploadedImage();
    let lineColor = document.getElementById('lineColor').value;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    let width = canvas.width
    let height = canvas.height
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);

    ctx.stroke();
    showDownloadLink();

}
function drawDiamond1() {
    checkUserUploadedImage();
    drawDiagonals();
    diamond(2);
    showDownloadLink();

}

function drawDiamond2() {
    checkUserUploadedImage();
    drawDiagonals();
    diamond(4);
    // Show download link
    showDownloadLink();
}

function drawDiamond3() {
    checkUserUploadedImage();
    drawDiagonals();
    diamond(8);
    // Show download link
    showDownloadLink();
}

function drawDiamond4() {
    checkUserUploadedImage();
    drawDiagonals();
    diamond(16);
    // Show download link
    showDownloadLink();
}

function testQuarters(){
    drawDiagonals();
    diamond(16);
}
function diamond(parameter){
    console.log("diamond parameter: " + parameter);

    let width = canvas.width;
    let height = canvas.height;

    let topPoints = createTopPoints(parameter, width);
    let leftPoints = createLeftPoints(parameter, height);
    let bottomPoints = topPoints.reverse();
    let rightPoints = leftPoints.reverse();

    let lineColor = document.getElementById('lineColor').value;

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();

    let length = topPoints.length;
    console.log("length: " + length);
    for (let index = 0; index < topPoints.length; ++index) {

            let topPoint = topPoints[index];
            let bottomPoint = topPoints[length - index -1];
            let leftPoint = leftPoints[index];
            let rightPoint = leftPoints[length - index - 1];


            ctx.moveTo(topPoint, 0);
            ctx.lineTo(0, leftPoint);
            ctx.moveTo(topPoint, 0);
            ctx.lineTo(width, rightPoint);


            ctx.moveTo(bottomPoint, height);
            ctx.lineTo(0, leftPoint);
            ctx.moveTo(bottomPoint, height);
            ctx.lineTo(width, rightPoint);
        }

    ctx.stroke();
    grid(parameter);
}

function grid(parameter){
    console.log("grid parameter: " + parameter);

    // Draw diagonal lines
    let width = canvas.width;
    let height = canvas.height;
    let topPoints = createTopPoints(parameter, width);
    let leftPoints = createLeftPoints(parameter, height);
    let lineColor = document.getElementById('lineColor').value;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();

    for (let index = 0; index < topPoints.length; ++index) {
        let startPoint = topPoints[index];
        console.log("startPoint: " + startPoint);

        ctx.moveTo(startPoint, 0);
        ctx.lineTo(startPoint, height);
    }

    for (let index = 0; index < leftPoints.length; ++index) {
        let startPoint = leftPoints[index];
        console.log("startPoint: " + startPoint);

        ctx.moveTo(0, startPoint);
        ctx.lineTo(width, startPoint);
    }
    ctx.stroke();

}


function generateFractions(parameter, dimension) {
    let fractions = [];
        console.log("generateFractions parameter: " + parameter + " dimension: "+ dimension);

    for (let i = 1; i < parameter; i++) {
        fractions.push(i* (dimension/parameter) );
    }
    return fractions;
}

function createTopPoints(divideBy, width){
    let points = generateFractions(divideBy, width)
    return points
}

function createLeftPoints(divideBy, height){
    let points = generateFractions(divideBy, height)
    return points
}

function showDownloadLink(){
    let downloadLink = document.getElementById('downloadLink');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.style.display = 'block';
}

