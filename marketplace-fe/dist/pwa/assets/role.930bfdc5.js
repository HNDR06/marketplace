var o=({router:a})=>{a.beforeEach((l,s,e)=>{if(l.meta.requiresAuth){const r=localStorage.getItem("role");r&&l.meta.roles.includes(r)?e():l.path!=="/"?e("/"):e()}else e()})};export{o as default};
