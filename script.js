const paperSizes = {
    // All 'A' paper sizes have an aspect ratio of 1:sqrt(2)
    // We define both portrait and landscape ratios for convenience.
    // Portrait: Width is shorter than Height (e.g., 210mm x 297mm) -> Ratio < 1
    // Landscape: Width is longer than Height (e.g., 297mm x 210mm) -> Ratio > 1
    A_PORTRAIT_RATIO: 1 / Math.sqrt(2), // approx 0.707
    A_LANDSCAPE_RATIO: Math.sqrt(2),   // approx 1.414
    // Physical dimensions in millimeters [width, height] for Portrait
        dimensions: {
            A1: [594, 841],
            A2: [420, 594],
            A3: [297, 420],
            A4: [210, 297],
            A5: [148, 210]
        }
};

// handle the user chosen orientation
document.getElementById('orientationPortrait').addEventListener('change', transformImageToFormat);
document.getElementById('orientationLandscape').addEventListener('change', transformImageToFormat);

document.getElementById('outputFormat').addEventListener('change', handleFormatChange);

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
let drawingStack = []; // <-- global variable to store drawing commands
let customGridSpacing = 0;
let widthPx = 0;
let heightPx = 0;
let widthCm = 0;
let heightCm = 0;
const InchToCm = 2.54;



/**
 * Helper function to programmatically trigger a download.
 */
function triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/**
 * Calculates the position and size to draw an image to "fit" inside a canvas
 * while maintaining its aspect ratio.
 */
function calculateFitDimensions(image, canvas) {
    const imageRatio = image.width / image.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, drawX, drawY;

    if (imageRatio > canvasRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
    } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageRatio;
        drawY = 0;
        drawX = (canvas.width - drawWidth) / 2;
    }
    return { drawX, drawY, drawWidth, drawHeight };
}

function checkUserUploadedImage(){
    if (!img.src) {
        alert("Please upload an image first.");
        return;
    }
}



// REVISED version of transformImageToFormat
function transformImageToFormat() {
    if (!img.src) {
        alert("Please upload an image first.");
        document.getElementById('outputFormat').value = 'original'; // Reset dropdown
        return;
    }

    const format = document.getElementById('outputFormat').value;
    // Set up the preview canvas size based on the format
    if (format === 'original') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        showDownloadLink();
        // Also hide the orientation controls if they are visible
        document.getElementById('orientationContainer').style.display = 'none';
        return;
    }else{
        const selectedOrientation = document.querySelector('input[name="orientation"]:checked').value;
        const formatAspectRatio = (selectedOrientation === 'portrait')
            ? paperSizes.A_PORTRAIT_RATIO
            : paperSizes.A_LANDSCAPE_RATIO;
        const imageAspectRatio = img.width / img.height;

        let newWidth, newHeight;
        if (imageAspectRatio > formatAspectRatio) {
            newWidth = img.width;
            newHeight = img.width / formatAspectRatio;
        } else {
            newHeight = img.height;
            newWidth = img.height * formatAspectRatio;
        }
        canvas.width = newWidth;
        canvas.height = newHeight;
    }

    // After transforming the canvas, redraw everything
    redrawLinesOnCanvas(ctx);
    showDownloadLink();
}

/**
 * Calculates the position and size to draw an image to "fit" inside a canvas
 * while maintaining its aspect ratio.
 * @param {Image} image - The source image object.
 * @param {HTMLCanvasElement} canvas - The destination canvas.
 * @returns {object} - { drawX, drawY, drawWidth, drawHeight }
 */
function calculateFitDimensions(image, canvas) {
    const imageRatio = image.width / image.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, drawX, drawY;

    if (imageRatio > canvasRatio) {
        // Image is wider than canvas, so fit width
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2; // Center vertically
    } else {
        // Image is taller than or equal to canvas, so fit height
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageRatio;
        drawY = 0;
        drawX = (canvas.width - drawWidth) / 2; // Center horizontally
    }

    return { drawX, drawY, drawWidth, drawHeight };
}

