(()=>{var e={};e.id=820,e.ids=[820,660],e.modules={7544:(e,t,r)=>{r(3802)},1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},7909:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{config:()=>m,default:()=>p,getServerSideProps:()=>h,getStaticPaths:()=>g,getStaticProps:()=>f,reportWebVitals:()=>y,routeModule:()=>x,unstable_getServerProps:()=>_,unstable_getServerSideProps:()=>v,unstable_getStaticParams:()=>P,unstable_getStaticPaths:()=>S,unstable_getStaticProps:()=>b});var i=r(5872),a=r(3593),l=r(1323),o=r(5290),s=r.n(o),u=r(4926),d=r(2111),c=e([u]);u=(c.then?(await c)():c)[0];let p=(0,l.l)(d,"default"),f=(0,l.l)(d,"getStaticProps"),g=(0,l.l)(d,"getStaticPaths"),h=(0,l.l)(d,"getServerSideProps"),m=(0,l.l)(d,"config"),y=(0,l.l)(d,"reportWebVitals"),b=(0,l.l)(d,"unstable_getStaticProps"),S=(0,l.l)(d,"unstable_getStaticPaths"),P=(0,l.l)(d,"unstable_getStaticParams"),_=(0,l.l)(d,"unstable_getServerProps"),v=(0,l.l)(d,"unstable_getServerSideProps"),x=new i.PagesRouteModule({definition:{kind:a.x.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:u.default,Document:s()},userland:d});n()}catch(e){n(e)}})},3802:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let n=r(167),i=r(997),a=n._(r(6689)),l=r(9903);async function o(e){let{Component:t,ctx:r}=e;return{pageProps:await (0,l.loadGetInitialProps)(t,r)}}class s extends a.default.Component{render(){let{Component:e,pageProps:t}=this.props;return(0,i.jsx)(e,{...t})}}s.origGetInitialProps=o,s.getInitialProps=o,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2111:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let n=r(167),i=r(997),a=n._(r(6689)),l=n._(r(3867)),o={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function s(e){let{res:t,err:r}=e;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}let u={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class d extends a.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||o[e]||"An unexpected error has occurred";return(0,i.jsxs)("div",{style:u.error,children:[(0,i.jsx)(l.default,{children:(0,i.jsx)("title",{children:e?e+": "+r:"Application error: a client-side exception has occurred"})}),(0,i.jsxs)("div",{style:u.desc,children:[(0,i.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,i.jsx)("h1",{className:"next-error-h1",style:u.h1,children:e}):null,(0,i.jsx)("div",{style:u.wrap,children:(0,i.jsxs)("h2",{style:u.h2,children:[this.props.title||e?r:(0,i.jsx)(i.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}d.displayName="ErrorPage",d.getInitialProps=s,d.origGetInitialProps=s,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8214:(e,t)=>{"use strict";function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},3867:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return h},defaultHead:function(){return c}});let n=r(167),i=r(8760),a=r(997),l=i._(r(6689)),o=n._(r(5277)),s=r(9646),u=r(713),d=r(8214);function c(e){void 0===e&&(e=!1);let t=[(0,a.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,a.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(3179);let f=["name","httpEquiv","charSet","itemProp"];function g(e,t){let{inAmpMode:r}=t;return e.reduce(p,[]).reverse().concat(c(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return i=>{let a=!0,l=!1;if(i.key&&"number"!=typeof i.key&&i.key.indexOf("$")>0){l=!0;let t=i.key.slice(i.key.indexOf("$")+1);e.has(t)?a=!1:e.add(t)}switch(i.type){case"title":case"base":t.has(i.type)?a=!1:t.add(i.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){let t=f[e];if(i.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?a=!1:r.add(t);else{let e=i.props[t],r=n[t]||new Set;("name"!==t||!l)&&r.has(e)?a=!1:(r.add(e),n[t]=r)}}}}return a}}()).reverse().map((e,t)=>{let n=e.key||t;if(process.env.__NEXT_OPTIMIZE_FONTS&&!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,l.default.cloneElement(e,t)}return l.default.cloneElement(e,{key:n})})}let h=function(e){let{children:t}=e,r=(0,l.useContext)(s.AmpStateContext),n=(0,l.useContext)(u.HeadManagerContext);return(0,a.jsx)(o.default,{reduceComponentsToState:g,headManager:n,inAmpMode:(0,d.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5277:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return l}});let n=r(6689),i=()=>{},a=()=>{};function l(e){var t;let{headManager:r,reduceComponentsToState:l}=e;function o(){if(r&&r.mountedInstances){let t=n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(l(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),o(),i(()=>{var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),()=>{var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),i(()=>(r&&(r._pendingUpdate=o),()=>{r&&(r._pendingUpdate=o)})),a(()=>(r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),()=>{r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)})),null}},3179:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},60:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});let n=require("mongoose"),i=new n.Schema({deviationID:String,metaDevID:String,title:String,link:String,published:String,mature:String,stats:String,tierDeviationID:String,downloadable:String,tierName:String,tierURL:String,galleryName:String,premiumGalleryID:String,premType:String,dollarPrice:String,numSubs:String,numViews:String,thumbsLink:String,matureLevel:String,matureClass:String,tags:[String],desc:String}),a=(0,n.model)("Deviation",i)},4926:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>d});var i=r(997);r(7544);var a=r(6689),l=r.n(a),o=r(9648),s=r(60),u=e([o]);o=(u.then?(await u)():u)[0];let d=function({Component:e,pageProps:t}){let[r,n]=l().useState(null),[a,u]=l().useState([]),[d,c]=l().useState(!1),[p,f]=l().useState(null),g=async e=>{c(!0),f(null);try{let t=(await o.default.get("https://www.deviantart.com/api/v1/oauth2/galleries",{headers:{Authorization:`Bearer ${e}`},params:{limit:10,offset:0}})).data.galleries.map(e=>new s.default(e));await s.default.insertMany(t),u(t)}catch(e){console.error("Error fetching galleries:",e),f(e.message)}finally{c(!1)}};return(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{children:"DeviantArt Gallery Fetcher"}),d?(0,i.jsx)("p",{children:"Loading..."}):(0,i.jsxs)("div",{children:[(0,i.jsx)("button",{onClick:()=>g(r),children:"Fetch Galleries"}),(0,i.jsx)("ul",{children:a.map(e=>(0,i.jsxs)("li",{children:[(0,i.jsx)("h2",{children:e.title}),(0,i.jsx)("img",{src:e.thumbsLink,alt:e.title}),(0,i.jsx)("p",{children:e.desc})]},e.deviationID))})]}),p&&(0,i.jsx)("p",{style:{color:"red"},children:p})]})};n()}catch(e){n(e)}})},3593:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE"}(r||(r={}))},9646:(e,t,r)=>{"use strict";e.exports=r(5872).vendored.contexts.AmpContext},713:(e,t,r)=>{"use strict";e.exports=r(5872).vendored.contexts.HeadManagerContext},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},5315:e=>{"use strict";e.exports=require("path")},9648:e=>{"use strict";e.exports=import("axios")},8760:(e,t)=>{"use strict";function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}t._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var i={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in e)if("default"!==l&&Object.prototype.hasOwnProperty.call(e,l)){var o=a?Object.getOwnPropertyDescriptor(e,l):null;o&&(o.get||o.set)?Object.defineProperty(i,l,o):i[l]=e[l]}return i.default=e,n&&n.set(e,i),i}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[290],()=>r(7909));module.exports=n})();