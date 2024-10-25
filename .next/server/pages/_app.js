(()=>{var e={};e.id=888,e.ids=[888],e.modules={7544:(e,t,r)=>{r(3802)},3802:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let n=r(167),i=r(997),s=n._(r(6689)),a=r(9903);async function o(e){let{Component:t,ctx:r}=e;return{pageProps:await (0,a.loadGetInitialProps)(t,r)}}class u extends s.default.Component{render(){let{Component:e,pageProps:t}=this.props;return(0,i.jsx)(e,{...t})}}u.origGetInitialProps=o,u.getInitialProps=o,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9903:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{DecodeError:function(){return p},MiddlewareNotFoundError:function(){return x},MissingStaticPage:function(){return S},NormalizeError:function(){return m},PageNotFoundError:function(){return h},SP:function(){return f},ST:function(){return g},WEB_VITALS:function(){return r},execOnce:function(){return n},getDisplayName:function(){return u},getLocationOrigin:function(){return a},getURL:function(){return o},isAbsoluteUrl:function(){return s},isResSent:function(){return l},loadGetInitialProps:function(){return d},normalizeRepeatedSlashes:function(){return c},stringifyError:function(){return y}});let r=["CLS","FCP","FID","INP","LCP","TTFB"];function n(e){let t,r=!1;return function(){for(var n=arguments.length,i=Array(n),s=0;s<n;s++)i[s]=arguments[s];return r||(r=!0,t=e(...i)),t}}let i=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>i.test(e);function a(){let{protocol:e,hostname:t,port:r}=window.location;return e+"//"+t+(r?":"+r:"")}function o(){let{href:e}=window.location,t=a();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function l(e){return e.finished||e.headersSent}function c(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}async function d(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await d(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&l(r))return n;if(!n)throw Error('"'+u(e)+'.getInitialProps()" should resolve to an object. But found "'+n+'" instead.');return n}let f="undefined"!=typeof performance,g=f&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class p extends Error{}class m extends Error{}class h extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message="Cannot find module for page: "+e}}class S extends Error{constructor(e,t){super(),this.message="Failed to load static file for page: "+e+" "+t}}class x extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function y(e){return JSON.stringify({message:e.message,stack:e.stack})}},60:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let n=require("mongoose"),i=new n.Schema({deviationID:String,metaDevID:String,title:String,link:String,published:String,mature:String,stats:String,tierDeviationID:String,downloadable:String,tierName:String,tierURL:String,galleryName:String,premiumGalleryID:String,premType:String,dollarPrice:String,numSubs:String,numViews:String,thumbsLink:String,matureLevel:String,matureClass:String,tags:[String],desc:String}),s=(0,n.model)("Deviation",i)},4926:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>c});var i=r(997);r(7544);var s=r(6689),a=r.n(s),o=r(9648),u=r(60),l=e([o]);o=(l.then?(await l)():l)[0];let c=function({Component:e,pageProps:t}){let[r,n]=a().useState(null),[s,l]=a().useState([]),[c,d]=a().useState(!1),[f,g]=a().useState(null),p=async e=>{d(!0),g(null);try{let t=(await o.default.get("https://www.deviantart.com/api/v1/oauth2/galleries",{headers:{Authorization:`Bearer ${e}`},params:{limit:10,offset:0}})).data.galleries.map(e=>new u.default(e));await u.default.insertMany(t),l(t)}catch(e){console.error("Error fetching galleries:",e),g(e.message)}finally{d(!1)}};return(0,i.jsxs)("div",{children:[(0,i.jsx)("h1",{children:"DeviantArt Gallery Fetcher"}),c?(0,i.jsx)("p",{children:"Loading..."}):(0,i.jsxs)("div",{children:[(0,i.jsx)("button",{onClick:()=>p(r),children:"Fetch Galleries"}),(0,i.jsx)("ul",{children:s.map(e=>(0,i.jsxs)("li",{children:[(0,i.jsx)("h2",{children:e.title}),(0,i.jsx)("img",{src:e.thumbsLink,alt:e.title}),(0,i.jsx)("p",{children:e.desc})]},e.deviationID))})]}),f&&(0,i.jsx)("p",{style:{color:"red"},children:f})]})};n()}catch(e){n(e)}})},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},9648:e=>{"use strict";e.exports=import("axios")},167:(e,t)=>{"use strict";t._=function(e){return e&&e.__esModule?e:{default:e}}}};var t=require("../webpack-runtime.js");t.C(e);var r=t(t.s=4926);module.exports=r})();