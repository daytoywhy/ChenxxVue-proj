<template>
  <div :id="id"
       ref="chartRef"
       :class="className"
       :style="{height:height,widht:width}"></div>
</template>

<script setup lang="ts">
import * as charts from "echarts";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
const chartRef = ref<HTMLElement>();
const chart = ref<any>();
const props = defineProps({
  id: {
    type: String,
    default: "",
    require: true,
  },
  className: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    require: true,
    default: () => "100%",
  },
  height: {
    type: String,
    require: true,
    default: () => "100%",
  },
  options: {
    type: Object,
    require: false,
    default: () => {},
  },
});
/**
 * @param data echart的配置，数据等
 * @param clearCaching 是否清除缓存，更新图表
 */
const initEchart = (data: any, clearCaching = false) => {
  if (data || props.options) {
    chart.value.setOption(data || props.options, clearCaching);
  }
};
const emit = defineEmits(["echart-click"]);
const handleClick = () => {
  emit("echart-click");
};
onMounted(() => {
  //实例化echart
  chart.value = charts.init(chartRef.value);
  chart.value.on("click", () => {
    handleClick();
  });
  initEchart();
});
onBeforeUnmount(() => {
  /**
   * @description //销毁实例，实例销毁后无法再被使用。
   */
  chart.value.dispose();
  chart.value = null;
});
watch(
  () => props.options,
  (val) => {
    val && initEchart();
  },
  {
    deep: true,
  }
);
defineExpose({
  chart,
  chartRef,
  initEchart,
});
</script>

<style lang="scss" scoped>
</style>
