"use strict";function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function _regeneratorRuntime(){_regeneratorRuntime=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var a=e&&e.prototype instanceof g?e:g,i=Object.create(a.prototype),c=new S(r||[]);return o(i,"_invoke",{value:I(t,n,c)}),i}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=s;var h="suspendedStart",p="suspendedYield",y="executing",d="completed",m={};function g(){}function v(){}function b(){}var w={};l(w,i,(function(){return this}));var _=Object.getPrototypeOf,x=_&&_(_(G([])));x&&x!==n&&r.call(x,i)&&(w=x);var E=b.prototype=g.prototype=Object.create(w);function L(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function n(o,a,i,c){var u=f(t[o],t,a);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==_typeof(s)&&r.call(s,"__await")?e.resolve(s.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(s).then((function(t){l.value=t,i(l)}),(function(t){return n("throw",t,i,c)}))}c(u.arg)}var a;o(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return a=a?a.then(o,o):o()}})}function I(e,n,r){var o=h;return function(a,i){if(o===y)throw Error("Generator is already running");if(o===d){if("throw"===a)throw i;return{value:t,done:!0}}for(r.method=a,r.arg=i;;){var c=r.delegate;if(c){var u=B(c,r);if(u){if(u===m)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===h)throw o=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=y;var l=f(e,n,r);if("normal"===l.type){if(o=r.done?d:p,l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(o=d,r.method="throw",r.arg=l.arg)}}}function B(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,B(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),m;var a=f(o,e.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,m;var i=a.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,m):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,m)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function G(e){if(e||""===e){var n=e[i];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return a.next=a}}throw new TypeError(_typeof(e)+" is not iterable")}return v.prototype=b,o(E,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:v,configurable:!0}),v.displayName=l(b,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,l(t,u,"GeneratorFunction")),t.prototype=Object.create(E),t},e.awrap=function(t){return{__await:t}},L(k.prototype),l(k.prototype,c,(function(){return this})),e.AsyncIterator=k,e.async=function(t,n,r,o,a){void 0===a&&(a=Promise);var i=new k(s(t,n,r,o),a);return e.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},L(E),l(E,u,"Generator"),l(E,i,(function(){return this})),l(E,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=G,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(j),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return c.type="throw",c.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),l=r.call(i,"finallyLoc");if(u&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,m):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;j(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:G(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),m}},e}function asyncGeneratorStep(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){asyncGeneratorStep(a,r,o,i,c,"next",t)}function c(t){asyncGeneratorStep(a,r,o,i,c,"throw",t)}i(void 0)}))}}var pageid="silly-maamoul-d6c673",switchValue="0";function initializePage(){return _initializePage.apply(this,arguments)}function _initializePage(){return(_initializePage=_asyncToGenerator(_regeneratorRuntime().mark((function t(){var e,n;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("https://mr4xa3bnuh567e5gbmbeyl5xdq0lpdoh.lambda-url.ap-southeast-1.on.aws/");case 3:if((e=t.sent).ok){t.next=6;break}throw new Error("HTTP error! Status: ".concat(e.status));case 6:return t.next=8,e.json();case 8:(n=t.sent)&&"1"===n[pageid]&&(finalPage(),switchValue="1"),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))).apply(this,arguments)}function fetchWaLinks(){return _fetchWaLinks.apply(this,arguments)}function _fetchWaLinks(){return(_fetchWaLinks=_asyncToGenerator(_regeneratorRuntime().mark((function t(){var e,n;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://wjqicpjvr34cvmzucfiocae3ie0irrxb.lambda-url.ap-southeast-1.on.aws/",{method:"POST",headers:{"Content-Type":"application/json"}});case 2:return e=t.sent,t.next=5,e.json();case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function finalPage(){return _finalPage.apply(this,arguments)}function _finalPage(){return(_finalPage=_asyncToGenerator(_regeneratorRuntime().mark((function t(){var e,n,r;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetchWaLinks();case 3:null!=(e=t.sent)&&e.url&&(n=e.url,(r=document.getElementById("welcome-link")).href=n,r.innerText=n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}document.getElementById("age-not").addEventListener("click",(function(){document.getElementById("page-age").style.display="none",document.getElementById("page-age-not").style.display="flex",gtag("event","button_click",{button_name:"age-not",button_value:"18-"})})),document.getElementById("age-yes").addEventListener("click",(function(){document.getElementById("page-age").style.display="none",document.getElementById("page-sex").style.display="flex",gtag("event","button_click",{button_name:"age-yes",button_value:"18+"})})),document.getElementById("sex-male").addEventListener("click",(function(){document.getElementById("page-sex").style.display="none",document.getElementById("page-form").style.display="flex",gtag("event","button_click",{button_name:"sex-male",button_value:"male"})})),document.getElementById("sex-female").addEventListener("click",(function(){"1"==switchValue?(document.getElementById("page-sex").style.display="none",document.getElementById("page-welcome").style.display="flex"):(document.getElementById("page-sex").style.display="none",document.getElementById("page-form").style.display="flex"),gtag("event","button_click",{button_name:"sex-female",button_value:"female"})})),document.getElementById("form-submit-btn").addEventListener("click",(function(){document.getElementById("page-form").style.display="none",document.getElementById("page-thank").style.display="flex",gtag("event","button_click",{button_name:"form-submit-btn",button_value:"submit_form"})})),document.getElementById("welcome-link").addEventListener("click",(function(){document.getElementById("page-form").style.display="none",document.getElementById("page-thank").style.display="flex",gtag("event","button_click",{button_name:"welcome-link",button_value:"gotowa"})})),initializePage();