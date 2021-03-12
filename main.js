'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const $field = document.querySelector('.game__field');
const $fieldRect = $field.getBoundingClientRect();

const $gameBtn = document.querySelector('.game__button');
const $playBtn = document.querySelector('.play__button');

const $gameTimer = document.querySelector('.game__timer');
const $gameScore = document.querySelector('.game__score');
const $popUp = document.querySelector('.pop-up');
const $popUpRefreshBtn = document.querySelector('.pop-up__refresh');
const $popUpMessage = document.querySelector('.pop-up__message');

const $icon = document.querySelector('.fas');

const carrotSound = new Audio('./carrot/sound/carrot_pull.mp3');
const bugSound = new Audio('./carrot/sound/bug_pull.mp3');
const backGroundSound = new Audio('./carrot/sound/bg.mp3');
const winSound = new Audio('./carrot/sound/game_win.mp3');
const alertSound = new Audio('./carrot/sound/alert.wav');

let started = false;  // 게임이 시작되었는지
let score  // 게임 스코어
let timer = undefined;  // 타이머는 게임 시작 후 세팅


$field.addEventListener('click', onFieldClick);

$gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();

  } else {
    startGame();
  }
});

// 팝업 재시작 버튼
$popUpRefreshBtn.addEventListener('click', () => {
  startGame();
  hidePopUp();
  showPlayButton();
});



function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(backGroundSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('REPLAY❔');
  playSound(alertSound);
  stopSound(backGroundSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(backGroundSound);
  showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOST 🤧');
}

function showStopButton() {
  $icon.classList.add('fa-stop');
  $icon.classList.remove('fa-play');
}

function showPlayButton() {
  $gameBtn.style.visibility = 'visible';
  $icon.classList.add('fa-play');
  $icon.classList.remove('fa-stop');
}

function hideGameButton() {
  $gameBtn.style.visibility = 'hidden';
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
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  $gameTimer.textContent = `${minutes}:${seconds}`;
}

function showPopUpWithText(text) {
  $popUpMessage.textContent = text;
  $popUp.classList.remove('pop-up__hide');
}

function hidePopUp() {
  $popUp.classList.add('pop-up__hide');
}


function initGame() {
// 당근과 벌레를 생성한 뒤 $field에 추가
  // console.log($fieldRect);
  score = 0;

  $field.innerHTML = ''; // 버튼 누를 때마다 리셋, 당근 버그가 쌓이지않음;
  $gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'carrot/img/carrot.png');
  addItem('bug', BUG_COUNT, 'carrot/img/bug.png');
}

function onFieldClick(e) {
  if (!started) {
    return;
  }
  const target = e.target;

  if (target.matches('.carrot')) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    playSound(bugSound);
    finishGame(false);
  }
}
 
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  $gameScore.innerText = CARROT_COUNT - score;
}



function addItem(className, count, imgPath) {
  const $x1 = 0;
  const $y1 = 0;
  const $x2 = $fieldRect.width - CARROT_SIZE;  // 끄트머리에 x값 받으면 아이템이 밖으로 삐져나감
  const $y2 = $fieldRect.height - CARROT_SIZE;

  for (let i = 0 ; i < count ; i++) {
    const $item = document.createElement('img');
    $item.setAttribute('class', className);
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

