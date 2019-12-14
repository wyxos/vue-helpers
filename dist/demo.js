!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("keen-ui"),require("vue-events"),require("axios"),require("vue")):"function"==typeof define&&define.amd?define("VueHelpers",["keen-ui","vue-events","axios","vue"],t):"object"==typeof exports?exports.VueHelpers=t(require("keen-ui"),require("vue-events"),require("axios"),require("vue")):e.VueHelpers=t(e["keen-ui"],e["vue-events"],e.axios,e.vue)}(window,(function(e,t,n,r){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=9)}([function(e,t,n){"use strict";function r(e,t,n,r,o,i,s,u){var a,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),i&&(l._scopeId="data-v-"+i),s?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},l._ssrRegister=a):o&&(a=u?function(){o.call(this,this.$root.$options.shadowRoot)}:o),a)if(l.functional){l._injectStyles=a;var c=l.render;l.render=function(e,t){return a.call(t),c(e,t)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,a):[a]}return{exports:e,options:l}}n.d(t,"a",(function(){return r}))},function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),i=n(2),s=n.n(i);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var a={install:function(e){e.prototype.$errors=new e({data:function(){return{status:null,errors:[{key:"default",items:[]}]}},computed:{isSuccessful:function(){return this.isStatus(200)},isInvalid:function(){return this.isStatus(422)},isUnexpected:function(){return this.isStatus(500)},isExpired:function(){return this.isStatus(419)},isUnderMaintenance:function(){return this.isStatus(503)},isUnauthorized:function(){return this.isStatus(403)}},methods:{setBag:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default";if("object"===u(e)){var n=Object.keys(e);e=n.map((function(t){return{key:t,message:e[t][0]}}))}this.findBag(t).items=e},set:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"default";this.findBag(n).items.push({key:e,message:t})},get:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default";return this.findBag(t).items.find((function(t){return t.key===e})).message},remove:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",n=this.findBag(t).items,r=n.findIndex((function(t){return t.key===e}));n.splice(r,1)},clear:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default";this.status=null;var t=this.findBag(e);t&&(t.items=[])},exists:function(e){return Boolean(this.find(e))},findBag:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"default";return this.errors.find((function(t){return t.key===e}))},find:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",n=this.findBag(t);return n?n.items.find((function(t){return t.key===e})):null},isStatus:function(e){return this.status===e}}}),e.component("form-error",n(5).default),e.component("error-modal",n(6).default)}},l={install:function(e){e.prototype.$state=new e({data:function(){return{items:[]}},methods:{running:function(e){return e?Boolean(this.items.find((function(t){return t.name===e}))):Boolean(this.items.length)},add:function(e){this.running(e)||this.items.push({name:e})},clear:function(e){if(e){var t=this.items.findIndex((function(t){return t.name===e}));this.items.splice(t,1)}else this.items=[]}}})}},c={install:function(e){e.prototype.$modals=new e({methods:{open:function(e){this.$events.fire("openModal",e)},close:function(e){this.$events.fire("closeModal",e)}}})}},f={install:function(e){e.prototype.$boolean=new e({data:function(){return{states:[]}},methods:{toggle:function(e){var t=this.find(e);t||(t=this.set(e)),t.value=!t.value},find:function(e){return this.states.find((function(t){return t.key===e}))},set:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.find(e);if(n)return n.value=t,n;var r={key:e,value:t};return this.states.push(r),r},get:function(e){var t=this.find(e);return!!t&&t.value}}})}},d=n(4),p={install:function(e){e.prototype.$axios=function(){var e=this,t=d.create();t.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";var n=document.head.querySelector('meta[name="csrf-token"]');return n?t.defaults.headers.common["X-CSRF-TOKEN"]=n.content:console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"),t.interceptors.request.use((function(t){return e.$errors.clear(),e.$state.add("ajax"),t})),t.interceptors.response.use((function(t){return e.$state.clear("ajax"),t}),(function(t){return e.$state.clear("ajax"),e.handleError(t),Promise.reject(t)})),t}}};t.default={install:function(e){e.use(o.a),e.use(s.a),e.use(a),e.use(l),e.use(c),e.use(f),e.use(p),e.mixin({mounted:function(){var e=this;this.$events.on("openModal",(function(t){e.$refs[t]&&e.openModal(t)})),this.$events.on("closeModal",(function(t){e.$refs[t]&&e.closeModal(t)}))},computed:{isLoading:function(){return this.$state.running()}},methods:{openModal:function(e){this.$refs[e].open()},closeModal:function(e){this.$refs[e].close()},handleError:function(e){this.$errors.status=e&&e.response?e.response.status:500;var t={};throw e.response&&e.response.data&&e.response.data.errors&&Object.assign(t,e.response.data.errors),this.$errors.setBag(t),this.onFormError(),e},onFormError:function(){this.$modals.open("errorModal")}}}),e.prototype.$route=function(e){if(window.Laravel)return e?window.Laravel.routes[e]:window.Laravel.routes;console.error("Laravel is not globally defined.")}}}},function(e,t){e.exports=n},function(e,t,n){"use strict";n.r(t);var r={name:"FormError",props:{name:{type:String,required:!0}},methods:{exists:function(e){return this.$errors.exists(e)},get:function(e){return this.$errors.get(e)}}},o=n(0),i=Object(o.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return this.exists(this.name)?t("span",{staticClass:"error"},[this._v(this._s(this.get(this.name)))]):this._e()}),[],!1,null,null,null);t.default=i.exports},function(e,t,n){"use strict";n.r(t);var r={name:"ErrorModal"},o=n(0),i=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ui-modal",{ref:"errorModal",attrs:{title:"Error"}},[n("div",{staticClass:"text-center"},[e.$errors.isUnderMaintenance?n("p",[e._v("The site is currently in maintenance. Try again in a moment.")]):e._e(),e._v(" "),e.$errors.isUnauthorized?n("p",[e._v("This action is not allowed.")]):e._e(),e._v(" "),e.$errors.isUnexpected?n("p",[e._v("An unexpected error occurred.")]):e._e(),e._v(" "),e.$errors.isExpired?n("p",[e._v("The form has expired. Please reload the page and try again.")]):e._e(),e._v(" "),e.$errors.isInvalid?n("p",[e._v("There is an error within the form or fields required for this action. "),n("br"),e._v("Please\n            review.")]):e._e(),e._v(" "),n("button",{staticClass:"btn btn-primary mt-4",attrs:{type:"button"},on:{click:function(t){return e.closeModal("errorModal")}}},[e._v("Close\n        ")])])])}),[],!1,null,null,null);t.default=i.exports},function(e,t){e.exports=r},,function(e,t,n){e.exports=n(10)},function(e,t,n){"use strict";n.r(t);var r=n(7),o=n.n(r),i=n(3),s={name:"Example"},u=n(0),a=Object(u.a)(s,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ui-modal",{ref:"exampleModal"},[n("button",{on:{click:function(t){return e.closeModal("exampleModal")}}},[e._v("Close")])]),e._v(" "),n("button",{on:{click:function(t){return e.openModal("exampleModal")}}},[e._v("\n        Open\n    ")]),e._v(" "),n("button",{on:{click:function(t){return e.$modals.open("globalModal")}}},[e._v("Open global")])],1)}),[],!1,null,null,null).exports;o.a.use(i.default),new o.a({components:{Example:a},el:"#app"})}])}));