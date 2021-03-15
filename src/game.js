'use strict';
import { ItemType, Field } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder pattern
export class gameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withbugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    console.log(this);
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount,
    );
  }
}


class Game {

  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.$gameTimer = document.querySelector('.game__timer');
    this.$gameScore = document.querySelector('.game__score');
    this.$gameBtn = document.querySelector('.game__button');
    this.$gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });


    this.gameField = new Field(carrotCount, bugCount);
    // this.gameField = new Field(this.carrotCount, this.bugCount, () => this.started);
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

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }


  onItemClick = (item) => {
    if (!this.started) {
      return;
    }  // class Field는 게임이 시작했는지 안했는지 모르므로 얘는 냅둠

    if (item === ItemType.carrot) {
      this.score++;    // 필드는 모르므로 필드클래스에서 삭제
      this.updateScoreBoard();  // 필드는 모르므로 필드클래스에서 삭제
      if (this.score === this.carrotCount) { // 필드는 모르므로 필드클래스에서 삭제
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  }

  showStopButton() {
    const $icon = document.querySelector('.fas');
    $icon.classList.add('fa-stop');
    // $icon.classList.remove('fa-play');
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
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);  // true 면 이긴거고 false면 진 거
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
    this.updateScoreBoard(this.score);
    this.gameField.init();
  }

  updateScoreBoard() {
    this.$gameScore.innerText = this.carrotCount - this.score;
  }
}
