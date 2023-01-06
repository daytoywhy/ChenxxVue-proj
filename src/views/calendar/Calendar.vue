<template>
  <div id="calendar-container">
    <FullCalendar :options="calendarOptions"
                  ref="fullCalendarRef" />
                  <weekly ref="weeklyRef"/>
                  <Action ref="actionRef" />
  </div>
</template>

<script setup lang="ts">
import Weekly from './components/Weekly.vue'
import Action from './components/Action.vue'
import {articleApi } from '@/api'
import { ref,reactive,toRefs, onMounted } from 'vue'
import '@fullcalendar/core/vdom' // solve problem with Vite
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import listPlugin from '@fullcalendar/list'
const weeklyRef = ref(null)
const actionRef = ref(null)
const FullCalendarRef = ref<InstanceType<typeof FullCalendar>>
const state = reactive({
  calendarOptions:{
    plugins: [dayGridPlugin, interactionPlugin, resourceTimelinePlugin, listPlugin],
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives', //license
    // schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',     
    //timeZone: 'local',
    //initialDate: '2022-08-30',
    timeZone: 'Asia/Shanghai',
    initialView: 'resourceTimelineMonth',
    locale: 'zh-cn',
    resourceAreaWidth: '300px',
    aspectRatio: 2.2,
    eventColor: '#3BB2E3', // 全部日历日程背景色
    slotMinWidth: 83, //timeline day格子的宽度
    editable: true,
    selectable: true,
    selectMirror: true,
    fixedWeekCount: true,
    lazyFetching: true,//默认值为true。为true的时候，FullCalendar只有在真正需要的时候才去加载数据。从缓存中取得需要的数据。当设置为false的时候，每次切换FullCalendar都会重新加载数据（不使用缓存）。
    noEventsContent: '没有工作安排',
    displayEventTime: false, //是否事件前显示时间
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday
      // startTime: '8:30',
      // endTime: '18:00',
    },
    headerToolbar: {
      left: '',
      center: 'title',
      right: 'resourceTimelineMonth,resourceTimelineYear,custom_prev,custom_next listWeek,listMonth custom_weekly'
    },
    views: {
      resourceTimelineMonth: { buttonText: '月管控表' },
      resourceTimelineYear: { buttonText: '年管控表' },
      listWeek: { buttonText: '本周工作汇总' },
      listMonth: { buttonText: '本月工作汇总' },
    },
    customButtons: {
      custom_weekly: {
        text: "预览周报",
        icon: "",
        click:  () => {
          showWeekly()
        }
      },
      // custom_me: {
      //   text: "只看自己",
      //   icon: "",
      //   click: function (arg) {
      //     if (arg.target.innerText == '只看自己') {

      //       arg.target.innerText = '查看所有';
      //     } else {
      //       arg.target.innerText = '只看自己';
      //     }
      //   }
      // },
      custom_prev: {
        text: "<<",
        icon: "chevron-left",
        click: () => {
          custom_prev()
        }
      },
      custom_next: {
        text: '>>',
        icon: "chevron-right",
        click: () => {
         custom_next()
        }
      }
    },
    select: (arg) => {
      handleEventClick(arg)
    },
    eventClick: (arg) => {
      eventClick(arg)
    },
    eventMouseEnter: function (arg) {
      if (arg.view.type == "listWeek" || arg.view.type == "listMonth") {
        return
      }
      const layui = window.layui
      layui.use(['layer'], () => {
        const layer = layui.layer
        layer.tips(arg.event.title, arg.el, { tips: [2, '#2C3E50'], time: 60000 });
      })
    },
    eventMouseLeave: function (mouseLeaveInfo) {
      const layui = window.layui
      layui.use(['layer'], () => {
        const layer = layui.layer
        layer.closeAll('tips');
      })
    },
    loading: function (isLoading, view) {

    },
    resourceAreaHeaderContent: '我的项目',
    resourceGroupField: 'projectTypeName',
    resources: [],
    events: function(options,callback){
      const params = {
      startdate:options.startStr.replace('T',' '),
      endStr:options.endStr.replace('T',' '),
    }
    articleApi.getCalendarList(params).then(res=>{
      callback(res.data.calendarList)
    })
    }, //背景色 (添加相同时间的背景色时颜色会重叠) 
    eventDataTransform: function (eventData) {
      let taskType = eventData.extendedProps.taskType;
      //日常
      if (taskType >= 100 && taskType <= 199) {
        eventData.backgroundColor = "#1cdcb6";
      }
      //重保
      if (taskType >= 200 && taskType <= 299) {
        eventData.backgroundColor = "red";
      }
      //巡检
      if (taskType >= 300 && taskType <= 399) {
        eventData.backgroundColor = "blue";
      }
      eventData.textColor = 'white';

      if (eventData.extendedProps.taskIsComplete == 0) {
        eventData.backgroundColor = "white";
        eventData.textColor = 'black';
      }
    },
  } as CalendarOptions
})
const getMyProject =async ()=>{
  const { data:{projectList }}= await articleApi.getProjectList()
  state.calendarOptions.resources = projectList
}
const { calendarOptions } = toRefs(state)

/**
 * 时间控制
 */
const custom_prev = ()=>{
  calendarApi.value.prev()
}
const custom_next = ()=>{
  calendarApi.value.next()
}

/**
 * 获取组件实例，里面有很多api可以用
 */
const fullCalendarRef = ref(null)
const calendarApi = ref(null)
onMounted(()=>{
  calendarApi.value = fullCalendarRef.value.getApi();
  getMyProject()
})

const showWeekly = ()=>{
  weeklyRef.value.show()
}

const eventClick = (arg)=>{
   actionRef.value.show('edit', arg)
}

const handleEventClick = (arg)=>{
  actionRef.value.show('add', arg)
}

</script>

<style lang="sass" scoped>
</style>
