<template>
  <div class="chart-content">
    <my-charts @echart-click="handleClick"
               :options="state.options"
               id="chartBord"
               width="100%"
               height="200px"></my-charts>
  </div>
</template>

<script setup lang="ts">
import { tr } from "element-plus/es/locale";
import { PropType, reactive, toRefs, watch } from "vue";
interface ListType {
  name: string;
  value: number;
  suffix: string;
}
const props = defineProps({
  list: {
    type: Array as PropType<ListType>,
    default: () => [],
  },
});

const { list } = toRefs(props);
const state = reactive({
  options: {},
});
let yAxisData = [];
let seriesData = [];
const colorList = ["#0d7abb", "#42acd6", "#0d9b8e"];
const getData = () => {
  for (const { name, value } of list.value) {
    yAxisData.push(name);
    seriesData.push(value);
  }
};
getData();
const getMaxVal = (arr) => {
  const max = arr.reduce((a, b) => {
    return b > a ? b : a;
  });
  const maxInt = Math.ceil(max / 9.5);
  const maxVal = maxInt * 10;
  return maxVal;
};
const maxValue = getMaxVal(seriesData);
watch(
  () => list.value,
  () => {
    state.options = {
      //   text: '指标'
      // },
      xAxis: [
        {
          type: "value",
          // 最小值
          min: 0,
          // 最大值
          max: maxValue,
          //  平均分为5份
          interval: maxValue / 5,
          // 坐标轴在图表区域中的分隔线
          splitLine: {
            show: true,
            //   lineStyle: {
            //     color: ''
            //   }
          },
          splitNumber: 5,
          // 坐标轴轴线
          axisLine: {
            show: false,
          },
          // 坐标轴刻度标签
          axisLabel: {
            show: true,
            color: "rgba(0,0,0,0.45)",
            fontWeight: "bold",
            formatter: `{value}`,
          },
          triggerEvent: true,
        },
      ],
      yAxis: [
        {
          type: "category",
          data: yAxisData,
          // 坐标轴轴线
          axisLine: {
            show: false,
          },
          // 坐标轴刻度
          axisTick: {
            alignWithLabel: true,
          },
          // 坐标轴刻度标签
          axisLabel: {
            show: true,
            color: "rgba(0,0,0,0.45)",
            fontWeight: "bold",
            interval: "auto",
            formatter: `{value}`,
          },
        },
      ],
      // 动态加载时不能直接对legend赋值。需定义变量构建对象，然后在赋值给option.legend = legend;
      legend: {
        data: seriesData,
      },
      series: [
        {
          data: list.value,
          type: "bar",
          // 柱形显示数值
          label: {
            // 柱图头部显示值
            show: true,
            position: "right",
            color: "#333",
            fontSize: "16px",
            formatter: (params) => {
              return params.value[params.encode.x[0]];
            },
          },
          // 柱体宽度
          barWidth: 18,
          // 柱体显示不同颜色
          itemStyle: {
            color: (params) => {
              // 核心代码
              return `${colorList[params.dataIndex]}`;
            },
          },
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
      // 图表主体内容四周的留白
      grid: {
        top: "0px",
        // 右边要有间距才不会遮住横轴最后的坐标
        right: "10px",
        bottom: "10px",
        left: "0px",
        // 当echarts是获取动态数据绘图时，就可能会出现坐标轴的label过长溢出的情况
        // 设置containLabel: true来防止标签溢出
        containLabel: true,
      },
    };
  },
  {
    deep: true,
    immediate: true,
  }
);
const handleClick = (): void => {};
</script>
