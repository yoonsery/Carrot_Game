'use strict';

import POPUP from './popup.js';
import { gameBuilder, Reason } from './game.js';

// const CARROT_COUNT = 5;
// const BUG_COUNT = 5;
// const GAME_DURATION_SEC = 5;

const gameFinishBanner = new POPUP();
const game = new gameBuilder()
  .withGameDuration(5)
  .withCarrotCount(5)
  .withbugCount(5)
  .build();

// const game = new Game(5, 5, 5);
// 생성자에 인수가 3개 이상 넘어가는 경우 인자를 이렇게 숫자로 표기하는 건 좋지않음
// so gameBuilder 클래스를 만들거다~

game.setGameListener(reason => {

   let message;
   switch (reason) {
     case Reason.cancel:
       message = 'REPLAY? 🤔';
      break;
    case Reason.win:
      message = 'YOU WON 🥳';
      break;
    case Reason.lose:
      message = 'YOU LOST 😵';
      break;
    default:
      throw new Error('not valid reason');
   }
   gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});

// function onItemClick(item) {
//   if (!started) {
//     return;
//   }  // class Field는 게임이 시작했는지 안했는지 모르므로 얘는 냅둠

//   if (item === 'carrot') {
//     score++;    // 필드는 모르므로 필드클래스에서 삭제
//     updateScoreBoard();  // 필드는 모르므로 필드클래스에서 삭제
//     if (score === CARROT_COUNT) { // 필드는 모르므로 필드클래스에서 삭제
//       finishGame(true);
//     }
//   } else if (item === 'bug') {
//     finishGame(false);
//   }
// }

// $gameBtn.addEventListener('click', () => {
//   if (started) {
//     stopGame();
//   } else {
//     startGame();
//   }
// });


// function finishGame(win) {
//   started = false;
//   hideGameButton();
//   if (win) {
//     sound.playWin();
//   } else {
//     sound.playBug();
//   }
//   stopGameTimer();  // 타이머 초기화. 안하면 게임 여러번 실행시 졌다는 팝업창이 계속~
//   sound.stopBackground();
//   gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 🤧');
// }

// function showStopButton() {
//   const $icon = document.querySelector('.fas');
//   $icon.classList.add('fa-stop');
//   $icon.classList.remove('fa-play');
//   $gameBtn.style.visibility = 'visible';
// }

// function hideGameButton() {
//   $gameBtn.style.visibility = 'hidden';
// }

// function showTimerAndScore() {
//   $gameTimer.style.visibility = 'visible';
//   $gameScore.style.visibility = 'visible';
// }

// function startGameTimer() {
//   let remainingTimeSec = GAME_DURATION_SEC;
//   updateTimerText(remainingTimeSec);
//   timer = setInterval(() => {
//     if (remainingTimeSec <= 0) {
//       clearInterval(timer);
//       finishGame(CARROT_COUNT === score);  // true 면 이긴거고 false면 진 거
//       return;
//     }
//     updateTimerText(--remainingTimeSec);
//   }, 1000);
// }

// function stopGameTimer() {
//   clearInterval(timer);
// }

// function updateTimerText(time) {
//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;
//   $gameTimer.textContent = `${minutes}:${seconds}`;
// }


// function initGame() {
// // 당근과 벌레를 생성한 뒤 $field에 추가
//   // console.log($fieldRect);
//   score = 0;
//   $gameScore.innerText = CARROT_COUNT;
//   gameField.init();

// }


// function updateScoreBoard() {
//   $gameScore.innerText = CARROT_COUNT - score;
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

