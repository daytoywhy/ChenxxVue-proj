import{_ as E,d as f,i as v,a as n,o as x,c as F,e as s,w as u,b as e,l as b,O as B,p as C,g,k as m}from"./index.136adf48.js";const r=o=>(C("data-v-043acb67"),o=o(),g(),o),D={class:"todo-list"},w=r(()=>e("div",{class:"title-content"},[e("div",null,[e("div",null,[e("i",{class:"iconfont icon-daiban"}),m(" \u5F85\u529E\u4E8B\u9879")])]),e("div",{class:"right-title"},[e("span",null,"\u6DFB\u52A0"),e("span",null,"\u5220\u9664")])],-1)),k=r(()=>e("div",{class:"action"},[e("i",{class:"iconfont icon-bianji"}),e("i",{class:"iconfont icon-lajitong"})],-1)),A=f({__name:"TodoList",setup(o){const a=v({tableData:[{id:1,description:"\u4ECA\u5929\u8981\u4FEE\u590D10\u4E2Abug",status:!0},{id:2,description:"\u660E\u5929\u8BB0\u5F97\u6709\u8FED\u4EE3\u4F1A",status:!0},{id:3,description:"\u4E0B\u5468\u4E09\u6709\u5BA4\u5185\u56DE\u987E\u4F1A",status:!1},{id:4,description:"\u5FEB\u5230\u5E74\u5E95\u4E86\uFF0C\u8BB0\u5F97\u5907\u5E74\u8D27",status:!1},{id:5,description:"\u660E\u5E74\u7684\u89C4\u5212\u8BB0\u5F97\u5728\u8FD1\u671F\u5B8C\u6210",status:!1}]}),c=[];for(const{id:t,status:d}of a.tableData)d&&c.push(t);const _=t=>{a.tableData[t.$rowIndex].status=!a.tableData[t.$rowIndex].status};return(t,d)=>{const i=n("vxe-column"),p=n("vxe-table"),h=n("el-card");return x(),F("div",D,[s(h,null,{header:u(()=>[w]),default:u(()=>[s(p,{ref:"vxeTableRef",border:"inner",data:a.tableData,"checkbox-config":{checkRowKeys:c,highlight:!0},onCheckboxChange:_,height:"120","show-header":!1,"row-id":"id"},{default:u(()=>[s(i,{type:"checkbox",width:"60"}),s(i,{field:"description",title:"\u63CF\u8FF0"},{default:u(l=>[e("div",{class:B([{"todo-item-del":l.row.status},"action"])},b(l.row.description),3)]),_:1}),s(i,{title:"\u64CD\u4F5C"},{default:u(()=>[k]),_:1})]),_:1},8,["data","checkbox-config"])]),_:1})])}}});var T=E(A,[["__scopeId","data-v-043acb67"],["__file","/Users/chenxiangxiong/Desktop/\u9879\u76EE\u6C47\u603B/\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF/ChenxxVue-proj/src/views/home/components/TodoList.vue"]]);export{T as default};
