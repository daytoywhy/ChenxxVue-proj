<template>
  <el-dialog title="周报预览"
            v-model="visible"
            :footer="null"
            width="1000px"
            :body-style="{ height: '500px',overflow:'overlay',overflow:'auto'}">
    <div>
      <h3 style="text-align:center">{{ `第${week}周（${currentWeek}）主要工作情况汇报` }}</h3>
      <h5 style="text-align:center">{{ `生成时间：${nowDate}`}}</h5>
      <div class="div_content">
        <h3>一、项目总体情况</h3>
        <div>
          <h4>1、全区项目总体情况：</h4>
          <p>{{ weeklyInfo.projectInfo.allProjectInfo }}</p>
          <h4>2、全区DICT项目分类情况：</h4>
          <p>{{ weeklyInfo.projectInfo.allDictProjectInfo }}</p>
          <h4>2、全区支撑工作量汇总：</h4>
          <p>{{ weeklyInfo.projectInfo.allWorkload.text1 }}</p>
          <p>{{ weeklyInfo.projectInfo.allWorkload.text2 }}</p>
        </div>
      </div>
      <div class="div_content">
        <h3>二、重点项目/技术支撑情况</h3>
        <div v-if="weeklyInfo.importantprojectInfo">
          <div v-for="(item,index) in weeklyInfo.importantprojectInfo"
               :key="index">
            <h4>{{ `${index + 1}、${item.name }` }}</h4>
            <p v-for="(ele,index) in item.faTaskList"
               :key="index">
              <span class="title">{{ ele.projectName }}:</span>
              <span>{{ ele.content }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="div_content">
        <h3>三、基础管理工作：</h3>
        <div v-if="weeklyInfo.basicsManagerInfo">
          <div v-for="(item,index) in weeklyInfo.basicsManagerInfo"
               :key="index">
            <h4>{{ `${index + 1}、${item.name }` }}</h4>
            <p v-for="(ele,index) in item.faTaskList"
               :key="index">
              <span class="title">{{ ele.projectName }}:</span>
              <span>{{ ele.content }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="div_content">
        <h3>四、巡检类工作</h3>
        <div v-if="weeklyInfo.inspectionInfo">
          <div v-for="(item,index) in weeklyInfo.inspectionInfo"
               :key="index">
            <p>
              <span class="title">{{ item.projectName }}:</span>
              <span>{{ item.content }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, reactive, toRefs, onMounted,defineExpose } from "vue";
const { proxy:{ $dayjs} } = getCurrentInstance();
const state = reactive({
  visible: false,
  week: null,
  currentWeek: "",
  nowDate: "",
  weeklyInfo: {
    projectInfo: {
      allDictProjectInfo: null,
      allProjectInfo: null,
      allWorkload: {
        text1: null,
        text2: null,
      },
    },
  },
});

const { visible, week, currentWeek, nowDate, weeklyInfo } = toRefs(state);

onMounted(() => {
  let date = $dayjs().format("YYYY-MM-DD")
  let weekDate = $dayjs(date).week()
  week.value = weekDate;
  currentWeek.value = getCurrentWeek()
  nowDate.value = $dayjs().format(
    "YYYY-MM-DD HH:mm:ss"
  );
});

const getCurrentWeek = () => {
  let start = $dayjs().day(1).format("MM.DD");
  let end = $dayjs().day(7).format("MM.DD");
  return `${start} - ${end}`;
};

const show = ()=>{
  visible.value = true
}

defineExpose({
  show,
});
// export default {
//   data () {
//     return {
//       visible: false,
//       week: null,
//       currentWeek: '',
//       nowDate: '',
//       weeklyInfo: {
//         projectInfo: {
//           allDictProjectInfo: null,
//           allProjectInfo: null,
//           allWorkload: {
//             text1: null,
//             text2: null,
//           },
//         }
//       },
//     }
//   },
//   mounted () {
//     let date = this.$moment(new Date, 'YYYYMMDD').format('YYYY-MM-DD')
//     let week = this.$moment(date).week()
//     this.week = week
//     this.currentWeek = this.getCurrentWeek()
//     this.nowDate = this.$moment(new Date(), 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
//   },
//   methods: {
//     show () {
//       this.qryWeekly()
//     },
//     qryWeekly () {
//       const params = {
//         isQryAll: false
//       }
//       projectApi.qryWeekly(params).then(res => {
//         this.weeklyInfo = res.object
//         this.visible = true
//       })
//     },
//     getCurrentWeek () {
//       let start = this.$moment().weekday(1).format('MM.DD')
//       let end = this.$moment().weekday(7).format('MM.DD')
//       return `${start} - ${end}`
//     }
//   }
// }
</script>

<style scoped>
.div_content {
  padding: 0 30px;
  margin: 16px 0;
}
h4 {
  margin: 16px 0 16px 30px;
}
div p {
  margin-left: 30px;
  margin-bottom: 10px;
}
.title {
  font-weight: 700;
  margin-right: 5px;
}
</style>