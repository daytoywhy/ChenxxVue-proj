<template>
  <span class="my-count-to"
        :style="{color:color,fontSize: fontSize}">{{state.displayVal}}</span>
</template>

<script setup lang="ts">
import { isNumber } from "@/utils/is";
import { progressProps } from "element-plus";
import { reactive, unref, toRefs, onMounted, watch, computed } from "vue";
const props = defineProps({
  //起始值
  startVal: {
    type: Number,
    require: false,
    default: () => 1,
  },
  //最终值
  endVal: {
    type: Number,
    require: false,
    default: () => 2022,
  },
  //动画时间
  duration: {
    type: Number,
    require: false,
    default: () => 3000,
  },
  //是否自动播放，当 为true 时，它会在 startVal 或 endVal 改变时自动开始
  autoPlay: {
    type: Boolean,
    require: false,
    default: () => true,
  },
  //几位小数
  decimals: {
    type: Number,
    require: false,
    default: 0,
    validator(value) {
      return value >= 0;
    },
  },
  //小数点
  decimal: {
    type: String,
    require: false,
    default: () => ".",
  },
  //分割符
  separator: {
    type: String,
    require: false,
    default: () => ",",
  },
  //前缀
  prefix: {
    type: String,
    require: false,
    default: () => "",
  },
  //后缀
  suffix: {
    type: String,
    require: false,
    default: () => "",
  },
  //颜色
  color: {
    type: String,
    require: false,
    default: () => "",
  },
  //字体大小
  fontSize: {
    type: String,
    require: false,
    default: () => "16px",
  },
  //是否使用缓动效果
  useEasing: {
    type: Boolean,
    require: false,
    default: () => true,
  },
  // 缓动函数
  easingFn: {
    type: Function,
    default: (t, b, c, d) => {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
    },
  },
});
const emit = defineEmits(["mounted", "callback"]);
const formatNumber = (num: Number | String) => {
  const { decimals, decimal, separator, suffix, prefix } = props;
  num = Number(num).toFixed(decimals);
  num += "";
  const x = num.split(".");
  let x1 = x[0];
  let x2 = x.length > 1 ? decimal + x[1] : "";
  const reg = /(\d+)(\d{3})/;
  if (separator && !isNumber(separator)) {
    while (reg.test(x1)) {
      x1 = x1.replace(reg, "$1" + separator + "$2");
    }
  }
  return prefix + x1 + x2 + suffix;
};
const state = reactive<{
  localStartVal: number;
  displayVal: string;
  printVal: number | null;
  paused: boolean;
  localDuration: number | null;
  startTime: number | null;
  timeStamp: number | null;
  remaining: number | null;
  rAF: any;
  color: string;
  fontSize: string;
}>({
  localStartVal: props.startVal,
  displayVal: formatNumber(props.startVal),
  printVal: null,
  paused: false,
  localDuration: props.duration,
  startTime: null,
  timeStamp: null,
  remaining: null,
  rAF: null,
  color: "#fff",
  fontSize: "16px",
});
watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoPlay) {
    start();
  }
});
const start = () => {
  const { startVal, duration, color, fontSize } = props;
  state.localStartVal = startVal;
  state.startTime = null;
  state.localDuration = duration;
  state.color = color;
  state.fontSize = fontSize;
  state.paused = false;
  state.rAF = requestAnimationFrame(count);
  console.log(111);
};
const getCountDown = computed(() => {
  return props.startVal > props.endVal;
});
const count = (timeStamp: number) => {
  const { useEasing, easingFn, endVal } = props;
  if (!state.startTime) state.startTime = timeStamp;
  state.timeStamp = timeStamp;
  const progress = timeStamp - state.startTime;
  if (useEasing) {
    if (unref(getCountDown)) {
      state.printVal =
        state.localStartVal -
        easingFn(
          progress,
          0,
          state.localStartVal - endVal,
          state.localDuration as number
        );
    } else {
      state.printVal = easingFn(
        progress,
        state.localStartVal,
        endVal - state.localStartVal,
        state.localDuration as number
      );
    }
  } else {
    if (unref(getCountDown)) {
      state.printVal =
        state.localStartVal -
        (state.localStartVal - endVal) *
          (progress / (state.localDuration as number));
    } else {
      state.printVal =
        state.localStartVal +
        (endVal - state.localStartVal) *
          (progress / (state.localDuration as number));
    }
  }
  if (unref(getCountDown)) {
    state.printVal = state.printVal < endVal ? endVal : state.printVal;
  } else {
    state.printVal = state.printVal > endVal ? endVal : state.printVal;
  }
  state.displayVal = formatNumber(state.printVal);
  if (progress < (state.localDuration as number)) {
    state.rAF = requestAnimationFrame(count);
  } else {
    emit("callback");
  }
};

onMounted(() => {
  console.log(props.autoPlay, 333);

  if (props.autoPlay) {
    console.log(22);

    start();
  }
  emit("mounted");
});
</script>
