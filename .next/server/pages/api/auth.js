"use strict";(()=>{var e={};e.id=508,e.ids=[508],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},9648:e=>{e.exports=import("axios")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},1925:(e,t,n)=>{n.a(e,async(e,r)=>{try{n.r(t),n.d(t,{config:()=>d,default:()=>s,routeModule:()=>l});var a=n(6794),o=n(6114),i=n(6249),c=n(3841),u=e([c]);c=(u.then?(await u)():u)[0];let s=(0,i.l)(c,"default"),d=(0,i.l)(c,"config"),l=new a.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/auth",pathname:"/api/auth",bundlePath:"",filename:""},userland:c});r()}catch(e){r(e)}})},3841:(e,t,n)=>{n.a(e,async(e,r)=>{try{n.r(t),n.d(t,{default:()=>i});var a=n(9648),o=e([a]);async function i(e,t){let n=e.query.code;try{let e=(await a.default.post("https://www.deviantart.com/oauth2/token",null,{params:{client_id:process.env.CLIENT_ID,client_secret:process.env.CLIENT_SECRET,code:n,grant_type:"authorization_code",redirect_uri:process.env.REDIRECT_URI}})).data.access_token;t.json({accessToken:e})}catch(e){console.error("Error exchanging code for token:",e),t.status(500).json({error:"Failed to exchange code for token"})}}a=(o.then?(await o)():o)[0],r()}catch(e){r(e)}})},6114:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE"}(n||(n={}))},6794:(e,t,n)=>{e.exports=n(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=1925);module.exports=n})();