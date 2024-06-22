document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('drawCross').addEventListener('click', drawCross);
document.getElementById('drawDiagonal').addEventListener('click', drawDiagonals);
document.getElementById('drawDiamond1').addEventListener('click', drawDiamond1);
document.getElementById('drawDiamond2').addEventListener('click', drawDiamond2);
document.getElementById('drawDiamond3').addEventListener('click', drawDiamond3);
document.getElementById('drawDiamond4').addEventListener('click', drawDiamond4);



document.getElementById('clearLines').addEventListener('click',clearLines);
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let img = new Image();



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
    let lineColor = document.getElementById('lineColor').value;

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 5;

    let width = canvas.width
    let height = canvas.height
    ctx.beginPath();
 
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);


    ctx.stroke();
    showDownloadLink();
}
function drawDiagonals() {
    checkUserUploadedImage();
    let lineColor = document.getElementById('lineColor').value;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 5;

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

    drawCross();
    drawDiagonals();

    let lineColor = document.getElementById('lineColor').value;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 5;

    let width = canvas.width
    let halfwidth = width / 2
    let height = canvas.height
    let halfheight = height / 2
    ctx.beginPath();

    ctx.moveTo(halfwidth, 0);
    ctx.lineTo(width, halfheight);
    ctx.moveTo(halfwidth, 0);
    ctx.lineTo(0, halfheight);
    
    ctx.moveTo(halfwidth, height);
    ctx.lineTo(width, halfheight);
    ctx.moveTo(halfwidth, height);
    ctx.lineTo(0, halfheight);



    ctx.stroke();
    showDownloadLink();

}

function drawDiamond2() {
    drawDiamond1();
    let lineColor = document.getElementById('lineColor').value;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 5;

    let width = canvas.width
    let height = canvas.height
    let quarterWidth = canvas.width / 4
    let threeQuarterWidth = 3 * quarterWidth
    let quarterHeight = canvas.height / 4
    let threeQuarterHeight = 3 * quarterHeight
    ctx.beginPath();

    // vertical quarter
    ctx.moveTo(quarterWidth, 0);
    ctx.lineTo(quarterWidth, height);
    ctx.moveTo(threeQuarterWidth, 0);
    ctx.lineTo(threeQuarterWidth, height);


    // horizontal quarter
    ctx.moveTo(0, quarterHeight);
    ctx.lineTo(width, quarterHeight);
    ctx.moveTo(0, threeQuarterHeight);
    ctx.lineTo(width, threeQuarterHeight);
    ctx.moveTo(quarterWidth, 0);
    ctx.lineTo(width, threeQuarterHeight);

    ctx.moveTo(0, quarterHeight);
    ctx.lineTo(threeQuarterWidth, height);

    ctx.moveTo(quarterWidth, 0);
    ctx.lineTo(0, quarterHeight);

    ctx.moveTo(threeQuarterWidth, height);
    ctx.lineTo(width, threeQuarterHeight);

    ctx.moveTo(0, threeQuarterHeight);
    ctx.lineTo(threeQuarterWidth, 0);

    ctx.moveTo(threeQuarterWidth, 0);
    ctx.lineTo(width, quarterHeight);

    ctx.moveTo(width, quarterHeight);
    ctx.lineTo(quarterWidth, height);

    ctx.moveTo(quarterWidth, height);
    ctx.lineTo(0, threeQuarterHeight);


    ctx.stroke();
    // Show download link
    showDownloadLink();
}

