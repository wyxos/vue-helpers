const keenUi = require('keen-ui/dist/keen-ui.min');
const events = require('vue-events');
const errors = require('./plugins/errors');
const state = require('./plugins/state');
const modals = require('./plugins/modals');
const boolean = require('./plugins/boolean');
const axios = require('./plugins/axios-plugin');

let mixin = {
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

        this.openModal('formErrors');

        throw error;
      }

      if ([401, 419].indexOf(status) > -1) {
        throw error;
      }

      const errors = {
        'unexpected_error': ['An unexpected error occurred']
      };

      this.$errors.setBag(errors);

      this.openModal('formErrors');

      throw error;
    }
  }
};

export default {
  install(Vue, options) {
    Vue.use(keenUi);
    Vue.use(events);
    Vue.use(errors);
    Vue.use(state);
    Vue.use(modals);
    Vue.use(boolean);
    Vue.use(axios);

    Vue.mixin(mixin);

    Vue.prototype.$routes = function (name, parameters) {
      if (!window.Laravel) {
        console.error('Laravel is not globally defined.');
        return;
      }

      return name ? window.Laravel.routes[name] : window.Laravel.routes;
    };
  }
};