// function to manage UI visibility
function handleFormatChange() {
    const format = document.getElementById('outputFormat').value;
    const orientationContainer = document.getElementById('orientationContainer');

    if (format === 'original') {
        orientationContainer.style.display = 'none'; // Hide orientation controls
    } else {
        orientationContainer.style.display = 'flex'; // Show orientation controls
        // Sensible default: match image orientation
        const imageIsPortrait = img.width < img.height;
        document.getElementById('orientationPortrait').checked = imageIsPortrait;
        document.getElementById('orientationLandscape').checked = !imageIsPortrait;
    }

    transformImageToFormat(); // Now update the canvas
}


function handleImageUpload(event) {
    let reader = new FileReader();
    reader.onload = function(e) {
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.style.display = 'block';

            // Reset the format dropdown to 'original' for the new image
            document.getElementById('outputFormat').value = 'original';
            document.getElementById('orientationContainer').style.display = 'none';
            showDownloadLink();


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

    // Update the global spacing variable for the filename
    customGridSpacing = spacingCm;

    // Push the command to the stack
    drawingStack.push({ type: 'customGrid', spacing: spacingCm });
    // Redraw the canvas and update the download link
    redrawLinesOnCanvas(ctx);
    showDownloadLink();
}
/**
 * Draws a grid with specific spacing on a given canvas context.
 * @param {number} spacingPx - The grid spacing in PIXELS.
 * @param {CanvasRenderingContext2D} context - The context to draw on.
 * @param {HTMLCanvasElement} canvas - The canvas element to get dimensions from.
 */
function drawGridOverlay(spacingPx, context, canvas) {
    if (!context || !canvas || !spacingPx || spacingPx <= 0) return;

    const width = canvas.width;
    const height = canvas.height;
    const lineColor = document.getElementById('lineColor').value;

    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;
    context.beginPath();

    for (let x = spacingPx; x < width; x += spacingPx) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
    }
    for (let y = spacingPx; y < height; y += spacingPx) {
        context.moveTo(0, y);
        context.lineTo(width, y);
    }
    context.stroke();
}



function clearLines(){
    drawingStack = []; // Clear the commands
    customGridSpacing = 0; // reset the spacing
    transformImageToFormat(); // This redraws the base image and calls showDownloadLink
}

function drawCross(){
    checkUserUploadedImage()
    drawingStack.push({ type: 'grid', param: 2 });
    redrawLinesOnCanvas(ctx); // Redraw all lines on the preview canvas
    showDownloadLink();
}

function drawGrid3(){
    checkUserUploadedImage()
    drawingStack.push({ type: 'grid', param: 4 });
    redrawLinesOnCanvas(ctx); // Redraw all lines on the preview canvas
    showDownloadLink();
}

function drawGrid7(){
    checkUserUploadedImage()
    drawingStack.push({ type: 'grid', param: 8 });
    redrawLinesOnCanvas(ctx); // Redraw all lines on the preview canvas
    showDownloadLink();
}



function drawGrid15(){
    checkUserUploadedImage()
    drawingStack.push({ type: 'grid', param: 16 });
    redrawLinesOnCanvas(ctx); // Redraw all lines on the preview canvas
    showDownloadLink();
}

function drawGrid31(){
    checkUserUploadedImage()
    drawingStack.push({ type: 'grid', param: 32 });
    redrawLinesOnCanvas(ctx); // Redraw all lines on the preview canvas
    showDownloadLink();
}

function drawDiagonals() {
    checkUserUploadedImage();
    drawingStack.push({ type: 'diagonals' });
    redrawLinesOnCanvas(ctx); // Redraw on the main preview canvas
    showDownloadLink();

}
function drawDiamond1() {
    checkUserUploadedImage();
    drawingStack.push({ type: 'diamond', param: 2 });
    redrawLinesOnCanvas(ctx);
    showDownloadLink();
}

function drawDiamond2() {
    checkUserUploadedImage();
    drawingStack.push({ type: 'diamond', param: 4 });
    redrawLinesOnCanvas(ctx);
    showDownloadLink();
}

function drawDiamond3() {
    checkUserUploadedImage();
    drawingStack.push({ type: 'diamond', param: 8 });
    redrawLinesOnCanvas(ctx);
    showDownloadLink();
}

