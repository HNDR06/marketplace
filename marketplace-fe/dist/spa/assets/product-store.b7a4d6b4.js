import{ai as o}from"./index.3411a222.js";import{server as r,headers as e,headersImage as t}from"./axios.7b547941.js";const i=o("product",{actions:{async all(){return await r.get("api/product")},async dashboard(){return await r.get("api/product/dashboard",{headers:e})},async show(a){return await r.get(`api/product/${a}`)},async create(a){return await r.post("api/product",a,{headers:t})},async edit(a){return await r.post(`api/product/${a.id}`,a,{headers:t})},async delete(a){return await r.delete(`api/product/${a}`,{headers:e})}}});export{i as u};
