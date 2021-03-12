'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const $field = document.querySelector('.game__field');
const $fieldRect = $field.getBoundingClientRect();

const $gameBtn = document.querySelector('.game__button');
const $icon = document.querySelector('.fa-play');
const $playBtn = document.querySelector('.play__button');

const $gameTimer = document.querySelector('.game__timer');
const $gameScore = document.querySelector('.game__score');
const $popUp = document.querySelector('.pop-up');
const $popUpRefreshBtn = document.querySelector('.pop-up__refresh');
const $popUpMessage = document.querySelector('.pop-up__message');

let started = false;  // 게임이 시작되었는지
let score = 0;  // 게임 스코어
let timer = undefined;  // 타이머는 게임 시작 후 세팅
let sec = 9;

$gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();

  } else {
    stratGame();
  }
  started = !started;
});

$popUpRefreshBtn.addEventListener('click', () => {
  $gameBtn.style.visibility = 'visible';
  $icon.classList.add('fa-play');
  $icon.classList.remove('fa-stop');
  $popUp.classList.add('pop-up__hide');


});

function stratGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}


function stopGame() {
  clearInterval(timer);
  $popUp.classList.remove('pop-up__hide');
  $gameBtn.style.visibility = 'hidden';

}



function showStopButton() {
  $icon.classList.add('fa-stop');
  $icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  $gameTimer.style.visibility = 'visible';
  $gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  $gameTimer.textContent = `${minutes}:${seconds}`;
}

function initGame() {
// 당근과 벌레를 생성한 뒤 $field에 추가
  // console.log($fieldRect);
  $field.innerHTML = ''; // 버튼 누를 때마다 리셋, 당근 버그가 쌓이지않음;
  $gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'carrot/img/carrot.png');
  addItem('bug', BUG_COUNT, 'carrot/img/bug.png');
}

function addItem(className, count, imgPath) {
  const $x1 = 0;
  const $y1 = 0;
  const $x2 = $fieldRect.width - CARROT_SIZE;  // 끄트머리에 x값 받으면 아이템이 밖으로 삐져나감
  const $y2 = $fieldRect.height - CARROT_SIZE;

  for (let i = 0 ; i < count ; i++) {
    const $item = document.createElement('img');
    $item.setAttribute('class', 'className');
    $item.setAttribute('src', imgPath);
    $item.style.position = 'absolute';
    const $x = randomNumber($x1, $x2);
    const $y = randomNumber($y1, $y2);
    $item.style.left = `${$x}px`;
    $item.style.top = `${$y}px`;
    $field.appendChild($item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// ---------------------------------------------------

// function setGame() {
//   $playBtn.classList.toggle('invisable');
//   $stopBtn.classList.toggle('invisable');

//   setTimer();
// }

// function setTimer() {
//   let sec = 9;  // 전역변수로 할당
//   function runTimer() {

//     if (sec < 0) {
//       return;
//     }
//     $gameTimer.textContent = `0:${sec}`;
//     sec--;
//   };
//   setInterval(runTimer, 1000);
// }

// function makeElement(src, alt) {
//   let $x = Math.floor(Math.random() * $fieldRect.x);
//   let $y = Math.floor(Math.random() * $fieldRect.y);
//   console.log($x, $y);

//   let $img = document.createElement('img');
//   $img.src = src;
//   $img.style.left = `${$x}px`;
//   $img.style.top = `${$y}px`;
//   $img.alt = alt;
//   $field.appendChild($img);
// }

// makeElement('carrot/img/carrot.png', 'carrot');
// makeElement('carrot/img/bug.png', 'bug');

