export default {
  install(Vue) {
    Vue.prototype.$modals = new Vue({
      methods: {
        open(modal) {
          this.$events.fire('openModal', modal);
        },
        close(modal) {
          this.$events.fire('closeModal', modal);
        }
      }
    });
  }
};
