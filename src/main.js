'use strict';

import POPUP from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new POPUP();
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(5)
  .withbugCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'Replaly ? 🕹';
      sound.playAlert();
      break;
    case Reason.win:
      message = 'You won 👏🏻';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'You lost 🤡';
      sound.playBug();
      break;
    default:
      throw new Error('Not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