function drawDiamond3() {
    drawDiamond2();
    
    let lineColor = document.getElementById('lineColor').value;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 5;

    // Draw diagonal lines
    let width = canvas.width
    let height = canvas.height
    let eighthWidth = canvas.width / 8
    let twoEighthWidth = 2 * eighthWidth
    let threeEighthWidth = 3 * eighthWidth
    let fiveEighthWidth = 5 * eighthWidth
    let sixEighthWidth = 6 * eighthWidth
    let sevenEighthWidth = 7 * eighthWidth
    let eighthHeight = canvas.height / 8
    let twoEighthHeight = 2 * eighthHeight
    let threeEighthHeight = 3 * eighthHeight
    let fiveEighthHeight = 5 * eighthHeight
    let sixEighthHeight = 6 * eighthHeight
    let sevenEighthHeight = 7 * eighthHeight
    ctx.beginPath();

    // vertical eighth
    ctx.moveTo(eighthWidth, 0);
    ctx.lineTo(eighthWidth, height);

    ctx.moveTo(threeEighthWidth, 0);
    ctx.lineTo(threeEighthWidth, height);

    ctx.moveTo(fiveEighthWidth, 0);
    ctx.lineTo(fiveEighthWidth, height);

    ctx.moveTo(sevenEighthWidth, 0);
    ctx.lineTo(sevenEighthWidth, height);





    ctx.moveTo(0, eighthHeight);
    ctx.lineTo(width, eighthHeight);
    ctx.moveTo(0, twoEighthHeight);
    ctx.lineTo(width, twoEighthHeight);
    ctx.moveTo(0, threeEighthHeight);
    ctx.lineTo(width, threeEighthHeight);
    ctx.moveTo(0, fiveEighthHeight);
    ctx.lineTo(width, fiveEighthHeight);
    ctx.moveTo(0, sixEighthHeight);
    ctx.lineTo(width, sixEighthHeight);
    ctx.moveTo(0, sevenEighthHeight);    
    ctx.lineTo(width, sevenEighthHeight);



   // diamond eighth
    ctx.moveTo(0, eighthHeight);
    ctx.lineTo(eighthWidth, 0); 

    ctx.moveTo(0, twoEighthHeight);
    ctx.lineTo(twoEighthWidth, 0); 

    ctx.moveTo(0, threeEighthHeight);
    ctx.lineTo(threeEighthWidth, 0); 


    ctx.moveTo(sevenEighthWidth, 0);
    ctx.lineTo(width, eighthHeight); 

    ctx.moveTo(sixEighthWidth, 0);
    ctx.lineTo(width, twoEighthHeight); 

    ctx.moveTo(fiveEighthWidth, 0);
    ctx.lineTo(width, threeEighthHeight); 



    ctx.moveTo(0, fiveEighthHeight);
    ctx.lineTo(threeEighthWidth, height); 

    ctx.moveTo(0, sixEighthHeight);
    ctx.lineTo(twoEighthWidth, height); 


    ctx.moveTo(0, sevenEighthHeight);
    ctx.lineTo(eighthWidth, height); 

    ctx.moveTo(threeEighthWidth, height);
    ctx.lineTo(width, threeEighthHeight);

    ctx.moveTo(fiveEighthWidth, height);
    ctx.lineTo(width, fiveEighthHeight); 

    ctx.moveTo(sixEighthWidth, height);
    ctx.lineTo(width, sixEighthHeight); 


    ctx.moveTo(sevenEighthWidth, height);
    ctx.lineTo(width, sevenEighthHeight); 


    ctx.moveTo(eighthWidth, 0);
    ctx.lineTo(width, sevenEighthHeight); 

    ctx.moveTo(threeEighthWidth, 0);
    ctx.lineTo(width, fiveEighthHeight); 

    ctx.moveTo(0, eighthHeight);
    ctx.lineTo(sevenEighthWidth, height); 

    ctx.moveTo(0, threeEighthHeight);
    ctx.lineTo(fiveEighthWidth, height); 


    ctx.moveTo(fiveEighthWidth, 0);
    ctx.lineTo(0, fiveEighthHeight); 

    ctx.moveTo(sevenEighthWidth, 0);
    ctx.lineTo(0, sevenEighthHeight); 

    ctx.moveTo(width, eighthHeight);
    ctx.lineTo(eighthWidth, height); 

    ctx.moveTo(width, eighthHeight);
    ctx.lineTo(eighthWidth, height); 


    ctx.stroke();
    // Show download link
    showDownloadLink();
}



