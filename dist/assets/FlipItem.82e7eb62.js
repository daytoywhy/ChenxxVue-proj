import{_ as f,d as m,r as s,o as d,c as x,b as r,O as o}from"./index.136adf48.js";const F=m({__name:"FlipItem",setup(B,{expose:v}){const a=s(0),n=s(1),_=s(600),l=s(!1),u=s("down"),c=e=>"number"+e,i=(e,t,p)=>{l.value||(a.value=t,n.value=p,u.value=e,l.value=!0,setTimeout(()=>{l.value=!1,a.value=p},_.value))};return v({flipDown:(e,t)=>{i("down",e,t)},flipUp:(e,t)=>{i("up",e,t)},setFront:e=>{a.value=e},setBack:e=>{n.value=e}}),(e,t)=>(d(),x("div",{class:o(`m-flipper ${u.value} ${l.value?"go":""}`)},[r("div",{class:o(`digital front ${c(a.value)}`)},null,2),r("div",{class:o(`digital back ${c(n.value)}`)},null,2)],2))}});var I=f(F,[["__scopeId","data-v-61e256b4"],["__file","/Users/chenxiangxiong/Desktop/\u9879\u76EE\u6C47\u603B/\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF/ChenxxVue-proj/src/views/home/components/components/FlipItem.vue"]]);export{I as default};