/* *** Constants *** */
const WIDTH = 1000;
const HEIGHT = 500;

/* *** DOM Elements *** */
const canvas = document.getElementById('tiquet-canva');     //canvas
const ctx = canvas.getContext('2d');

const addBtn0 = document.getElementById('addJN');           //stickers buttons
const addBtn1 = document.getElementById('addNMJ');
const addBtn2 = document.getElementById('addSG');
const addBtn3 = document.getElementById('addHB');
const addBtn4 = document.getElementById('addJMN');
const addBtn5 = document.getElementById('addV');
const addBtn6 = document.getElementById('addJK');
const addBtn7 = document.getElementById('addBTS');

const backBtn = document.getElementById('backBtn');         //stickers navigation buttons
const nextBtn = document.getElementById('nextBtn');

// Array of stickers buttons
const btnStickers = [addBtn0, addBtn1, addBtn2, addBtn3, addBtn4, addBtn5, addBtn6, addBtn7];  
// Array of stickers images 
const imgStickers = ['Assets/21JIN.png', 'Assets/21RM.png','Assets/21SUGA.png','Assets/21JHOPE.png', 
  'Assets/21JIMIN.png', 'Assets/21V.png','Assets/21JK.png', 'Assets/21VAN.png',
  'Assets/22JIN.png','Assets/22RM.png','Assets/22SUGA.png','Assets/22JHOPE.png',
  'Assets/22JIMIN.png','Assets/22V.png','Assets/22JK.png','Assets/bts-logo.png']
const elementsPage = 8;                                     //paginacion
const maxPage = (imgStickers.length / 8)-1;
let actualPage = 0;

const downloadBtn = document.getElementById('downloadBtn'); //aditional buttons
const resetBtn = document.getElementById('resetBtn');

const nameBtn = document.querySelector('#submitName');      //name-text
let submitName = ' ';

const finalImage = new Image();                             //background-image for canvas
const marcImage = new Image();
const dataURL = 'Assets/entrada4.png';

/* *** Variables *** */
var concerts = null;

/* *** variables : Sticker State *** */
let stickers = [];                // Array of {img, x, y, width, height, dragging}
let dragOffset = { x: 0, y: 0 };  // Position
let selectedSticker = null;
let srcSticker = null;

/* *** variable :  Date State *** */ 
let selectedDate = null;

/* *** Set Image Base (Tiquet) *** */
finalImage.src = dataURL;
finalImage.onload = () => drawCanvas(); 
marcImage.src = 'Assets/entrada21.png';
uploadData(); 

/* *** Draw Canva *** */
function drawCanvas() 
{
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(finalImage, 0, 0, WIDTH, HEIGHT);
    //ctx.drawImage(marcImage, 0,0, WIDTH, HEIGHT);

     
    //Set date concert
    if (selectedDate != null){  
      canvas.style.letterSpacing = -1 + 'px';     // Day
      ctx.fillStyle = "#e8e9ea";
      ctx.font = 'bold 100px Teko ';
      ctx.fillText(selectedDate.day, 400, 460);
                               
      canvas.style.letterSpacing = 0 + 'px';      // Month    
        if (selectedDate.month.length>7) 
          {
            ctx.font = 'bold 35px Teko ';
            ctx.fillText(selectedDate.month, 485, 419);
          }else{
            ctx.font = 'bold 45px Teko ';
            ctx.fillText(selectedDate.month, 485, 425);
          }
        
      ctx.font = 'bold 35px Teko ';              // Time
      ctx.fillText(selectedDate.time, 485, 460);

      canvas.style.letterSpacing = 2 + 'px';     // City + Country
      ctx.fillStyle = "#e8e9ea38";
      ctx.font = 'bold 20px Teko ';
      ctx.fillText(selectedDate.city + ", " + selectedDate.country, 60, 60);
    }

    //set stickers
    stickers.forEach(sticker => {
        ctx.drawImage(sticker.img, sticker.x, sticker.y, sticker.width, sticker.height);
    });

    //set name

    canvas.style.letterSpacing = 1 + 'px';    // Name
    ctx.fillStyle = "#f4132671";          
    ctx.font = 'bold 20px Teko ';
    ctx.fillText(submitName, 73, 400);       
}

/* *** Add 'Sticker' *** */
function addSticker() 
{ 
  const img = new Image();
    img.src = srcSticker; 

    img.onload = () => {
        const sticker = {
          img,
          x: WIDTH / 2 - img.width / 12,  
          y: HEIGHT / 2 - img.height / 12,
          width: img.width /3,
          height: img.height /3,
          dragging: false
        };
        stickers.push(sticker);   // Add'sticker' to Array
        drawCanvas();             // Update canvas
    };
}

/* *** Mouse Events *** */
canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mouseup', pointerUp);
canvas.addEventListener('mouseleave', pointerUp);

