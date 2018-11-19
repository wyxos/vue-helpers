export default {
  install: function (Vue, options) {
    Vue.prototype.$boolean = new Vue({
      data: function () {
        return {
          states: []
        };
      },
      methods: {
        toggle: function (key) {
          let match = this.find(key);

          if (!match) {
            match = this.set(key);
          }

          match.value = !match.value;
        },
        find: function (key) {
          return this.states.find(state => state.key === key);
        },
        set: function (key, value = false) {
          let match = this.find(key);

          if (match) {
            match.value = value;

            return match;
          }

          let state = {
            key,
            value
          };

          this.states.push(state);

          return state;
        },
        get: function (key) {
          let match = this.find(key);
          return match ? match.value : false;
        }
      }
    });
  }
};
