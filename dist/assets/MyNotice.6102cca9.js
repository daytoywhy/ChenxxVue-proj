import{s as H,_ as U,d as $,r as u,a as s,o as c,c as g,e as r,w as a,G as D,H as W,I as _,b as o,M as B,l as f,k as j,p as G,g as J}from"./index.136adf48.js";var K={getNoticeList:()=>H({url:"notice/getNoticeList",method:"get"})};const k=d=>(G("data-v-24709529"),d=d(),J(),d),O={class:"my-notice"},P=k(()=>o("i",{class:"iconfont icon-shengyin08-xianxing"},null,-1)),Q={class:"notice-list"},R={class:"notice-container-text"},X={class:"notice-title"},Y=["onMouseenter"],Z={class:"notice-datetime"},ee={class:"notice-clearBtn"},te=k(()=>o("i",{class:"iconfont icon-anniu_guanbi"},null,-1)),oe=k(()=>o("span",null,"\u6E05\u7A7A\u6D88\u606F",-1)),ne=$({__name:"MyNotice",setup(d){const C=u("\u901A\u77E5"),y=u([]),p=u(0),b=u(!1),x=u(!1),M=async()=>{const{data:{list:n}}=await K.getNoticeList();y.value=n,p.value=0;for(let{noticeList:t}of n)p.value+=t.length};M();const E=()=>{M()},V=()=>{p.value=0;for(const n of y.value)n.noticeList=[]},S=n=>{var t,l;((t=n.target)==null?void 0:t.scrollWidth)>((l=n.target)==null?void 0:l.clientWidth)?b.value=!0:b.value=!1},T=(n,t)=>{var m,h;const l=document.createElement("span");l.innerHTML=t,l.className="calcDescWidth",(m=document.querySelector("body"))==null||m.appendChild(l);const v=document.querySelector(".calcDescWidth").offsetWidth;(h=document.querySelector(".calcDescWidth"))==null||h.remove();const N=n.target.offsetWidth;v>2*N?x.value=!0:x.value=!1};return(n,t)=>{const l=s("el-avatar"),v=s("el-tooltip"),N=s("el-tag"),m=s("el-scrollbar"),h=s("el-empty"),w=s("el-tab-pane"),A=s("el-tabs"),F=s("el-button"),I=s("el-popover"),q=s("el-badge");return c(),g("div",O,[r(q,{type:"danger",value:p.value,max:99},{default:a(()=>[r(I,{"popper-class":"notice-popper",trigger:"hover",placement:"bottom",width:320},{reference:a(()=>[P]),default:a(()=>[r(A,{stretch:"",modelValue:C.value,"onUpdate:modelValue":t[1]||(t[1]=i=>C.value=i),onTabChange:E},{default:a(()=>[(c(!0),g(D,null,W(y.value,i=>(c(),_(w,{key:i.id,label:`${i.name}(${i.noticeList.length})`,name:i.name},{default:a(()=>[i.noticeList.length?(c(),_(m,{key:0},{default:a(()=>[o("div",Q,[o("ul",null,[(c(!0),g(D,null,W(i.noticeList,(e,z)=>(c(),g("li",{class:"notice-container",key:z},[e.avatar?(c(),_(l,{key:0,class:"notice-avatar",size:30,src:e.avatar},null,8,["src"])):B("",!0),o("div",R,[o("div",X,[r(v,{disabled:!b.value,content:e.title},{default:a(()=>[o("div",{class:"notice-content",onMouseenter:t[0]||(t[0]=L=>S(L))},f(e.title),33)]),_:2},1032,["disabled","content"]),e!=null&&e.extra?(c(),_(N,{key:0,class:"notice-tag",type:e==null?void 0:e.status},{default:a(()=>[j(f(e.extra),1)]),_:2},1032,["type"])):B("",!0)]),r(v,{disabled:!x.value,placement:"top",content:e.description},{default:a(()=>[o("div",{class:"notice-desription",onMouseenter:L=>T(L,e.description)},f(e.description),41,Y)]),_:2},1032,["disabled","content"]),o("div",Z,f(e.datetime),1)])]))),128))])])]),_:2},1024)):(c(),_(h,{key:1,"image-size":200}))]),_:2},1032,["label","name"]))),128))]),_:1},8,["modelValue"]),o("div",ee,[r(F,{text:"",onClick:V},{default:a(()=>[te,oe]),_:1})])]),_:1})]),_:1},8,["value"])])}}});var ae=U(ne,[["__scopeId","data-v-24709529"],["__file","/Users/chenxiangxiong/Desktop/\u9879\u76EE\u6C47\u603B/\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF/ChenxxVue-proj/src/views/layout/components/header/components/MyNotice.vue"]]);export{ae as default};
