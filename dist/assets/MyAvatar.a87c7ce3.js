import{_ as f}from"./avatar.d43413cf.js";import{u as w}from"./user.b18fb181.js";import{_ as g,d as C,r as x,L as y,h as A,a as r,o as B,c as E,e as t,w as e,b as o,l as F,u as S,O as k,p as D,g as I}from"./index.136adf48.js";import"./message.4b3718a2.js";import"./storage.6edf785c.js";const s=a=>(D("data-v-5810972a"),a=a(),I(),a),M={class:"my-avatar"},V={class:"avatar-dropdown"},b=s(()=>o("img",{class:"user-avatar",src:f},null,-1)),j={class:"user-name"},L={class:"user-name-title"},N=s(()=>o("i",{class:"iconfont icon-wode1-xianxing"},null,-1)),R=s(()=>o("span",null,"\u4E2A\u4EBA\u4E2D\u5FC3",-1)),U=s(()=>o("i",{class:"iconfont icon-guanji"},null,-1)),z=s(()=>o("span",null,"\u9000\u51FA\u767B\u5F55",-1)),O=C({__name:"MyAvatar",setup(a){const c=x(!1),u=w(),{setLogout:d}=u,{username:l,avatar:T}=y(u),i=A(),p=n=>{c.value=n},m=async n=>{switch(n){case"personalCenter":i.push("/personal-center");break;case"logout":await d()}};return(n,q)=>{const _=r("el-dropdown-item"),h=r("el-dropdown-menu"),v=r("el-dropdown");return B(),E("div",M,[t(v,{onVisibleChange:p,onCommand:m},{dropdown:e(()=>[t(h,null,{default:e(()=>[t(_,{command:"personalCenter"},{default:e(()=>[N,R]),_:1}),t(_,{command:"logout"},{default:e(()=>[U,z]),_:1})]),_:1})]),default:e(()=>[o("span",V,[b,o("div",j,[o("span",L,F(S(l)),1),o("i",{class:k(["user-name-dropdown iconfont icon-xiangxia2",{"user-name-dropdown-active":c.value}])},null,2)])])]),_:1})])}}});var Q=g(O,[["__scopeId","data-v-5810972a"],["__file","/Users/chenxiangxiong/Desktop/\u9879\u76EE\u6C47\u603B/\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF/ChenxxVue-proj/src/views/layout/components/header/components/MyAvatar.vue"]]);export{Q as default};