function drawDiamond4() {
    checkUserUploadedImage();
    drawingStack.push({ type: 'diamond', param: 16 });
    redrawLinesOnCanvas(ctx);
    showDownloadLink();
}

function testQuarters(){
    drawDiagonals();
    diamond(16);
}

/**
 * Draws a diamond pattern on a given canvas context.
 * @param {number} parameter - The number of divisions.
 * @param {CanvasRenderingContext2D} context - The context to draw on.
 * @param {HTMLCanvasElement} canvas - The canvas element to get dimensions from.
 */
function diamond(parameter, context, canvas) {
    if (!context || !canvas) return; // Safety check

    const width = canvas.width;
    const height = canvas.height;

    const topPoints = createTopPoints(parameter, width);
    const leftPoints = createLeftPoints(parameter, height);
    // Use spread operator to create a shallow copy before reversing
    const bottomPoints = [...topPoints].reverse();
    const rightPoints = [...leftPoints].reverse();

    const lineColor = document.getElementById('lineColor').value;

    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;
    context.beginPath();

    for (let index = 0; index < topPoints.length; ++index) {
        const topPoint = topPoints[index];
        const bottomPoint = bottomPoints[index];
        const leftPoint = leftPoints[index];
        const rightPoint = rightPoints[index];

        context.moveTo(topPoint, 0);
        context.lineTo(0, leftPoint);

        context.moveTo(topPoint, 0);
        context.lineTo(width, rightPoint);

        context.moveTo(bottomPoint, height);
        context.lineTo(0, leftPoint);

        context.moveTo(bottomPoint, height);
        context.lineTo(width, rightPoint);
    }
    context.stroke();

    // The diamond pattern also includes a grid
    grid(parameter, context, canvas);
}
/**
 * Draws a grid on a given canvas context.
 * @param {number} parameter - The number of divisions for the grid.
 * @param {CanvasRenderingContext2D} context - The context to draw on.
 * @param {HTMLCanvasElement} canvas - The canvas element to get dimensions from.
 */
function grid(parameter, context, canvas) {
    if (!context || !canvas) return; // Safety check

    const width = canvas.width;
    const height = canvas.height;
    const topPoints = createTopPoints(parameter, width);
    const leftPoints = createLeftPoints(parameter, height);
    const lineColor = document.getElementById('lineColor').value;

    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;
    context.beginPath();

    for (const startPoint of topPoints) {
        context.moveTo(startPoint, 0);
        context.lineTo(startPoint, height);
    }

    for (const startPoint of leftPoints) {
        context.moveTo(0, startPoint);
        context.lineTo(width, startPoint);
    }
    context.stroke();
}
/**
 * Draws diagonal lines on a given canvas context.
 * @param {CanvasRenderingContext2D} context - The context to draw on.
 * @param {HTMLCanvasElement} canvas - The canvas element to get dimensions from.
 */
function diagonals(context, canvas) {
    if (!context || !canvas) return; // Safety check

    const lineColor = document.getElementById('lineColor').value;
    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width, canvas.height);
    context.moveTo(canvas.width, 0);
    context.lineTo(0, canvas.height);
    context.stroke();
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

