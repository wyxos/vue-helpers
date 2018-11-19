export default {
  install: function (Vue, options) {
    Vue.prototype.$state = new Vue({
      data: function () {
        return {
          items: []
        };
      },
      methods: {
        running: function (name) {
          if (!name) {
            return Boolean(this.items.length);
          }

          return Boolean(this.items.find(loader => loader.name === name));
        },
        add: function (name) {
          if (this.running(name)) {
            return;
          }

          this.items.push({
            name
          });
        },
        clear: function (name) {
          if (!name) {
            this.items = [];

            return;
          }

          const match = this.items.findIndex(loader => loader.name === name);

          this.items.splice(match, 1);
        }
      }
    });
  }
};
