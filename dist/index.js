!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("vue-events"),require("axios")):"function"==typeof define&&define.amd?define("VueHelpers",["vue-events","axios"],t):"object"==typeof exports?exports.VueHelpers=t(require("vue-events"),require("axios")):e.VueHelpers=t(e["vue-events"],e.axios)}(window,(function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=7)}([function(e,t,n){"use strict";function r(e,t,n,r,o,i,s,u){var a,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),s?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=a):o&&(a=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(c.functional){c._injectStyles=a;var l=c.render;c.render=function(e,t){return a.call(t),l(e,t)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,a):[a]}return{exports:e,options:c}}n.d(t,"a",(function(){return r}))},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var s=200,u=422,a=500,c=404,l=503,f=419,d=403,h=401,p={install:function(e){e.prototype.$errors=new e({data:function(){return{status:null,errors:[{key:"default",items:[]}]}},computed:{isSuccessful:function(){return this.isStatus(s)},isNotFound:function(){return this.isStatus(c)},isInvalid:function(){return this.isStatus(u)},isUnexpected:function(){return this.isStatus(a)},isExpired:function(){return this.isStatus(f)},isUnderMaintenance:function(){return this.isStatus(l)},isUnauthorized:function(){return this.isStatus(d)},isUnauthenticated:function(){return this.isStatus(h)}},methods:{setBag:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default";if("object"===i(e)){var n=Object.keys(e);e=n.map((function(t){return{key:t,message:e[t][0]}}))}this.findBag(t).items=e},set:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"default";this.findBag(n).items.push({key:e,message:t})},get:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default";return this.findBag(t).items.find((function(t){return t.key===e})).message},remove:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",n=this.findBag(t).items,r=n.findIndex((function(t){return t.key===e}));n.splice(r,1)},clear:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default";this.status=null;var t=this.findBag(e);t&&(t.items=[])},exists:function(e){return Boolean(this.find(e))},findBag:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default";return this.errors.find((function(t){return t.key===e}))},find:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",n=this.findBag(t);return n?n.items.find((function(t){return t.key===e})):null},isStatus:function(e){return this.status===e}}}),e.component("form-error",n(4).default),e.component("error-modal",n(5).default)}},v={install:function(e){e.prototype.$state=new e({data:function(){return{items:[]}},methods:{running:function(e){return e?Boolean(this.items.find((function(t){return t.name===e}))):Boolean(this.items.length)},add:function(e){this.running(e)||this.items.push({name:e})},clear:function(e){if(e){var t=this.items.findIndex((function(t){return t.name===e}));this.items.splice(t,1)}else this.items=[]}}})}},m={install:function(e){e.prototype.$modals=new e({methods:{open:function(e){this.$events.fire("openModal",e)},close:function(e){this.$events.fire("closeModal",e)}}})}},_={install:function(e){e.prototype.$boolean=new e({data:function(){return{states:[]}},methods:{toggle:function(e){var t=this.find(e);t||(t=this.set(e)),t.value=!t.value},find:function(e){return this.states.find((function(t){return t.key===e}))},set:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.find(e);if(n)return n.value=t,n;var r={key:e,value:t};return this.states.push(r),r},get:function(e){var t=this.find(e);return!!t&&t.value}}})}},g=n(2),y=n.n(g),x={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{state:"ajax",onSuccess:null,onError:null};e.prototype.$axios=function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{state:"ajax",onSuccess:null,onError:null},r=Object.assign(t,n),o=y.a.create();return o.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",o.interceptors.request.use((function(t){return e.$errors.clear(),e.$state.add(r.state),t})),o.interceptors.response.use((function(t){return e.$state.clear(r.state),r.onSuccess&&r.onSuccess(t),t}),(function(t){e.$state.clear(r.state),e.$errors.status=t&&t.response?t.response.status:500;var n={};return t.response&&t.response.data&&t.response.data.errors&&Object.assign(n,t.response.data.errors),e.$errors.setBag(n),r.onError&&r.onError(t),Promise.reject(t)})),o}}},b={install:function(e){e.prototype.$cookies=new e({methods:{create:function(e,t,n){var r;if(n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3),r="; expires="+o.toGMTString()}else r="";document.cookie=e+"="+t+r+"; path=/; secure; SameSite=Lax;"},read:function(e){for(var t=e+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){for(var o=n[r];" "===o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return null},delete:function(e){this.create(e,"",-1)}}})}},$={data:function(){return{show:!1}},methods:{open:function(){this.show=!0},close:function(){this.show=!1}}},S=n(0),j=Object(S.a)($,(function(){var e=this.$createElement,t=this._self._c||e;return this.show?t("div",[this._t("default",[this._v("Modal content")])],2):this._e()}),[],!1,null,null,null).exports;t.default={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{axios:{state:"ajax",onSuccess:null,onError:null}};e.component("modal",j),e.use(o.a),e.use(p),e.use(v),e.use(m),e.use(_),e.use(x,t.axios),e.use(b),e.mixin({mounted:function(){var e=this;this.$events.on("openModal",(function(t){e.$refs[t]&&e.openUiModal(t)})),this.$events.on("closeModal",(function(t){e.$refs[t]&&e.closeUiModal(t)}))},computed:{isLoading:function(){return this.$state.running()}},methods:{openUiModal:function(e){this.$refs[e].open()},closeUiModal:function(e){this.$refs[e].close()}}}),e.prototype.$path=function(e){if(window.Laravel)return e?window.Laravel.routes[e]:window.Laravel.routes;console.error("Laravel is not globally defined.")}}}},function(e,t,n){"use strict";n.r(t);var r={name:"FormError",props:{name:{type:String,required:!0}},methods:{exists:function(e){return this.$errors.exists(e)},get:function(e){return this.$errors.get(e)}}},o=n(0),i=Object(o.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return this.exists(this.name)?t("span",{staticClass:"error"},[this._v(this._s(this.get(this.name)))]):this._e()}),[],!1,null,null,null);t.default=i.exports},function(e,t,n){"use strict";n.r(t);var r={name:"ErrorModal",props:{title:{default:"Error"}}},o=n(0),i=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("modal",{ref:"errorModal",attrs:{title:e.title}},[n("div",[e.$errors.isUnderMaintenance?e._t("maintenance",[e._v("The site is currently in maintenance. Try again\n            in a moment.\n        ")]):e._e(),e._v(" "),e.$errors.isUnauthorized?e._t("unauthorized",[e._v("This action is not allowed.")]):e._e(),e._v(" "),e.$errors.isUnexpected?e._t("unexpected",[e._v("An unexpected error occurred.")]):e._e(),e._v(" "),e.$errors.isNotFound?e._t("not-found",[e._v("This action does not exist.")]):e._e(),e._v(" "),e.$errors.isUnauthenticated?e._t("unauthenticated",[e._v("You need to be logged in to perform this\n            action.\n        ")]):e._e(),e._v(" "),e.$errors.isExpired?e._t("expired",[e._v("The form has expired. Please reload the page and try again.\n        ")]):e._e(),e._v(" "),e.$errors.isInvalid?e._t("invalid",[e._v("One or more fields are invalid. Please review and try again.\n        ")]):e._e(),e._v(" "),n("div",[e._t("actions",[n("button",{staticClass:"btn btn-danger mt-4",attrs:{type:"button"},on:{click:function(t){return e.closeUiModal("errorModal")}}},[e._v("Close\n                ")])])],2)],2)])}),[],!1,null,null,null);t.default=i.exports},,function(e,t,n){e.exports=n(3)}])}));