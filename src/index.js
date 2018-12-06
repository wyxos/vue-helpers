import keenUi from 'keen-ui/dist/keen-ui.min';
import events from 'vue-events';
import errors from './plugins/errors';
import state from './plugins/state';
import modals from './plugins/modals';
import boolean from './plugins/boolean';
import axios from './plugins/axios-plugin';

export default {
  install(Vue, options) {
    Vue.use(keenUi);
    Vue.use(events);
    Vue.use(errors);
    Vue.use(state);
    Vue.use(modals);
    Vue.use(boolean);
    Vue.use(axios);

    Vue.mixin({
      methods: {
        openModal(ref) {
          this.$refs[ref].open();
        },
        closeModal(ref) {
          this.$refs[ref].close();
        },
        handleError(error) {
          const status = error && error.response ? error.response.status : 500;

          const hasErrors = error.response && error.response.data && error.response.data.errors;

          if (status === 403) {
            throw error;
          }

          if (hasErrors && status === 422) {
            this.$errors.setBag(error.response.data.errors);

            this.$modals.open('formErrors');

            throw error;
          }

          if ([401, 419].indexOf(status) > -1) {
            throw error;
          }

          const errors = {
            'unexpected_error': ['An unexpected error occurred']
          };

          this.$errors.setBag(errors);

          this.$modals.open('formErrors');

          throw error;
        }
      }
    });

    Vue.prototype.$routes = function (name) {
      if (!window.Laravel) {
        console.error('Laravel is not globally defined.');
        return;
      }

      return name ? window.Laravel.routes[name] : window.Laravel.routes;
    };
  }
};
