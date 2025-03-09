import{Q as U,a as G,b as J}from"./QHeader.1bbbae69.js";import{c as le,i as se,e as j,r as R,a as re,d as C,w as B,o as ne,h as ie,f as N,g as ue,l as ce,u as me,j as de,k as W,m as l,n as s,p as e,q as t,s as E,t as _,v as u,x as I,Q as z,y as A,z as n,A as g,B as H,C as X,D as K,K as fe,E as ve}from"./index.30dd2348.js";import{Q as L}from"./QSkeleton.01e1d850.js";import{Q as T}from"./QBtnDropdown.8e6f75ac.js";import{Q as k}from"./QItemLabel.580fc480.js";import{Q as q,a as Q}from"./QItem.2b7551f8.js";import{Q as Y}from"./QList.f7f71f64.js";import{Q as pe,a as _e,b as ge}from"./QLayout.8864729c.js";import{Q as he,a as V}from"./QTabs.03426c38.js";import{C as h}from"./ClosePopup.b6be3405.js";import{u as ye}from"./use-quasar.67b6ac9a.js";import{token as D,url as P}from"./axios.66ae61ea.js";import{u as xe}from"./auth-store.2c60703d.js";import{u as be}from"./user-store.f67a660c.js";import"./QBtnGroup.e96b8949.js";import"./QMenu.19c3a5ff.js";import"./selection.64adb4fb.js";import"./rtl.276c3f1b.js";var ke=le({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(i,{slots:S,emit:F}){const{proxy:{$q:d}}=ue(),a=se(ce,j);if(a===j)return console.error("QFooter needs to be child of QLayout"),j;const m=R(parseInt(i.heightHint,10)),y=R(!0),f=R(re.value===!0||a.isContainer.value===!0?0:window.innerHeight),w=C(()=>i.reveal===!0||a.view.value.indexOf("F")!==-1||d.platform.is.ios&&a.isContainer.value===!0),c=C(()=>a.isContainer.value===!0?a.containerHeight.value:f.value),r=C(()=>{if(i.modelValue!==!0)return 0;if(w.value===!0)return y.value===!0?m.value:0;const o=a.scroll.value.position+c.value+m.value-a.height.value;return o>0?o:0}),b=C(()=>i.modelValue!==!0||w.value===!0&&y.value!==!0),M=C(()=>i.modelValue===!0&&b.value===!0&&i.reveal===!0),v=C(()=>"q-footer q-layout__section--marginal "+(w.value===!0?"fixed":"absolute")+"-bottom"+(i.bordered===!0?" q-footer--bordered":"")+(b.value===!0?" q-footer--hidden":"")+(i.modelValue!==!0?" q-layout--prevent-focus"+(w.value!==!0?" hidden":""):"")),Z=C(()=>{const o=a.rows.value.bottom,p={};return o[0]==="l"&&a.left.space===!0&&(p[d.lang.rtl===!0?"right":"left"]=`${a.left.size}px`),o[2]==="r"&&a.right.space===!0&&(p[d.lang.rtl===!0?"left":"right"]=`${a.right.size}px`),p});function x(o,p){a.update("footer",o,p)}function $(o,p){o.value!==p&&(o.value=p)}function ee({height:o}){$(m,o),x("size",o)}function te(){if(i.reveal!==!0)return;const{direction:o,position:p,inflectionPoint:oe}=a.scroll.value;$(y,o==="up"||p-oe<100||a.height.value-c.value-p-m.value<300)}function ae(o){M.value===!0&&$(y,!0),F("focusin",o)}B(()=>i.modelValue,o=>{x("space",o),$(y,!0),a.animate()}),B(r,o=>{x("offset",o)}),B(()=>i.reveal,o=>{o===!1&&$(y,i.modelValue)}),B(y,o=>{a.animate(),F("reveal",o)}),B([m,a.scroll,a.height],te),B(()=>d.screen.height,o=>{a.isContainer.value!==!0&&$(f,o)});const O={};return a.instances.footer=O,i.modelValue===!0&&x("size",m.value),x("space",i.modelValue),x("offset",r.value),ne(()=>{a.instances.footer===O&&(a.instances.footer=void 0,x("size",0),x("offset",0),x("space",!1))}),()=>{const o=ie(S.default,[N(pe,{debounce:0,onResize:ee})]);return i.elevated===!0&&o.push(N("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),N("footer",{class:v.value,style:Z.value,onFocusin:ae},o)}}});const qe=n("img",{src:"/img/logo.png",width:"80",class:"q-pa-xs"},null,-1),Qe={key:0},we={key:1},Ce=["src"],ze={class:"row no-wrap q-pa-md"},Se={class:"column"},$e={class:"column items-center"},Be=["src"],Ae={class:"nav-profile text-subtitle1 text-grey-8 q-mt-sm"},Ve={class:"nav-profile text-subtitle2 text-bold q-mb-md q-mt-xs",style:{"max-width":"150px"}},Pe=n("footer",{class:"bg-grey-3 q-py-lg"},[n("div",{class:"text-body1 text-center text-grey-8"},"2024 Copyright Store. All Rights Reserved.")],-1),He={class:"small-screen"},Le=n("img",{src:"/img/logo.png",width:"50",class:"q-pa-xs q-mx-md"},null,-1),De={key:0},Re={key:1},Fe=["src"],Ie={class:"row no-wrap q-pa-md"},Ke={class:"column"},Te={class:"column items-center"},Me=["src"],je={class:"nav-profile text-subtitle1 text-grey-8 q-mt-sm"},Ne={class:"nav-profile text-subtitle2 text-bold q-mb-md q-mt-xs",style:{"max-width":"150px"}},Ee=["src"],Oe=["src"],mt={__name:"MainLayout",setup(i){const S=ye(),F=me(),d=localStorage.getItem("role"),a=R({}),m=R(!0),y=async()=>{try{const c=await be().profile();a.value=c.data.data,m.value=!1}catch(c){console.error("Error fetching data:",c),localStorage.removeItem("token"),localStorage.removeItem("role"),S.notify({message:"Sesi Habis",icon:"warning",color:"negative"}),window.location.reload()}};de(()=>{D&&y()});const f=(c,r)=>{F.push({name:c,params:r})},w=async()=>{S.dialog({title:"Keluar",message:"Apakah anda yakin?",cancel:!0,persistent:!0}).onOk(async()=>{try{await xe().logout(),S.notify({message:"Logout Berhasil",icon:"check",color:"positive"})}catch(c){console.error("Error submitting form:",c),S.notify({message:c.response.data.message||"Logout Gagal",icon:"warning",color:"negative"})}})};return(c,r)=>{const b=W("router-link"),M=W("router-view");return l(),s(_e,{view:"lHh Lpr lFf"},{default:e(()=>[t(J,{class:"large-screen bg-white q-px-lg"},{default:e(()=>[t(U,{class:"text-primary q-my-sm"},{default:e(()=>[t(b,{to:{name:"home"}},{default:e(()=>[qe]),_:1}),t(G,{class:"q-py-sm q-mx-lg",style:{"font-size":"16px"}},{default:e(()=>[t(b,{to:{name:"home"},class:E(["nav-link q-mx-sm text-bold",c.$route.name==="home"?"active-tab":""])},{default:e(()=>[_("Beranda")]),_:1},8,["class"]),t(b,{to:{name:"home.categories"},class:E(["nav-link q-mx-sm text-bold",c.$route.name==="home.categories"?"active-tab":""])},{default:e(()=>[_("Kategori")]),_:1},8,["class"]),t(b,{to:{name:"home.explore"},class:E(["nav-link q-mx-sm text-bold",c.$route.name==="home.explore"?"active-tab":""])},{default:e(()=>[_("Jelajahi")]),_:1},8,["class"])]),_:1}),u(D)?(l(),I("div",we,[t(z,{to:{name:"home.cart"},color:"primary",size:"18px",class:"q-mx-lg",icon:"shopping_cart",flat:"",round:""}),m.value?(l(),s(T,{key:0,color:"primary",class:"q-mx-xs",rounded:"",dense:"",flat:"",push:"",glossy:"",split:""},{label:e(()=>[t(L,{type:"QAvatar",size:"26px"})]),_:1})):(l(),s(T,{key:1,to:{name:"home.profile"},color:"primary",class:"q-mx-xs",rounded:"",dense:"",flat:"",push:"",glossy:"",split:""},{label:e(()=>[m.value?(l(),s(L,{key:0,type:"QAvatar",size:"26px"})):(l(),s(A,{key:1,size:"26px"},{default:e(()=>[n("img",{src:u(P)+"/public/avatars/"+a.value.avatar},null,8,Ce)]),_:1}))]),default:e(()=>[n("div",ze,[n("div",Se,[t(Y,{class:"nav-profile"},{default:e(()=>[u(d)==="Admin"||u(d)==="Mitra"?g((l(),s(q,{key:0,onClick:r[0]||(r[0]=v=>f("dashboard.home")),clickable:""},{default:e(()=>[t(Q,null,{default:e(()=>[t(k,null,{default:e(()=>[_("Dasbor")]),_:1})]),_:1})]),_:1})),[[h]]):H("",!0),g((l(),s(q,{onClick:r[1]||(r[1]=v=>f("home.profile")),clickable:""},{default:e(()=>[t(Q,null,{default:e(()=>[t(k,null,{default:e(()=>[_("Profil")]),_:1})]),_:1})]),_:1})),[[h]]),u(d)==="Customer"?g((l(),s(q,{key:1,onClick:r[2]||(r[2]=v=>f("home.order")),clickable:""},{default:e(()=>[t(Q,null,{default:e(()=>[t(k,null,{default:e(()=>[_("Pesanan Saya")]),_:1})]),_:1})]),_:1})),[[h]]):H("",!0),g((l(),s(q,{onClick:r[3]||(r[3]=v=>f("home.setting")),clickable:""},{default:e(()=>[t(Q,null,{default:e(()=>[t(k,null,{default:e(()=>[_("Pengaturan")]),_:1})]),_:1})]),_:1})),[[h]])]),_:1})]),t(X,{vertical:"",inset:"",class:"q-mx-md"}),n("div",$e,[t(A,{size:"72px",class:"q-mx-md"},{default:e(()=>[n("img",{src:u(P)+"/public/avatars/"+a.value.avatar},null,8,Be)]),_:1}),n("div",Ae,K(a.value.username),1),n("div",Ve,K(a.value.name),1),g(t(z,{color:"primary",label:"Keluar",push:"",size:"sm",onClick:w},null,512),[[h]])])])]),_:1}))])):(l(),I("div",Qe,[t(z,{to:{name:"register"},color:"primary",label:"Daftar",class:"q-mx-xs","no-caps":"",flat:""}),t(z,{to:{name:"login"},color:"primary",label:"Masuk",class:"q-mx-xs","no-caps":""})]))]),_:1})]),_:1}),t(ge,{class:"q-mb-lg container"},{default:e(()=>[t(M,null,{default:e(({Component:v})=>[(l(),s(fe,null,[(l(),s(ve(v)))],1024))]),_:1})]),_:1}),Pe,n("div",He,[t(J,{class:"bg-white q-pt-sm"},{default:e(()=>[t(U,{class:"text-primary"},{default:e(()=>[t(G,null,{default:e(()=>[t(b,{to:{name:"home"}},{default:e(()=>[Le]),_:1})]),_:1}),u(D)?(l(),I("div",Re,[t(z,{to:{name:"home.cart"},color:"primary",size:"15px",class:"q-mx-lg",icon:"shopping_cart",flat:"",round:""}),m.value?(l(),s(T,{key:0,color:"primary",class:"q-mx-xs",rounded:"",dense:"",flat:"",push:"",glossy:"",split:""},{label:e(()=>[t(L,{type:"QAvatar",size:"26px"})]),_:1})):(l(),s(T,{key:1,to:{name:"home.profile"},color:"primary",class:"q-mx-xs",rounded:"",dense:"",flat:"",push:"",glossy:"",split:""},{label:e(()=>[m.value?(l(),s(L,{key:0,type:"QAvatar",size:"26px"})):(l(),s(A,{key:1,size:"26px"},{default:e(()=>[n("img",{src:u(P)+"/public/avatars/"+a.value.avatar},null,8,Fe)]),_:1}))]),default:e(()=>[n("div",Ie,[n("div",Ke,[t(Y,{class:"nav-profile"},{default:e(()=>[u(d)==="Admin"||u(d)==="Mitra"?g((l(),s(q,{key:0,onClick:r[4]||(r[4]=v=>f("dashboard.home")),clickable:""},{default:e(()=>[t(Q,null,{default:e(()=>[t(k,null,{default:e(()=>[_("Dasbor")]),_:1})]),_:1})]),_:1})),[[h]]):H("",!0),g((l(),s(q,{onClick:r[5]||(r[5]=v=>f("home.profile")),clickable:""},{default:e(()=>[t(Q,null,{default:e(()=>[t(k,null,{default:e(()=>[_("Profil")]),_:1})]),_:1})]),_:1})),[[h]]),u(d)==="Customer"?g((l(),s(q,{key:1,onClick:r[6]||(r[6]=v=>f("home.order")),clickable:""},{default:e(()=>[t(Q,null,{default:e(()=>[t(k,null,{default:e(()=>[_("Pesanan Saya")]),_:1})]),_:1})]),_:1})),[[h]]):H("",!0),g((l(),s(q,{onClick:r[7]||(r[7]=v=>f("home.setting")),clickable:""},{default:e(()=>[t(Q,null,{default:e(()=>[t(k,null,{default:e(()=>[_("Pengaturan")]),_:1})]),_:1})]),_:1})),[[h]])]),_:1})]),t(X,{vertical:"",inset:"",class:"q-mx-md"}),n("div",Te,[t(A,{size:"72px",class:"q-mx-md"},{default:e(()=>[n("img",{src:u(P)+"/public/avatars/"+a.value.avatar},null,8,Me)]),_:1}),n("div",je,K(a.value.username),1),n("div",Ne,K(a.value.name),1),g(t(z,{color:"primary",label:"Keluar",push:"",size:"sm",onClick:w},null,512),[[h]])])])]),_:1}))])):(l(),I("div",De,[t(z,{to:{name:"register"},color:"primary",size:"sm",label:"Daftar",class:"q-mx-xs",rounded:""})]))]),_:1})]),_:1}),t(ke,{elevated:""},{default:e(()=>[t(he,{class:"bg-primary",align:"justify"},{default:e(()=>[t(V,{name:"home",icon:"home",to:{name:"home"}}),t(V,{name:"explore",icon:"search",to:{name:"home.explore"}}),t(V,{name:"category",icon:"category",to:{name:"home.categories"}}),u(D)?(l(),s(V,{key:0,name:"order",icon:"payments",class:"larger-tab",to:{name:"home.order"}})):H("",!0),u(D)?(l(),s(V,{key:2,name:"profile",to:{name:"home.profile"}},{default:e(()=>[m.value?(l(),s(L,{key:0,type:"QAvatar",size:"20px"})):(l(),s(A,{key:1,size:"20px"},{default:e(()=>[n("img",{src:u(P)+"/public/avatars/"+a.value.avatar},null,8,Oe)]),_:1}))]),_:1})):(l(),s(V,{key:1,name:"profile",to:{name:"login"}},{default:e(()=>[t(A,{size:"20px"},{default:e(()=>[n("img",{src:u(P)+"/public/avatars/user-profile-default.jpg"},null,8,Ee)]),_:1})]),_:1}))]),_:1})]),_:1})])]),_:1})}}};export{mt as default};
