import{ai as r}from"./index.3411a222.js";import{server as t,headers as a}from"./axios.7b547941.js";const n=r("setting",{actions:{async show(){return await t.get("api/setting",{headers:a})},async dashboard(){return await t.get("api/setting/dashboard",{headers:a})},async edit(e){return await t.put("api/setting",e,{headers:a})}}});export{n as u};
