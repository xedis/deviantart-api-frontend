(()=>{var e={};e.id=888,e.ids=[888],e.modules={7544:(e,t,r)=>{r(3802)},3802:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let n=r(167),o=r(997),i=n._(r(6689)),s=r(9903);async function a(e){let{Component:t,ctx:r}=e;return{pageProps:await (0,s.loadGetInitialProps)(t,r)}}class u extends i.default.Component{render(){let{Component:e,pageProps:t}=this.props;return(0,o.jsx)(e,{...t})}}u.origGetInitialProps=a,u.getInitialProps=a,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9903:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{DecodeError:function(){return g},MiddlewareNotFoundError:function(){return x},MissingStaticPage:function(){return E},NormalizeError:function(){return h},PageNotFoundError:function(){return m},SP:function(){return f},ST:function(){return p},WEB_VITALS:function(){return r},execOnce:function(){return n},getDisplayName:function(){return u},getLocationOrigin:function(){return s},getURL:function(){return a},isAbsoluteUrl:function(){return i},isResSent:function(){return l},loadGetInitialProps:function(){return d},normalizeRepeatedSlashes:function(){return c},stringifyError:function(){return v}});let r=["CLS","FCP","FID","INP","LCP","TTFB"];function n(e){let t,r=!1;return function(){for(var n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];return r||(r=!0,t=e(...o)),t}}let o=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,i=e=>o.test(e);function s(){let{protocol:e,hostname:t,port:r}=window.location;return e+"//"+t+(r?":"+r:"")}function a(){let{href:e}=window.location,t=s();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function l(e){return e.finished||e.headersSent}function c(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}async function d(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await d(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&l(r))return n;if(!n)throw Error('"'+u(e)+'.getInitialProps()" should resolve to an object. But found "'+n+'" instead.');return n}let f="undefined"!=typeof performance,p=f&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class g extends Error{}class h extends Error{}class m extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message="Cannot find module for page: "+e}}class E extends Error{constructor(e,t){super(),this.message="Failed to load static file for page: "+e+" "+t}}class x extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function v(e){return JSON.stringify({message:e.message,stack:e.stack})}},4926:(e,t,r)=>{"use strict";r.a(e,async(e,n)=>{try{r.r(t),r.d(t,{default:()=>l});var o=r(997);r(7544);var i=r(6689),s=r.n(i),a=r(9648);!function(){var e=Error("Cannot find module '../models/Deviation'");throw e.code="MODULE_NOT_FOUND",e}();var u=e([a]);a=(u.then?(await u)():u)[0],process.env.NEXT_PUBLIC_CLIENT_ID,process.env.NEXT_PUBLIC_CLIENT_SECRET,process.env.NEXT_PUBLIC_REDIRECT_URI;let l=function({Component:e,pageProps:t}){let[r,n]=s().useState(null),[i,u]=s().useState([]),[l,c]=s().useState(!1),[d,f]=s().useState(null),p=async e=>{c(!0),f(null);try{let t=(await a.default.get("https://www.deviantart.com/api/v1/oauth2/galleries",{headers:{Authorization:`Bearer ${e}`}})).data.galleries.map(e=>Object(function(){var e=Error("Cannot find module '../models/Deviation'");throw e.code="MODULE_NOT_FOUND",e}())(e));await Object(function(){var e=Error("Cannot find module '../models/Deviation'");throw e.code="MODULE_NOT_FOUND",e}())(t),u(t)}catch(e){console.error("Error fetching galleries:",e),f(e.message)}finally{c(!1)}};return(0,o.jsxs)("div",{children:[(0,o.jsx)("h1",{children:"DeviantArt Gallery Fetcher"}),l?(0,o.jsx)("p",{children:"Loading..."}):(0,o.jsxs)("div",{children:[(0,o.jsx)("button",{onClick:()=>p(r),children:"Fetch Galleries"}),(0,o.jsx)("ul",{children:i.map(e=>(0,o.jsxs)("li",{children:[(0,o.jsx)("h2",{children:e.title}),(0,o.jsx)("img",{src:e.thumbsLink,alt:e.title}),(0,o.jsx)("p",{children:e.desc})]},e.deviationID))})]}),d&&(0,o.jsx)("p",{style:{color:"red"},children:d})]})};n()}catch(e){n(e)}})},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},9648:e=>{"use strict";e.exports=import("axios")},167:(e,t)=>{"use strict";t._=function(e){return e&&e.__esModule?e:{default:e}}}};var t=require("../webpack-runtime.js");t.C(e);var r=t(t.s=4926);module.exports=r})();