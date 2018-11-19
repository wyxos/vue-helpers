export default {
  install(Vue, options) {
    Vue.prototype.$errors = new Vue({
      data: function () {
        return {
          errors: [
            {
              key: 'default',
              items: []
            }
          ]
        };
      },
      methods: {
        setBag: function (errors, bag = 'default') {
          if (typeof errors === 'object') {
            let keys = Object.keys(errors);

            errors = keys.map(key => {
              return {
                key,
                message: errors[key][0]
              };
            });
          }

          this.findBag(bag).items = errors;
        },
        set: function (key, message, bag = 'default') {
          this.findBag(bag).items.push({key, message});
        },
        get: function (key, bag = 'default') {
          return this.findBag(bag)
            .items.find(error => error.key === key)
            .message;
        },
        remove: function (key, bag = 'default') {
          let errors = this.findBag(bag).items;

          let match = errors.findIndex(error => error.key === key);

          errors.splice(match, 1);
        },
        clear: function (bag = 'default') {
          let match = this.findBag(bag);

          if (!match) {
            return;
          }

          match.items = [];
        },
        exists: function (key) {
          return Boolean(this.find(key));
        },
        findBag: function (bag = 'default') {
          return this.errors.find(errorBag => errorBag.key === bag);
        },
        find: function (key, bag = 'default') {
          let match = this.findBag(bag);

          if (!match) {
            return null;
          }

          return match
            .items.find(error => error.key === key);
        }
      }
    });

    Vue.mixin({
      computed: {
        errors() {
          return this.$errors.$data;
        }
      }
    });

    Vue.component('form-error', require('../components/FormErrors.vue'));
  }
};
