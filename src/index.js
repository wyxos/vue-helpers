import keenUi from 'keen-ui';
import events from 'vue-events';
import errors from './plugins/errors';
import state from './plugins/state';
import modals from './plugins/modals';
import boolean from './plugins/boolean';
import axios from './plugins/axios';

export default {
  install(Vue) {
    Vue.use(keenUi);
    Vue.use(events);
    Vue.use(errors);
    Vue.use(state);
    Vue.use(modals);
    Vue.use(boolean);
    Vue.use(axios);

    Vue.mixin({
      mounted() {
        this.$events.on('openModal', modal => {
          if (!this.$refs[modal]) {
            return
          }

          this.openModal(modal)
        })

        this.$events.on('closeModal', modal => {
          if (!this.$refs[modal]) {
            return
          }

          this.closeModal(modal)
        })
      },
      computed: {
        isLoading() {
          return this.$state.running()
        }
      },
      methods: {
        openModal(ref) {
          this.$refs[ref].open();
        },
        closeModal(ref) {
          this.$refs[ref].close();
        },
        handleError(error) {
          this.$errors.status = error && error.response ? error.response.status : 500

          const hasErrors = error.response && error.response.data && error.response.data.errors;

          let errors = {};

          if (hasErrors) {
            Object.assign(errors, error.response.data.errors)
          }

          this.$errors.setBag(errors);

          this.onFormError()

          throw error
        },
        onFormError() {
          this.$modals.open('errorModal')
        }
      }
    });

    Vue.prototype.$route = function (name) {
      if (!window.Laravel) {
        console.error('Laravel is not globally defined.');
        return;
      }

      return name ? window.Laravel.routes[name] : window.Laravel.routes;
    };
  }
};
