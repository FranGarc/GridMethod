document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('drawCross').addEventListener('click', drawCross);
document.getElementById('drawDiagonal').addEventListener('click', drawDiagonals);
document.getElementById('drawDiamond1').addEventListener('click', drawDiamond1);
document.getElementById('drawDiamond2').addEventListener('click', drawDiamond2);
document.getElementById('drawDiamond3').addEventListener('click', drawDiamond3);
document.getElementById('drawDiamond4').addEventListener('click', drawDiamond4);
document.getElementById('drawDiamond5').addEventListener('click', drawDiamond5);
document.getElementById('drawDiamond6').addEventListener('click', drawDiamond6);
document.getElementById('drawDiamond7').addEventListener('click', drawDiamond7);

document.getElementById('drawGrid3').addEventListener('click', drawGrid3);
document.getElementById('drawGrid7').addEventListener('click', drawGrid7);
document.getElementById('drawGrid15').addEventListener('click', drawGrid15);
document.getElementById('drawGrid31').addEventListener('click', drawGrid31);
document.getElementById('drawGrid63').addEventListener('click', drawGrid63);
document.getElementById('drawGrid127').addEventListener('click', drawGrid127);



document.getElementById('clearLines').addEventListener('click',clearLines);
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let img = new Image();
let lineWidth = 1;



function handleImageUpload(event) {
    let reader = new FileReader();
    reader.onload = function(e) {
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            canvas.style.display = 'block';
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
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
    downloadLink.style.display = 'none'; // remove download link
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

function drawGrid63(){
    checkUserUploadedImage()
    grid(64);
    showDownloadLink();
}
function drawGrid127(){
    checkUserUploadedImage()
    grid(128);
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

function drawDiamond5() {
    checkUserUploadedImage();
    drawDiagonals();
    diamond(32);
    // Show download link
    showDownloadLink();
}

function drawDiamond6() {
    checkUserUploadedImage();
    drawDiagonals();
    diamond(64);
    // Show download link
    showDownloadLink();
}

function drawDiamond7() {
    checkUserUploadedImage();
    drawDiagonals();
    diamond(128);
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

