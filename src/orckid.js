import errors from './errors';
import events from 'vue-events';
import state from './state';
import modals from './modals';
import boolean from './boolean';
import request from './request';

export default {
    install(Vue, options) {
        Vue.use(require('keen-ui'));
        Vue.use(events);
        Vue.use(errors);
        Vue.use(state);
        Vue.use(modals);
        Vue.use(boolean);

        Vue.prototype.$axios = request;

        Vue.prototype.$routes = function (name, parameters) {
            return name ? window.Laravel.routes[name] : window.Laravel.routes;
        };

        Vue.prototype.$openModal = function (ref) {
            this.$refs[ref].open();
        };

        Vue.prototype.$closeModal = function (ref) {
            this.$refs[ref].close();
        };
    }
};
