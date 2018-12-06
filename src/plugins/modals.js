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

    Vue.mixin({
      mounted() {
        this.$events.on('openModal', (modal) => {
          let match = this.$refs[modal];
          if (!match) {
            return;
          }
          match.open();
        });

        this.$events.on('closeModal', (modal) => {
          let match = this.$refs[modal];
          if (!match) {
            return;
          }
          match.close();
        })
      }
    })
  }
};
