import{_ as B,d as F,i as A,r as N,t as E,a as n,o as z,I as S,w as s,e as l,u as r,D as C,b as k,l as I,k as _,bK as U}from"./index.b40002c3.js";import{m as L}from"./message.9d654a73.js";const P=_("\u53D6\u6D88"),j=_("\u5168\u9009/\u53CD\u9009"),K=_("\u786E\u5B9A"),O=F({__name:"RoleDrawer",setup(T,{expose:x}){const e=A({drawer:!1,list:[],defaultProps:{label:"title",children:"children"},menuIds:[2],expandStatus:"0",flag:!1}),w=o=>{e.drawer=!0};(async()=>{const{data:{routers:o}}=await U.getRouter();e.list=o})();const d=N(null),g=()=>{e.flag=!e.flag,e.flag?d.value.setCheckedNodes(e.list):d.value.setCheckedNodes([])},h=o=>{const t=d.value.store._getAllNodes();if(o==1)for(const a of t)a.expanded=!0;else if(o==0)for(const a of t)a.expanded=!1},c=()=>{e.drawer=!1},D=()=>{L("\u6A21\u62DF\u64CD\u4F5C\u6210\u529F"),c()};x({init:w});const{drawer:i,list:b,defaultProps:v,menuIds:y,expandStatus:f}=E(e);return(o,t)=>{const a=n("el-tree"),p=n("el-button"),m=n("el-option"),R=n("el-select"),V=n("el-drawer");return z(),S(V,{modelValue:r(i),"onUpdate:modelValue":t[1]||(t[1]=u=>C(i)?i.value=u:null),title:"\u83DC\u5355\u5206\u914D",direction:"rtl","close-on-click-modal":!1,"before-close":c},{footer:s(()=>[l(p,{size:"small",onClick:c},{default:s(()=>[P]),_:1}),l(p,{size:"small",onClick:g},{default:s(()=>[j]),_:1}),l(R,{size:"small",onChange:h,modelValue:r(f),"onUpdate:modelValue":t[0]||(t[0]=u=>C(f)?f.value=u:null),style:{width:"110px",margin:"0 10px"}},{default:s(()=>[l(m,{label:"\u5C55\u5F00\u6240\u6709",value:"1"}),l(m,{label:"\u6536\u5408\u6240\u6709",value:"0"})]),_:1},8,["modelValue"]),l(p,{size:"small",onClick:D,type:"primary"},{default:s(()=>[K]),_:1})]),default:s(()=>[l(a,{ref_key:"menuRef",ref:d,data:r(b),"show-checkbox":"","node-key":"id",props:r(v),"default-expanded-keys":[],"default-checked-keys":r(y)},{default:s(({node:u})=>[k("span",null,[k("span",null,I(u.label),1)])]),_:1},8,["data","props","default-checked-keys"])]),_:1},8,["modelValue"])}}});var J=B(O,[["__file","/Users/chenxiangxiong/Desktop/\u9879\u76EE\u6C47\u603B/\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF/ChenxxVue-proj/src/views/system/role/components/RoleDrawer.vue"]]);export{J as default};
