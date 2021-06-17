'use strict';

export default class Popup {
  constructor() {
    this.$popUp = document.querySelector('.pop-up');
    this.$popUpRefreshBtn = document.querySelector('.pop-up__refresh');
    this.$popUpMessage = document.querySelector('.pop-up__message');
    
    this.$popUpRefreshBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.$popUpMessage.textContent = text;
    this.$popUp.classList.remove('pop-up__hide');
  }

  hide() {
    this.$popUp.classList.add('pop-up__hide');
  }
}
