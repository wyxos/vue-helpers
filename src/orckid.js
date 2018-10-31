import errors from './errors';
import events from 'vue-events';
import state from './state';
import modals from './modals';
import boolean from './boolean';
import request from './request';
import KeenUi from 'keen-ui/dist/keen-ui.min';

export default {
  install(Vue, options) {
    Vue.use(KeenUi);
    Vue.use(events);
    Vue.use(errors);
    Vue.use(state);
    Vue.use(modals);
    Vue.use(boolean);

    Vue.prototype.$axios = request;

    Vue.prototype.$routes = function (name, parameters) {
      return name ? window.Laravel.routes[name] : window.Laravel.routes;
    };

    Vue.mixin({
      methods: {
        openModal(ref) {
          this.$refs[ref].open();
        },
        closeModal(ref) {
          this.$refs[ref].close();
        }
      }
    });
  }
};
