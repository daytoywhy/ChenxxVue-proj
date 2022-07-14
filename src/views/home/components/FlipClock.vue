<template>
  <div class="flip-clock">
    <FlipItem ref="flipperHour1" />
    <FlipItem ref="flipperHour2" />
    <em>:</em>
    <FlipItem ref="flipperMinutes1" />
    <FlipItem ref="flipperMinutes2" />
    <em>:</em>
    <FlipItem ref="flipperSecond1" />
    <FlipItem ref="flipperSecond2" />
  </div>
</template>

<script setup lang="ts">
import FlipItem from "./components/FlipItem.vue";
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { formatDate } from "@/utils/date";
const timer = ref(null);
const flipObjs = ref([]);
onMounted(() => {
  const vm = getCurrentInstance();
  flipObjs.value = [
    vm.refs.flipperHour1,
    vm.refs.flipperHour2,
    vm.refs.flipperMinutes1,
    vm.refs.flipperMinutes2,
    vm.refs.flipperSecond1,
    vm.refs.flipperSecond2,
  ];
  init();
  run();
});
const init = () => {
  const now = new Date();
  const nowTimeStr = formatDate(new Date(now.getTime()), "hhiiss");

  for (let i = 0; i < flipObjs.value.length; i++) {
    flipObjs.value[i].setFront(nowTimeStr[i]);
  }
};
const run = () => {
  timer.value = setInterval(() => {
    const now = new Date();
    const nowTimeStr = formatDate(new Date(now.getTime() - 1000), "hhiiss");
    const nextTimeStr = formatDate(now, "hhiiss");
    for (let i = 0; i < flipObjs.value.length; i++) {
      if (nowTimeStr[i] === nextTimeStr[i]) {
        continue;
      }
      flipObjs.value[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
    }
  }, 1000);
};
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
});
</script>

<style lang="scss" scoped>
.flip-clock .m-flipper {
  margin: 0 3px;
}
.flip-clock {
  em {
    font-size: 66px;
    line-height: 102px;
    vertical-align: top;
    font-style: normal;
  }
}
</style>
