!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("vue-events"),require("axios"),require("vue")):"function"==typeof define&&define.amd?define("VueHelpers",["vue-events","axios","vue"],e):"object"==typeof exports?exports.VueHelpers=e(require("vue-events"),require("axios"),require("vue")):t.VueHelpers=e(t["vue-events"],t.axios,t.vue)}(window,(function(t,e,n){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=8)}([function(t,e,n){"use strict";function r(t,e,n,r,o,i,s,u){var a,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),s?(a=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},l._ssrRegister=a):o&&(a=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(l.functional){l._injectStyles=a;var c=l.render;l.render=function(t,e){return a.call(e),c(t,e)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,a):[a]}return{exports:t,options:l}}n.d(e,"a",(function(){return r}))},function(e,n){e.exports=t},function(t,e,n){"use strict";n.r(e);var r=n(1),o=n.n(r);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s=200,u=422,a=500,l=404,c=503,f=419,d=403,h=401,p={install:function(t){t.prototype.$errors=new t({data:function(){return{status:null,errors:[{key:"default",items:[]}]}},computed:{isSuccessful:function(){return this.isStatus(s)},isNotFound:function(){return this.isStatus(l)},isInvalid:function(){return this.isStatus(u)},isUnexpected:function(){return this.isStatus(a)},isExpired:function(){return this.isStatus(f)},isUnderMaintenance:function(){return this.isStatus(c)},isUnauthorized:function(){return this.isStatus(d)},isUnauthenticated:function(){return this.isStatus(h)}},methods:{setBag:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default";if("object"===i(t)){var n=Object.keys(t);t=n.map((function(e){return{key:e,message:t[e][0]}}))}this.findBag(e).items=t},set:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"default";this.findBag(n).items.push({key:t,message:e})},get:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default";return this.findBag(e).items.find((function(e){return e.key===t})).message},remove:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",n=this.findBag(e).items,r=n.findIndex((function(e){return e.key===t}));n.splice(r,1)},clear:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default";this.status=null;var e=this.findBag(t);e&&(e.items=[])},exists:function(t){return Boolean(this.find(t))},findBag:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default";return this.errors.find((function(e){return e.key===t}))},find:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",n=this.findBag(e);return n?n.items.find((function(e){return e.key===t})):null},isStatus:function(t){return this.status===t}}}),t.component("form-error",n(4).default),t.component("error-modal",n(5).default)}},v={install:function(t){t.prototype.$state=new t({data:function(){return{items:[]}},methods:{running:function(t){return t?Boolean(this.items.find((function(e){return e.name===t}))):Boolean(this.items.length)},add:function(t){this.running(t)||this.items.push({name:t})},clear:function(t){if(t){var e=this.items.findIndex((function(e){return e.name===t}));this.items.splice(e,1)}else this.items=[]}}})}},m={install:function(t){t.prototype.$modals=new t({methods:{open:function(t){this.$events.fire("openModal",t)},close:function(t){this.$events.fire("closeModal",t)}}})}},_={install:function(t){t.prototype.$boolean=new t({data:function(){return{states:[]}},methods:{toggle:function(t){var e=this.find(t);e||(e=this.set(t)),e.value=!e.value},find:function(t){return this.states.find((function(e){return e.key===t}))},set:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.find(t);if(n)return n.value=e,n;var r={key:t,value:e};return this.states.push(r),r},get:function(t){var e=this.find(t);return!!e&&e.value}}})}},g=n(3),x={install:function(t){t.prototype.$axios=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{state:"ajax",errorModal:null},n=g.create();return n.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",n.interceptors.request.use((function(n){return t.$errors.clear(),t.$state.add(e.state),n})),n.interceptors.response.use((function(n){return t.$state.clear(e.state),n}),(function(n){return t.$state.clear(e.state),t.handleFormError(n),null===e.errorModal?t.onFormError():e.errorModal&&e.errorModal(n),Promise.reject(n)})),n}}},y={install:function(t){t.prototype.$cookies=new t({methods:{create:function(t,e,n){var r;if(n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3),r="; expires="+o.toGMTString()}else r="";document.cookie=t+"="+e+r+"; path=/; secure; SameSite=Lax;"},read:function(t){for(var e=t+"=",n=document.cookie.split(";"),r=0;r<n.length;r++){for(var o=n[r];" "===o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(e))return o.substring(e.length,o.length)}return null},delete:function(t){this.create(t,"",-1)}}})}},$={data:function(){return{show:!1}},methods:{open:function(){this.show=!0},close:function(){this.show=!1}}},b=n(0),M=Object(b.a)($,(function(){var t=this.$createElement,e=this._self._c||t;return this.show?e("div",[this._t("default",[this._v("Modal content")])],2):this._e()}),[],!1,null,null,null).exports;e.default={install:function(t){t.component("modal",M),t.use(o.a),t.use(p),t.use(v),t.use(m),t.use(_),t.use(x),t.use(y),t.mixin({mounted:function(){var t=this;this.$events.on("openModal",(function(e){t.$refs[e]&&t.openUiModal(e)})),this.$events.on("closeModal",(function(e){t.$refs[e]&&t.closeUiModal(e)}))},computed:{isLoading:function(){return this.$state.running()}},methods:{openUiModal:function(t){this.$refs[t].open()},closeUiModal:function(t){this.$refs[t].close()},handleFormError:function(t){this.$errors.status=t&&t.response?t.response.status:500;var e={};t.response&&t.response.data&&t.response.data.errors&&Object.assign(e,t.response.data.errors),this.$errors.setBag(e)},onFormError:function(){this.$modals.open("errorModal")}}}),t.prototype.$path=function(t){if(window.Laravel)return t?window.Laravel.routes[t]:window.Laravel.routes;console.error("Laravel is not globally defined.")}}}},function(t,n){t.exports=e},function(t,e,n){"use strict";n.r(e);var r={name:"FormError",props:{name:{type:String,required:!0}},methods:{exists:function(t){return this.$errors.exists(t)},get:function(t){return this.$errors.get(t)}}},o=n(0),i=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return this.exists(this.name)?e("span",{staticClass:"error"},[this._v(this._s(this.get(this.name)))]):this._e()}),[],!1,null,null,null);e.default=i.exports},function(t,e,n){"use strict";n.r(e);var r={name:"ErrorModal",props:{title:{default:"Error"}}},o=n(0),i=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("modal",{ref:"errorModal",attrs:{title:t.title}},[n("div",[t.$errors.isUnderMaintenance?t._t("maintenance",[t._v("The site is currently in maintenance. Try again\n            in a moment.\n        ")]):t._e(),t._v(" "),t.$errors.isUnauthorized?t._t("unauthorized",[t._v("This action is not allowed.")]):t._e(),t._v(" "),t.$errors.isUnexpected?t._t("unexpected",[t._v("An unexpected error occurred.")]):t._e(),t._v(" "),t.$errors.isNotFound?t._t("not-found",[t._v("This action does not exist.")]):t._e(),t._v(" "),t.$errors.isUnauthenticated?t._t("unauthenticated",[t._v("You need to be logged in to perform this\n            action.\n        ")]):t._e(),t._v(" "),t.$errors.isExpired?t._t("expired",[t._v("The form has expired. Please reload the page and try again.\n        ")]):t._e(),t._v(" "),t.$errors.isInvalid?t._t("invalid",[t._v("One or more fields are invalid. Please review and try again.\n        ")]):t._e(),t._v(" "),n("div",[t._t("actions",[n("button",{staticClass:"btn btn-danger mt-4",attrs:{type:"button"},on:{click:function(e){return t.closeUiModal("errorModal")}}},[t._v("Close\n                ")])])],2)],2)])}),[],!1,null,null,null);e.default=i.exports},function(t,e){t.exports=n},,function(t,e,n){t.exports=n(9)},function(t,e,n){"use strict";n.r(e);var r=n(6),o=n.n(r),i=n(2),s={name:"Example"},u=n(0),a=Object(u.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("modal",{ref:"exampleModal"},[n("button",{on:{click:function(e){return t.closeUiModal("exampleModal")}}},[t._v("Close")])]),t._v(" "),n("button",{on:{click:function(e){return t.openUiModal("exampleModal")}}},[t._v("\n        Open\n    ")]),t._v(" "),n("button",{on:{click:function(e){return t.$modals.open("globalModal")}}},[t._v("Open global")])],1)}),[],!1,null,null,null).exports;o.a.use(i.default),new o.a({components:{Example:a},data:{ajaxContent:null},methods:{ajax:function(){var t=this;return this.$axios().get("https://jsonplaceholder.typicode.com/todos/1").then((function(t){return t.data})).then((function(e){t.ajaxContent=e}))},showError:function(t){var e=this;return this.$axios().get("https://undefined.com").then((function(t){return t.data})).then((function(t){e.ajaxContent=t}))},customErrorHandler:function(){var t=this;return this.$axios({errorModal:function(){console.log(t.$state.items)}}).get("https://undefined.com").then((function(t){return t.data})).then((function(e){t.ajaxContent=e}))}}}).$mount("#app")}])}));