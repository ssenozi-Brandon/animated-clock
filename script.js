const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeColor = document.getElementById('large-hand-color');
const secondColor = document.getElementById('second-hand-color');
const canvas = document.getElementById('canvas')

function clock(){
    const now = new Date();
    const ctx = canvas.getContext('2d')


    // setup canvas

    ctx.save();// save the default state
    ctx.clearRect(0,0,300,300);
    ctx.translate(150,150);// put the clock in the middle
    ctx.rotate(-Math.PI/2) // rotate clock

    // set default styles
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#f4f4f4';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // draw clock face/border
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = borderColor.value;
    ctx.fillStyle= faceColor.value;
    ctx.lineWidth = 14;
    ctx.arc(0,0,/*radius-142*/ 142,0,Math.PI*2,true);
    ctx.stroke();
    ctx.fill();
    ctx.restore();


    // draw our hour marks/lines
    ctx.save();
    ctx.strokeStyle= lineColor.value;
    for(let i =0; i <12;i++){
      ctx.rotate(Math.PI/6)
      ctx.beginPath();
      ctx.moveTo(100,0);
      ctx.lineTo(120,0)
      ctx.stroke();
    }
    ctx.restore();


    // draw minute lines
    ctx.save();
    ctx.strokeStyle= lineColor.value;
    ctx.lineWidth = 4;
    for(let i =0; i <60;i++){
      if( i%5 !== 0){
        ctx.beginPath();
        ctx.moveTo(117,0);
        ctx.lineTo(120,0)
        ctx.stroke();
      }
      ctx.rotate(Math.PI/30)
    }
    ctx.restore();


    // get current time
    const hr = now.getHours() % 12;
    const min = now.getMinutes();
    const sec = now.getSeconds();

    // draw hour hand
    ctx.save();
    ctx.rotate((Math.PI / 6) * hr +(Math.PI/360)*min + (Math.PI/21600)*sec);
    ctx.strokeStyle = largeColor.value;
    ctx.beginPath();
    ctx.moveTo(-20,0);
    ctx.lineTo(70,0);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.restore();


    // drawing minute hands
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI/1000) *sec);
    ctx.strokeStyle = largeColor.value;
    ctx.beginPath();
    ctx.moveTo(-28,0);
    ctx.lineTo(112,0);
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.restore();


    // drawing second hand
    ctx.save();
    ctx.rotate(sec * Math.PI / 30);
    ctx.strokeStyle = secondColor.value;
    ctx.beginPath();
    ctx.moveTo(-28,0);
    ctx.lineTo(112,0);
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = '#ff7f50'
    ctx.beginPath();
    ctx.arc(0,0,10,0,Math.PI* 2, true);
    ctx.fill();
    ctx.restore();

   
    ctx.restore(); //this restores to the default state
    requestAnimationFrame(clock);
}
requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click',()=>{
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'clock.png';
  link.href = dataURL;
  link.click();

})