function showDownloadLink() {
    let filename;
    const format = document.getElementById('outputFormat').value;

    if (format === 'original') {
        filename = 'original-image';
    } else {
        const selectedOrientation = document.querySelector('input[name="orientation"]:checked').value;
        filename = `image-${format}-${selectedOrientation}`;
    }
    // ---  Check for custom grid spacing ---
    if (customGridSpacing > 0) {
        filename += `-${customGridSpacing}cm_grid`;
    }
    filename += '.png';
    let downloadLink = document.getElementById('downloadLink');
    downloadLink.download = filename;


    // --- High-Resolution Export Logic ---
    // Remove any previous listeners to avoid duplicates
    downloadLink.onclick = null;
    // Add a new click listener
    downloadLink.onclick = (event) => {
        event.preventDefault(); // Prevent default link behavior
        // --- LOADING INDICATOR FIX ---
        const originalText = downloadLink.textContent;
        downloadLink.textContent = "Generating...";
        downloadLink.style.pointerEvents = 'none'; // Disable button
        downloadLink.style.opacity = '0.7';

        // Use a small timeout to let the UI update before the heavy work
        setTimeout(() => {
            try { // Use a try...finally block to ensure the button is always restored
                const exportFormat = document.getElementById('outputFormat').value;

                if (exportFormat === 'original') {
                    const url = canvas.toDataURL('image/png');
                    triggerDownload(url, downloadLink.download);
                    return; // Early exit for simple case
                }

                console.log("Starting high-resolution export...");
                const selectedOrientation = document.querySelector('input[name="orientation"]:checked').value;
                const dpi = 300;
                let [widthMm, heightMm] = paperSizes.dimensions[exportFormat];

                if (selectedOrientation === 'landscape') {
                    [widthMm, heightMm] = [Math.max(widthMm, heightMm), Math.min(widthMm, heightMm)];
                } else {
                    [widthMm, heightMm] = [Math.min(widthMm, heightMm), Math.max(widthMm, heightMm)];
                }

                const targetWidth = Math.round((widthMm / 10) / InchToCm * dpi);
                const targetHeight = Math.round((heightMm / 10) / InchToCm * dpi);

                console.log(`Exporting at ${targetWidth}x${targetHeight}px for ${dpi} DPI`);

                const exportCanvas = document.createElement('canvas');
                exportCanvas.width = targetWidth;
                exportCanvas.height = targetHeight;
                const exportCtx = exportCanvas.getContext('2d');

                // The magic step: redraw everything on the high-res hidden canvas
                redrawLinesOnCanvas(exportCtx);

                const url = exportCanvas.toDataURL('image/png');
                triggerDownload(url, downloadLink.download);
                console.log("Export complete.");

            } finally {
                // --- RESTORE BUTTON ---
                // This block runs whether the export succeeds or fails
                downloadLink.textContent = originalText;
                downloadLink.style.pointerEvents = 'auto';
                downloadLink.style.opacity = '1';
            }
        }, 10); // 10ms delay is enough for the UI to repaint
    };

    downloadLink.style.display = 'block';
}

// To avoid code duplication in redrawLinesOnCanvas
function getPixelsPerCm(targetCanvas) {
    const format = document.getElementById('outputFormat').value;
    if (format === 'original') {
        // For original, use the image's own DPI if available
        return canvas.dpi / InchToCm;
    }

    // For formatted exports (A1, A2, etc.), calculate based on known dimensions
    let [widthMm, heightMm] = paperSizes.dimensions[format];
    const orientation = document.querySelector('input[name="orientation"]:checked').value;

    if (orientation === 'landscape') {
        // Ensure width is the larger dimension for landscape
        return targetCanvas.width / Math.max(widthMm, heightMm / 10);
    } else {
        // Ensure width is the smaller dimension for portrait
        return targetCanvas.width / Math.min(widthMm, heightMm / 10);
    }
}

function redrawLinesOnCanvas(context) {
    const targetCanvas = context.canvas;
    const dpi = 300; // Assume 300 for export, or use a passed value
    const format = document.getElementById('outputFormat').value;
    if (format === 'original' && targetCanvas === canvas) {
        // Only resize if we are drawing on the main preview canvas
        targetCanvas.width = img.width;
        targetCanvas.height = img.height;
    }

    // First, restore the base image on the target canvas
    // (This also handles the letterboxing for formatted exports)
    context.fillStyle = 'black';
    context.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
    const fit = calculateFitDimensions(img, targetCanvas);
    context.drawImage(img, fit.drawX, fit.drawY, fit.drawWidth, fit.drawHeight);

    // Now, loop through the stack and draw everything on top
    drawingStack.forEach(command => {
        if (command.type === 'grid') {
            grid(command.param, context, targetCanvas);
        } else if (command.type === 'diagonals') {
            diagonals(context, targetCanvas);
        } else if (command.type === 'diamond') {
            diagonals(context, targetCanvas); // Diamonds include diagonals
            diamond(command.param, context, targetCanvas);
        } else if (command.type === 'customGrid') {
            const pixelsPerCm = getPixelsPerCm(targetCanvas);
            const spacingPx = command.spacing * pixelsPerCm;
            drawGridOverlay(spacingPx, context, targetCanvas);
        }
    });
}