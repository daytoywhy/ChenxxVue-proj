<template>
  <div :class="`m-flipper ${flipType} ${isFlipping ? 'go' : ''}`">
    <div :class="`digital front ${textClass(frontText)}`"></div>
    <div :class="`digital back ${textClass(backText)}`"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";
const frontText = ref(0);
const backText = ref(1);
const duration = ref(600);
const isFlipping = ref(false);
const flipType = ref("down");
const textClass = (number: number) => {
  return "number" + number;
};
const flip = (type: string, front: number, back: number) => {
  if (isFlipping.value) return;
  frontText.value = front;
  backText.value = back;
  flipType.value = type;
  isFlipping.value = true;
  setTimeout(() => {
    isFlipping.value = false;
    frontText.value = back;
  }, duration.value);
};

const flipDown = (front: number, back: number): void => {
  flip("down", front, back);
};
const flipUp = (front: number, back: number): void => {
  flip("up", front, back);
};
const setFront = (text: number): void => {
  frontText.value = text;
};
const setBack = (text: number): void => {
  backText.value = text;
};
defineExpose({
  flipDown,
  flipUp,
  setFront,
  setBack,
});
</script>

<style lang="scss" scoped>
.m-flipper {
  display: inline-block;
  width: 60px;
  height: 100px;
  line-height: 100px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  color: #fff;
  font-size: 66px;
  text-align: center;
  position: relative;
  .digital:after,
  .digital:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    background: #000;
    overflow: hidden;
    box-sizing: border-box;
  }
  .digital:before {
    top: 0;
    bottom: 50%;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #666;
  }
  .digital:after {
    top: 50%;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    line-height: 0;
  }

  /**
  向下翻
   */
  &.down {
    .front::after,
    .back::before {
      z-index: 1;
    }
    .front::before {
      z-index: 3;
    }
    .back::after {
      z-index: 2;
      transform-origin: 50% 0;
      transform: perspective(160px) rotateX(180deg);
    }
    &.go {
      .front::before {
        transform-origin: 50% 100%;
        animation: frontFlipDown 0.6s ease-in-out both;
        box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
        backface-visibility: hidden;
      }
      .back::after {
        animation: backFlipDown 0.6s ease-in-out both;
      }
    }
  }

  /*向上翻*/
  &.up {
    .front:after {
      z-index: 3;
    }
    .front:before,
    .back:after {
      z-index: 1;
    }
    &.go {
      .front:after {
        transform-origin: 50% 0;
        animation: frontFlipUp 0.6s ease-in-out both;
        box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
        backface-visibility: hidden;
      }
      .back:before {
        animation: backFlipUp 0.6s ease-in-out both;
      }
    }
  }
  .number0:before,
  .number0:after {
    content: "0";
  }

  .number1:before,
  .number1:after {
    content: "1";
  }

  .number2:before,
  .number2:after {
    content: "2";
  }

  .number3:before,
  .number3:after {
    content: "3";
  }
  .number4:before,
  .number4:after {
    content: "4";
  }

  .number5:before,
  .number5:after {
    content: "5";
  }

  .number6:before,
  .number6:after {
    content: "6";
  }

  .number7:before,
  .number7:after {
    content: "7";
  }

  .number8:before,
  .number8:after {
    content: "8";
  }

  .number9:before,
  .number9:after {
    content: "9";
  }
}
@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
</style>
