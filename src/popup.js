'use strict';

export default class POPUP {
  constructor(){
    this.$popUp = document.querySelector('.pop-up');
    this.$popUpRefreshBtn = document.querySelector('.pop-up__refresh');
    this.$popUpMessage = document.querySelector('.pop-up__message');
    this.$popUpRefreshBtn.addEventListener('click', () => {
      this.onClick && this.onClick();  // 등록된 멤버 변수가 있으면 실행.
      this.hide();
    });
  }

  setClickListener(onClick) { // onClick이라는 멤버변수(=함수를 가르킴) 만듦
    this.onClick = onClick;  //전달받은 온클릭 멤버변수 인자를 this.onClick에 할당해줌

  }

  showWithText(text) {
    this.$popUpMessage.textContent = text;
    this.$popUp.classList.remove('pop-up__hide');
  }

  hide() {
    this.$popUp.classList.add('pop-up__hide');
  }
}