/* *** Touch Events *** */
canvas.addEventListener('touchstart', pointerDown);
canvas.addEventListener('touchmove', pointerMove);
canvas.addEventListener('touchend', pointerUp);
canvas.addEventListener('touchcancel', pointerUp);

/* *** Get Touch Position *** */
function getPointerPos(e) 
{
  console.log("uno");
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let clientX, clientY;

  if (e.touches && e.touches.length > 0) 
    {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}
/* *** Drag and Drop Handlers *** */
function pointerDown(e) 
{
  console.log("dos");
  const { x: mouseX, y: mouseY } = getPointerPos(e);

  let deleteCheck = document.getElementById('deleteBtn');

  for (let i = stickers.length - 1; i >= 0; i--) 
    {
      const sticky = stickers[i];
      if (mouseX >= sticky.x && mouseX <= sticky.x + sticky.width &&
          mouseY >= sticky.y && mouseY <= sticky.y + sticky.height) 
          {
            if (deleteCheck.checked) { 
              stickers = stickers.filter(function(sticker) { return sticker !== sticky });
            }else{
            selectedSticker = sticky; 
            sticky.dragging = true;
            dragOffset.x = mouseX - sticky.x;
            dragOffset.y = mouseY - sticky.y;

            stickers.splice(i, 1); //Bring sticker to front
            stickers.push(sticky);
          }
          drawCanvas();
          e.preventDefault();
          break;
          }
  }
}
function pointerMove(e) 
{ 
  if (!selectedSticker || !selectedSticker.dragging) return;

  const { x: mouseX, y: mouseY } = getPointerPos(e);
  selectedSticker.x = mouseX - dragOffset.x;
  selectedSticker.y = mouseY - dragOffset.y;

  drawCanvas();
  e.preventDefault();
}

function pointerUp() 
{ 
  if (selectedSticker) selectedSticker.dragging = false;
  selectedSticker = null;
} 

/* *** Button Event Listeners *** */
/* *** Stickers *** */
btnStickers.forEach( ( btn ) => {  
    btn.addEventListener('click', () => { 
      var style = getComputedStyle(btn, false);
      srcSticker = style.backgroundImage.slice(5, -2);
      addSticker();
    }); 
})

/* *** Navigation Stickers *** */
backBtn.addEventListener('click', () => {
  if ( actualPage != 0 ) {  
    actualPage--;   
    updateStickersBackground();
  }
})
nextBtn.addEventListener('click', () =>{
  if ( actualPage != maxPage ) {  
    actualPage++;  
    updateStickersBackground();
  } 
}) 
  
/* *** Change Background Stickers Buttons *** */
function updateStickersBackground() {
  let indexStart = actualPage * 8;
  btnStickers.forEach( ( btn, index ) => {
    let finalIndex = indexStart + index; 
    btn.style.backgroundImage = 'url('+ imgStickers[finalIndex] +')';
  })
}

/* *** Additional Actions Buttons  *** */
resetBtn.addEventListener('click', () => {
  stickers = [];   // clear all stickers
  selectedDate = null;
  nameBtn.value= '';
  submitName = ' ';
  drawCanvas();    // redraw without stickers
});
downloadBtn.addEventListener('click', () => {
  canvas.toBlob(blob => {
    const downloadCanva = document.createElement('a');
    downloadCanva.href = URL.createObjectURL(blob);
    downloadCanva.download = 'BTS-ARIRANG-TIQUET.png';
    downloadCanva.click();
  }, 'image/png');
});
nameBtn.addEventListener('input', () =>{ 
  submitName = nameBtn.value.toUpperCase(); 
  drawCanvas();
});
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');

  if (logo) 
    {
      logo.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
});


/* *** AJAX (JSON) *** */
function uploadData()
{ 
    let objetoAjJMN = new XMLHttpRequest(); 

    objetoAjJMN.open("GET", "concertsdata.json", true);  
    objetoAjJMN.send();
     
    objetoAjJMN.onreadystatechange = manageData;
}

function manageData() 
{ 
    if ( (this.readyState == 4 ) && (this.status == 200) )
    {
        concerts = JSON.parse(this.responseText); 

        concerts.concert_dates.forEach( (infoConcert, index) => {
            showInfoDates(infoConcert, index);
        } ) 
    }
}

function showInfoDates( objectConcertDate, index )
{
    let concertContainer = document.getElementById(objectConcertDate.continent)
    let dateContainer = document.createElement('div');
    let city = document.createElement('h3');
    let date = document.createElement('p');

    city.innerText = objectConcertDate.city + ", " + objectConcertDate.country;
    date.innerText = objectConcertDate.month + " " + objectConcertDate.day;

    dateContainer.classList.add('date');
    dateContainer.setAttribute('id', index);

    dateContainer.appendChild(city);
    dateContainer.appendChild(date);

    concertContainer.appendChild(dateContainer);

    dateContainer.addEventListener('click', () => { 
        selectedDate =  concerts.concert_dates[dateContainer.getAttribute('id')];
        drawCanvas();
    });
}