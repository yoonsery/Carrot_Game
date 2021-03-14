'use strict';

const carrotSound = new Audio('./carrot/sound/carrot_pull.mp3');
const bugSound = new Audio('./carrot/sound/bug_pull.mp3');
const backgroundSound = new Audio('./carrot/sound/bg.mp3');
const winSound = new Audio('./carrot/sound/game_win.mp3');
const alertSound = new Audio('./carrot/sound/alert.wav');

export function playCarrot() {
  playSound(carrotSound);
}

export function playBug() {
  playSound(bugSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playWin() {
  playSound(winSound);
}

export function playBackground() {
  playSound(backgroundSound);
}

export function stopBackground() {
  stopSound(backgroundSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

