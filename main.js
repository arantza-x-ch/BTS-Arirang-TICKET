/* *** Constants *** */
const WIDTH = 1000;
const HEIGHT = 500;

/* *** Variables *** */
var concerts = null;

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

//const addBtnChange = document.getElementById('addChange');

const downloadBtn = document.getElementById('downloadBtn'); //aditional buttons
const resetBtn = document.getElementById('resetBtn');

const finalImage = new Image();                             //background-image for canvas
const dataURL = 'Assets/entrada4.png';

/* *** variables : Sticker State *** */
let stickers = [];                // Array of {img, x, y, width, height, dragging}
let dragOffset = { x: 0, y: 0 };  // Position
let selectedSticker = null;

/* *** variable :  Date State *** */ 
let selectedDate = null;

/* *** Set Image Base (Tiquet) *** */
finalImage.src = dataURL;
finalImage.onload = () => drawCanvas(); 
uploadData();

/* *** Draw Canva *** */
function drawCanvas() 
{
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(finalImage, 0, 0, WIDTH, HEIGHT);
     
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
}

/* *** Add 'Sticker' *** */
function addSticker(src) 
{
    const img = new Image();
    img.src = src;

    img.onload = () => {
        const sticker = {
          img,
          x: WIDTH / 2 - img.width / 12,  
          y: HEIGHT / 2 - img.height / 12,
          width: img.width /3,
          height: img.height /3,
          dragging: false
        };
        stickers.push(sticker);   // Agegar 'sticker' al Array
        drawCanvas();             // Actualizar canvas
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
  const { x: mouseX, y: mouseY } = getPointerPos(e);

  for (let i = stickers.length - 1; i >= 0; i--) 
    {
      const s = stickers[i];
      if (mouseX >= s.x && mouseX <= s.x + s.width &&
          mouseY >= s.y && mouseY <= s.y + s.height) 
          {
            selectedSticker = s;
            s.dragging = true;
            dragOffset.x = mouseX - s.x;
            dragOffset.y = mouseY - s.y;

            stickers.splice(i, 1); //Bring sticker to front
            stickers.push(s);

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

//here

/* *** Button Event Listeners *** */
/* *** (0-6) BTS21 Members Stickers *** */
addBtn0.addEventListener('click', () =>
  addSticker('Assets/21JIN.png')
);
addBtn1.addEventListener('click', () =>
  addSticker('Assets/21RM.png')
);
addBtn2.addEventListener('click', () =>
  addSticker('Assets/21SUGA.png')
);
addBtn3.addEventListener('click', () =>
  addSticker('Assets/21JHOPE.png')
);
addBtn4.addEventListener('click', () =>
  addSticker('Assets/21JIMIN.png')
);
addBtn5.addEventListener('click', () =>
  addSticker('Assets/21V.png')
);
addBtn6.addEventListener('click', () =>
  addSticker('Assets/21JK.png')
); 
/* *** (7) BTS Logo Stickers *** */
addBtn7.addEventListener('click', () =>
  addSticker('Assets/bts-logo.png')
);
/* *** Additional Actions Buttons  *** */
resetBtn.addEventListener('click', () => {
  stickers = [];   // clear all stickers
  selectedDate = null
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