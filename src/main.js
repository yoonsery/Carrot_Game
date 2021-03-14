'use strict';

import POPUP from './popup.js';
import Field from './field.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

//[필드]  const $field = document.querySelector('.game__field');
//[필드]  const $fieldRect = $field.getBoundingClientRect();

const $gameBtn = document.querySelector('.game__button');
const $gameTimer = document.querySelector('.game__timer');
const $gameScore = document.querySelector('.game__score');

const carrotSound = new Audio('./carrot/sound/carrot_pull.mp3');
const bugSound = new Audio('./carrot/sound/bug_pull.mp3');
const backGroundSound = new Audio('./carrot/sound/bg.mp3');
const winSound = new Audio('./carrot/sound/game_win.mp3');
const alertSound = new Audio('./carrot/sound/alert.wav');

let started = false;  // 게임이 시작되었는지
let score  // 게임 스코어
let timer = undefined;  // 타이머는 게임 시작 후 세팅

const gameFinishBanner = new POPUP();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }  // class Field는 게임이 시작했는지 안했는지 모르므로 얘는 냅둠
  // const target = e.target;

  if (item === 'carrot') {
    score++;    // 필드는 모르므로 필드클래스에서 삭제
    updateScoreBoard();  // 필드는 모르므로 필드클래스에서 삭제
    //[필드] target.remove();
    //[필드] playSound(carrotSound);
    if (score === CARROT_COUNT) { // 필드는 모르므로 필드클래스에서 삭제
      finishGame(true);
    }
  } else if (item === 'bug') {
    finishGame(false);
    //[필드] playSound(bugSound);
  }
}


// $field.addEventListener('click', onFieldClick);

$gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

// [팝업] 팝업 재시작 버튼
// $popUpRefreshBtn.addEventListener('click', () => {
//   startGame();
//   // hidePopUp();
// });

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
  gameFinishBanner.showWithText('REPLAY❔')
  //  [팝업] showPopUpWithText('REPLAY❔');
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
  stopGameTimer();  // 타이머 초기화. 안하면 게임 여러번 실행시 졌다는 팝업창이 계속~
  stopSound(backGroundSound);
  gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 🤧');
  // [팝업]  showPopUpWithText(win ? 'YOU WON 🎉' : 'YOU LOST 🤧');
}

function showStopButton() {
  const $icon = document.querySelector('.fas');
  $icon.classList.add('fa-stop');
  $icon.classList.remove('fa-play');
  $gameBtn.style.visibility = 'visible';
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
      finishGame(CARROT_COUNT === score);  // true 면 이긴거고 false면 진 거
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

// [팝업]  function showPopUpWithText(text) {
//   $popUpMessage.textContent = text;
//   $popUp.classList.remove('pop-up__hide');
// }

// [팝업]  function hidePopUp() {
//   $popUp.classList.add('pop-up__hide');
// }

function initGame() {
// 당근과 벌레를 생성한 뒤 $field에 추가
  // console.log($fieldRect);
  score = 0;
  $gameScore.innerText = CARROT_COUNT;
  gameField.init();

  //[필드]  $field.innerHTML = ''; // 버튼 누를 때마다 리셋, 당근 버그가 쌓이지않음;
  // [필드] addItem('carrot', CARROT_COUNT, 'carrot/img/carrot.png');
  // [필드] addItem('bug', BUG_COUNT, 'carrot/img/bug.png');
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

// [필드] function addItem(className, count, imgPath) {
//   const $x1 = 0;
//   const $y1 = 0;
//   const $x2 = $fieldRect.width - CARROT_SIZE;  // 끄트머리에 x값 받으면 아이템이 밖으로 삐져나감
//   const $y2 = $fieldRect.height - CARROT_SIZE;

//   for (let i = 0 ; i < count ; i++) {
//     const $item = document.createElement('img');
//     $item.setAttribute('class', className);
//     $item.setAttribute('src', imgPath);
//     $item.style.position = 'absolute';
//     const $x = randomNumber($x1, $x2);
//     const $y = randomNumber($y1, $y2);
//     $item.style.left = `${$x}px`;
//     $item.style.top = `${$y}px`;
//     $field.appendChild($item);
//   }
// }

// [필드] function randomNumber(min, max) {
//   return Math.random() * (max - min) + min;
// }

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

