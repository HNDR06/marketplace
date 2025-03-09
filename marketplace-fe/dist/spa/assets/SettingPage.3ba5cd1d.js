import{Q as h}from"./QSkeleton.72d58935.js";import{Q as F}from"./QForm.f0266572.js";import{u as B,r,j as U,d as E,m as x,x as D,n as P,p as i,z as l,q as t,b0 as m,C as V,y as j,v as I,Q as S,a_ as w,aQ as u}from"./index.3411a222.js";import{Q as y}from"./QSelect.62773709.js";import{Q as G}from"./QSpinnerGears.11fcd29c.js";import{u as R}from"./use-quasar.a53b7e3f.js";import{url as $}from"./axios.7b547941.js";import{u as k}from"./user-store.70fb05d9.js";import{u as M}from"./address-store.65fa7b41.js";import"./QItem.3b7e9927.js";import"./QItemLabel.4cdf02e7.js";import"./QMenu.2d1a1d67.js";import"./selection.3ca1e304.js";import"./rtl.276c3f1b.js";import"./format.b9446fb2.js";const T={class:"q-my-xl"},J=l("hr",{class:"q-my-md"},null,-1),H={class:"row justify-center"},O={class:"col-md-3 q-ma-md"},W={class:"col-md-8 q-ma-md"},X={class:"col-11 q-ma-md"},Y=l("hr",{class:"q-my-md"},null,-1),Z={class:"row justify-center"},ee={class:"col-md-3 q-ma-md"},le=l("div",{class:"text-body1 text-bold"},"Foto profil",-1),ae=["src"],se=l("div",{class:"text-subtitle2 text-grey-7"},"JPG atau PNG tidak lebih besar dari 5 MB",-1),oe={class:"col-md-8 q-ma-md"},te=l("div",{class:"text-body1 text-bold"},"Detail Akun",-1),ie={class:"row justify-center"},de={class:"col-10 q-my-sm q-mx-md"},ne=l("label",{class:"small mb-1",for:"name"},"Name",-1),re={class:"col-10 q-my-sm q-mx-md"},ue=l("label",{class:"small mb-1",for:"email"},"Email",-1),me={class:"col-10 q-my-sm q-mx-md"},ce=l("label",{class:"small mb-1",for:"phone_number"},"Nomor Telepon",-1),ve={class:"col-11 q-ma-md"},pe=l("div",{class:"text-body1 text-bold"},"Alamat",-1),_e={class:"row justify-center"},fe={class:"col-md-5 col-xs-10 q-my-sm q-mx-md"},be=l("label",{class:"small mb-1",for:"province"},"Provinsi",-1),ge={class:"col-md-5 col-xs-10 q-my-sm q-mx-md"},he=l("label",{class:"small mb-1",for:"regency"},"Kabupaten",-1),ye={class:"col-md-5 col-xs-10 q-my-sm q-mx-md"},qe=l("label",{class:"small mb-1",for:"district"},"Kecamatan",-1),xe={class:"col-md-5 col-xs-10 q-my-sm q-mx-md"},Ve=l("label",{class:"small mb-1",for:"village"},"Kelurahan",-1),we={class:"col-md-5 col-xs-10 q-my-sm q-mx-md"},ke=l("label",{class:"small mb-1",for:"country"},"Negara",-1),Qe={class:"col-md-5 col-xs-10 q-my-sm q-mx-md"},Ce=l("label",{class:"small mb-1",for:"zip_code"},"Kode Pos",-1),Fe={class:"col-md-5 col-xs-10 q-my-sm q-mx-md"},Ue=l("label",{class:"small mb-1",for:"address_one"},"Alamat Lengkap",-1),Pe={class:"col-md-5 col-xs-10 q-my-sm q-mx-md"},Se=l("label",{class:"small mb-1",for:"address_two"},"Detail Alamat",-1),Le=l("hr",{class:"q-my-md"},null,-1),Oe={__name:"SettingPage",setup(Ae){const c=R(),L=B(),q=r(!0),a=r({id:"",avatar:"",name:"",email:"",phone_number:"",province:"",province_id:null,regency:"",regency_id:null,district:"",district_id:null,village:"",village_id:null,country:"",zip_code:null,address_one:"",address_two:""}),A=async()=>{try{const s=await k().profile();a.value=s.data.data}catch(s){console.error("Error fetching data:",s)}q.value=!1};U(()=>{A()});const v=r([]),p=r([]),_=r([]),f=r([]),N=async()=>{try{const s=await M().all();v.value=s.data.provinces.map(e=>({id:e.id,label:e.name,value:e.name})),d.value.provinces=[...v.value],p.value=s.data.regencies.map(e=>({id:e.id,label:e.name,value:e.name})),d.value.regencies=[...p.value],_.value=s.data.districts.map(e=>({id:e.id,label:e.name,value:e.name})),d.value.districts=[..._.value],f.value=s.data.villages.map(e=>({id:e.id,label:e.name,value:e.name})),d.value.villages=[...f.value]}catch(s){console.error("Error fetching data:",s)}q.value=!1};U(()=>{N()});const d=r({provinces:[],regencies:[],districts:[],villages:[]}),b={provinces(s,e){e(()=>{const o=s.toLowerCase();d.value.provinces=v.value.filter(n=>n.value.toLowerCase().includes(o))})},regencies(s,e){e(()=>{const o=s.toLowerCase();d.value.regencies=p.value.filter(n=>n.value.toLowerCase().includes(o))})},districts(s,e){e(()=>{const o=s.toLowerCase();d.value.districts=_.value.filter(n=>n.value.toLowerCase().includes(o))})},villages(s,e){e(()=>{const o=s.toLowerCase();d.value.villages=f.value.filter(n=>n.value.toLowerCase().includes(o))})}},Q=r(null),K=async s=>{s.preventDefault();const e=s.target.files[0];if(e){const o=new FileReader;o.onload=()=>{Q.value.src=o.result},o.readAsDataURL(e);try{const n=await k().editprofileavatar({avatar:e});a.value.avatar=n.data.data.avatar,c.notify({message:"Foto Profil berhasil diubah",icon:"check",color:"positive"})}catch(n){console.error("Error submitting form:",n),c.notify({message:n.response.data.message||"Foto Profil gagal diubah",icon:"warning",color:"negative"})}}},g=r(!1),z=E(()=>g.value||!a.value.name||!a.value.email),C=async()=>{g.value=!0;try{a.value.province&&(a.value.province_id=v.value.find(s=>s.label===a.value.province).id),a.value.regency&&(a.value.regency_id=p.value.find(s=>s.label===a.value.regency).id),a.value.district&&(a.value.district_id=_.value.find(s=>s.label===a.value.district).id),a.value.village&&(a.value.village_id=f.value.find(s=>s.label===a.value.village).id),await k().editprofile(a.value),c.notify({message:"Profil berhasil diedit",icon:"check",color:"positive"}),await L.push({name:"home.profile"}),window.location.reload()}catch(s){console.error("Error submitting form:",s),c.notify({message:s.response.data.message||"Profil gagal diedit, Silahkan coba lagi nanti",icon:"warning",color:"negative"})}g.value=!1};return(s,e)=>(x(),D("div",T,[J,q.value?(x(),P(F,{key:0,onSubmit:C},{default:i(()=>[l("div",H,[l("div",O,[t(h,{width:"100%",height:"350px"})]),l("div",W,[t(h,{width:"100%",height:"350px"})]),l("div",X,[t(h,{width:"100%",height:"450px"})])]),t(h,{width:"90px",height:"38px",class:"float-right"}),Y]),_:1})):(x(),P(F,{key:1,onSubmit:C},{default:i(()=>[l("div",Z,[l("div",ee,[t(w,{style:{height:"100%"}},{default:i(()=>[t(m,{class:"bg-blue-grey-1"},{default:i(()=>[le]),_:1}),t(V),t(m,{class:"text-center q-pa-md"},{default:i(()=>[t(j,{size:"100px",class:"q-my-md"},{default:i(()=>[l("img",{ref_key:"avatar",ref:Q,src:I($)+"/public/avatars/"+a.value.avatar},null,8,ae)]),_:1}),se,t(S,{color:"primary",class:"q-my-md",label:"Unggah Foto baru",onClick:e[0]||(e[0]=o=>s.$refs.avatarInput.click()),"no-caps":""}),l("input",{type:"file",ref:"avatarInput",id:"avatarInput",style:{display:"none"},accept:"image/*",onChange:K},null,544)]),_:1})]),_:1})]),l("div",oe,[t(w,{style:{height:"100%"}},{default:i(()=>[t(m,{class:"bg-blue-grey-1"},{default:i(()=>[te]),_:1}),t(V),t(m,{class:"q-pa-md"},{default:i(()=>[l("div",ie,[l("div",de,[ne,t(u,{modelValue:a.value.name,"onUpdate:modelValue":e[1]||(e[1]=o=>a.value.name=o),id:"name",label:"Name",outlined:"",dense:"",required:"",autofocus:""},null,8,["modelValue"])]),l("div",re,[ue,t(u,{type:"email",modelValue:a.value.email,"onUpdate:modelValue":e[2]||(e[2]=o=>a.value.email=o),id:"email",label:"Email",outlined:"",dense:"",required:""},null,8,["modelValue"])]),l("div",me,[ce,t(u,{modelValue:a.value.phone_number,"onUpdate:modelValue":e[3]||(e[3]=o=>a.value.phone_number=o),id:"phone_number",label:"Nomor Telepon",mask:"#### - #### - ######",outlined:"",dense:""},null,8,["modelValue"])])])]),_:1})]),_:1})]),l("div",ve,[t(w,null,{default:i(()=>[t(m,{class:"bg-blue-grey-1"},{default:i(()=>[pe]),_:1}),t(V),t(m,{class:"q-pa-md"},{default:i(()=>[l("div",_e,[l("div",fe,[be,t(y,{modelValue:a.value.province,"onUpdate:modelValue":e[4]||(e[4]=o=>a.value.province=o),options:d.value.provinces,onFilter:b.provinces,id:"province",label:"Provinsi","input-debounce":"0","use-input":"","fill-input":"","emit-value":"","hide-selected":"",outlined:"",dense:""},null,8,["modelValue","options","onFilter"])]),l("div",ge,[he,t(y,{modelValue:a.value.regency,"onUpdate:modelValue":e[5]||(e[5]=o=>a.value.regency=o),options:d.value.regencies,onFilter:b.regencies,id:"regency",label:"Kabupaten","input-debounce":"0","use-input":"","fill-input":"","emit-value":"","hide-selected":"",outlined:"",dense:""},null,8,["modelValue","options","onFilter"])]),l("div",ye,[qe,t(y,{modelValue:a.value.district,"onUpdate:modelValue":e[6]||(e[6]=o=>a.value.district=o),options:d.value.districts,onFilter:b.districts,id:"district",label:"Kecamatan","input-debounce":"0","use-input":"","fill-input":"","emit-value":"","hide-selected":"",outlined:"",dense:""},null,8,["modelValue","options","onFilter"])]),l("div",xe,[Ve,t(y,{modelValue:a.value.village,"onUpdate:modelValue":e[7]||(e[7]=o=>a.value.village=o),options:d.value.villages,onFilter:b.villages,id:"village",label:"Kelurahan","input-debounce":"0","use-input":"","fill-input":"","emit-value":"","hide-selected":"",outlined:"",dense:""},null,8,["modelValue","options","onFilter"])]),l("div",we,[ke,t(u,{modelValue:a.value.country,"onUpdate:modelValue":e[8]||(e[8]=o=>a.value.country=o),id:"country",label:"Negara",outlined:"",dense:""},null,8,["modelValue"])]),l("div",Qe,[Ce,t(u,{type:"number",modelValue:a.value.zip_code,"onUpdate:modelValue":e[9]||(e[9]=o=>a.value.zip_code=o),id:"zip_code",label:"Kode Pos",outlined:"",dense:""},null,8,["modelValue"])]),l("div",Fe,[Ue,t(u,{type:"textarea",modelValue:a.value.address_one,"onUpdate:modelValue":e[10]||(e[10]=o=>a.value.address_one=o),id:"address_one",label:"Alamat Lengkap",outlined:"",dense:""},null,8,["modelValue"])]),l("div",Pe,[Se,t(u,{modelValue:a.value.address_two,"onUpdate:modelValue":e[11]||(e[11]=o=>a.value.address_two=o),id:"address_two",label:"Detail Alamat (Contoh : Dekat pohon besar)",outlined:"",dense:""},null,8,["modelValue"])])])]),_:1})]),_:1})])]),t(S,{type:"submit",label:"Simpan",color:"primary",class:"float-right",loading:g.value,disable:z.value},{loading:i(()=>[t(G)]),_:1},8,["loading","disable"]),Le]),_:1}))]))}};export{Oe as default};
