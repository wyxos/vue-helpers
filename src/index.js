import keenUi from 'keen-ui';
import events from 'vue-events';
import errors from './plugins/errors';
import state from './plugins/state';
import modals from './plugins/modals';
import boolean from './plugins/boolean';
import axios from './plugins/axios';

export default {
  install(Vue) {
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
        onFormError() {
          this.$modals.open('errorModal')
        }
      }
    });

    Vue.use(keenUi);
    Vue.use(events);
    Vue.use(errors);
    Vue.use(state);
    Vue.use(modals);
    Vue.use(boolean);
    Vue.use(axios);

    Vue.prototype.$path = function (name) {
      if (!window.Laravel) {
        console.error('Laravel is not globally defined.');
        return;
      }

      return name ? window.Laravel.routes[name] : window.Laravel.routes;
    };
  }
};
