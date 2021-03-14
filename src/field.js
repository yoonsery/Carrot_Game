'use strict';
const carrotSound = new Audio('./carrot/sound/carrot_pull.mp3');
const CARROT_SIZE = 80;

export default  class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.$field = document.querySelector('.game__field');
    this.$fieldRect = this.$field.getBoundingClientRect();
    this.$field.addEventListener('click', this.onClick);
  }

  init() {
    this.$field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, 'carrot/img/carrot.png');
    this._addItem('bug', this.bugCount, 'carrot/img/bug.png');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  //함수명 앞에_ 붙이는 건 내부에서 쓰는 프라이빗한 함수인걸 표시
  // JS에선 아직 프라이빗 함수가 없어서 _로 표시하지만, 이건 옛날 방식이므로 낫굿
  _addItem(className, count, imgPath) {
    const $x1 = 0;
    const $y1 = 0;
    const $x2 = this.$fieldRect.width - CARROT_SIZE;  // 끄트머리에 x값 받으면 아이템이 밖으로 삐져나감
    const $y2 = this.$fieldRect.height - CARROT_SIZE;

    for (let i = 0 ; i < count ; i++) {
      const $item = document.createElement('img');
      $item.setAttribute('class', className);
      $item.setAttribute('src', imgPath);
      $item.style.position = 'absolute';
      const $x = randomNumber($x1, $x2);
      const $y = randomNumber($y1, $y2);
      $item.style.left = `${$x}px`;
      $item.style.top = `${$y}px`;
      this.$field.appendChild($item);
    }
  }

  onClick = (e) => {
    const target = e.target;

    if (target.matches('.carrot')) {
      target.remove();
      playSound(carrotSound);
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
    }
  };
}

// 랜덤넘버는 필드 클래스와 무관,
// 클래스 밖에 두면 클래스 생성때마다 오브젝트에 만들어지지 않아 더 효율적
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
