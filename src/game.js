'use strict';
import Field from './field.js';
import * as sound from './sound.js';



export default class Game {

  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.$gameTimer = document.querySelector('.game__timer');
    this.$gameScore = document.querySelector('.game__score');
    this.$gameBtn = document.querySelector('.game__button');
    this.$gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });


    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;  // 게임이 시작되었는지
    this.score  // 게임 스코어
    this.timer = undefined;  // 타이머는 게임 시작 후 세팅

  }

  // 게임이 끝나면 알려줄 수 있도록 콜백받아옴
  setGameListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop('cancel');
  }

  finish(win) {
    this.started = false;
    this.hideGameButton();
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    this.stopGameTimer();  // 타이머 초기화. 안하면 게임 여러번 실행시 졌다는 팝업창이 계속~
    sound.stopBackground();
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }  // class Field는 게임이 시작했는지 안했는지 모르므로 얘는 냅둠

    if (item === 'carrot') {
      this.score++;    // 필드는 모르므로 필드클래스에서 삭제
      this.updateScoreBoard();  // 필드는 모르므로 필드클래스에서 삭제
      if (this.score === this.carrotCount) { // 필드는 모르므로 필드클래스에서 삭제
        this.finish(true);
      }
    } else if (item === 'bug') {
      this.finish(false);
    }
  }

  showStopButton() {
    const $icon = document.querySelector('.fas');
    $icon.classList.add('fa-stop');
    $icon.classList.remove('fa-play');
    this.$gameBtn.style.visibility = 'visible';
  }

  hideGameButton() {
    this.$gameBtn.style.visibility = 'hidden';
  }
  showTimerAndScore() {
    this.$gameTimer.style.visibility = 'visible';
    this.$gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);  // true 면 이긴거고 false면 진 거
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.$gameTimer.textContent = `${minutes}:${seconds}`;
  }

  initGame() {
    // 당근과 벌레를 생성한 뒤 $field에 추가
      // console.log($fieldRect);
    this.score = 0;
    this.$gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.$gameScore.innerText = this.carrotCount - this.score;
  }
}
