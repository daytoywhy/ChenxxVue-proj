import d from"./AppSideBar.8ae971af.js";import p from"./AppNav.12f59bdd.js";import s from"./AppTab.a6998b5f.js";import l from"./AppPage.e6b0ac9a.js";import{u as c}from"./setting.1829997e.js";import{_ as h,d as b,L as f,K as g,o as m,c as u,b as o,e as i,u as e,O as x}from"./index.b40002c3.js";import"./MenuItem.bcea8303.js";import"./Collapse.5f97521a.js";import"./Breadcrumb.f2edf624.js";import"./MyNotice.cc8634f4.js";import"./MyAvatar.72c3d122.js";import"./avatar.d43413cf.js";import"./user.1bfa1420.js";import"./message.9d654a73.js";import"./storage.6edf785c.js";const y={id:"layout"},v={class:"main-container"},w={class:"app-header"},z=b({__name:"layout",setup(k){const r=c(),{opened:n,mobile:t}=f(r),a=()=>{t.value=document.body.getBoundingClientRect().width-1<992,n.value=!t.value};return a(),window.addEventListener("resize",a),g(()=>{window.removeEventListener("resize",a)}),(_,j)=>(m(),u("div",y,[o("div",{class:x(["layout-container",e(n)?"open-sidebar":"hidden-sidebar"])},[i(e(d),{class:"sidebar-container"}),o("main",v,[o("div",w,[i(e(p)),i(e(s))]),i(e(l),{class:"app-page"})])],2)]))}});var P=h(z,[["__file","/Users/chenxiangxiong/Desktop/\u9879\u76EE\u6C47\u603B/\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF/ChenxxVue-proj/src/views/layout/layout.vue"]]);export{P as default};