function drawDiamond4() {
    drawDiamond3();
    
    let lineColor = document.getElementById('lineColor').value;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 5;

    // Draw diagonal lines
    let width = canvas.width
    let height = canvas.height
    let one16thWidth = canvas.width / 16
    let three16thWidth = 3 * one16thWidth
    let four16thWidth = 4 * one16thWidth
    let five16thWidth = 5 * one16thWidth
    let six16thWidth = 6 * one16thWidth
    let seven16thWidth = 7 * one16thWidth
    let nine16thWidth = 9 * one16thWidth
    let ten16thWidth = 10 * one16thWidth
    let eleven16thWidth = 11 * one16thWidth
    let twelve16thWidth = 12 * one16thWidth
    let thirteen16thWidth = 13 * one16thWidth
    let fourteen16thWidth = 14 * one16thWidth
    let fifteen16thWidth = 15 * one16thWidth
   
   
    let one16thHeight = canvas.height / 16
    let three16thHeight = 3 * one16thHeight
    let five16thHeight = 5 * one16thHeight
    let seven16thHeight = 7 * one16thHeight
    let nine16thHeight = 9 * one16thHeight
    let eleven16thHeight = 11 * one16thHeight
    let thirteen16thHeight = 13 * one16thHeight
    let fifteen16thHeight = 15 * one16thHeight

    ctx.beginPath();

    //vertical
    ctx.moveTo(one16thWidth, 0)
    ctx.lineTo(one16thWidth, height)
    ctx.moveTo(three16thWidth, 0)
    ctx.lineTo(three16thWidth, height)
    ctx.moveTo(four16thWidth, 0)
    ctx.lineTo(four16thWidth, height)
    ctx.moveTo(five16thWidth, 0)
    ctx.lineTo(five16thWidth, height)
    ctx.moveTo(six16thWidth, 0)
    ctx.lineTo(six16thWidth, height)
    ctx.moveTo(seven16thWidth, 0)
    ctx.lineTo(seven16thWidth, height)
    ctx.moveTo(nine16thWidth, 0)
    ctx.lineTo(nine16thWidth, height)
    ctx.moveTo(ten16thWidth, 0)
    ctx.lineTo(ten16thWidth, height)
    ctx.moveTo(eleven16thWidth, 0)
    ctx.lineTo(eleven16thWidth, height)
    ctx.moveTo(twelve16thWidth, 0)
    ctx.lineTo(twelve16thWidth, height)
    ctx.moveTo(thirteen16thWidth, 0)
    ctx.lineTo(thirteen16thWidth, height)
    ctx.moveTo(fourteen16thWidth, 0)
    ctx.lineTo(fourteen16thWidth, height)
    ctx.moveTo(fifteen16thWidth, 0)
    ctx.lineTo(fifteen16thWidth, height)

    //vertical
    ctx.moveTo(0, one16thHeight)
    ctx.lineTo(width, one16thHeight)
    ctx.moveTo(0, three16thHeight)
    ctx.lineTo(width, three16thHeight)
    ctx.moveTo(0, five16thHeight)
    ctx.lineTo(width, five16thHeight)
    ctx.moveTo(0, seven16thHeight)
    ctx.lineTo(width, seven16thHeight)
    ctx.moveTo(0, nine16thHeight)
    ctx.lineTo(width, nine16thHeight)
    ctx.moveTo(0, eleven16thHeight)
    ctx.lineTo(width, eleven16thHeight)
    ctx.moveTo(0, thirteen16thHeight)
    ctx.lineTo(width, thirteen16thHeight)
    ctx.moveTo(0, fifteen16thHeight)
    ctx.lineTo(width, fifteen16thHeight)


    ctx.stroke();
    // Show download link
    showDownloadLink();
}


function showDownloadLink(){
    let downloadLink = document.getElementById('downloadLink');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.style.display = 'block';
}

