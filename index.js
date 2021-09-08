let scoreBox = document.getElementById("scoreBox");
let startBox = document.getElementById("startBox");
let gameArea = document.getElementById("gameArea");

let player = { speed : 10 , score :0};
let keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function keydown(e) {
  keys[e.key] = true;
}

function keyup(e) {
  keys[e.key] = false;
}
function iscollide (a,b){
  carRect = a.getBoundingClientRect()
  enemyRect= b.getBoundingClientRect()
  return!((carRect.top>enemyRect.bottom) || (carRect.bottom<enemyRect.top)|| (carRect.left>
    enemyRect.right)|| (carRect.right<enemyRect.left))

}
function movelines(e){
  let roadlines = document.querySelectorAll('.roadline');
roadlines.forEach((item)=>{
  if(item.y>=700)
  {
    item.y -=750;
  }
item.y += player.speed;
item.style.top  = item.y + 'px';
})
}
function movecars(car){
  let enemyCars = document.querySelectorAll('.enemyCar');
  enemyCars.forEach((item)=>{
    if(iscollide(car,item))
    {
      endGame();
    }
    if(item.y >= 750)
    {
      item.y = -300;
      item.style.left = Math.floor(Math.random()*350) + 'px';
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';
  })
  

}
let score;
function gameAreaEvent(e) {
  let car = document.querySelector(".playcar");
  if (player.start) {
movelines();
movecars(car);
    if (keys.ArrowUp && player.y > 50) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < 550) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < 360) {
      player.x += player.speed;
    }
    car.style.top = player.y + "px";

    car.style.left = player.x + "px";

    window.requestAnimationFrame(gameAreaEvent);
     score = player.score++ ;
    scoreBox.innerHTML = 'Your Score: '+score;
  }
}
function endGame(){
player.start = false;
startBox.classList.remove("hide");
startBox.innerHTML = `Wohoooo!!! You score: ${score+1} <br> Click to Restart this game`;

}

startBox.addEventListener("click", () => {
  startBox.classList.add("hide");
  gameArea.innerHTML = '';

  player.start = true;
  window.requestAnimationFrame(gameAreaEvent);
  

  let road = document.createElement("div");
  road.setAttribute("class", "road");
  gameArea.appendChild(road);

for(let i=0 ; i<5 ; i++)
{
  let roadline = document.createElement('div');
  roadline.setAttribute('class','roadline');
  roadline.y = (i*150);
  roadline.style.top  = roadline.y + 'px';
  gameArea.appendChild(roadline);
}
let car = document.createElement("div");
  car.setAttribute("class", "playcar");
  car.setAttribute("id", "playcar");
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;


let roadlines = document.querySelector('.roadline');
let  domRect = roadlines.getBoundingClientRect();
console.log(domRect);
for(let i=0 ; i<3 ; i++)
{
  let enemyCar = document.createElement('div');
  enemyCar.setAttribute('class','enemyCar');
  gameArea.appendChild(enemyCar);
  enemyCar.style.backgroundColor = "Yellow";
  enemyCar.y = ((i +1)*350)*-1;
  enemyCar.style.top = enemyCar.y + 'px';
enemyCar.style.left = Math.floor(Math.random()*350) + 'px';
}
});
