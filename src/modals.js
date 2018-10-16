export default {
  install(Vue, options) {
    Vue.component('modals', require('./components/Modals.vue'));

    Vue.prototype.$modals = new Vue({
      methods: {
        open(modal, options) {
          this.$events.fire('openModal', modal, options);
        },
        close(modal, options) {
          this.$events.fire('closeModal', modal, options);
        }
      }
    });
  }
};
