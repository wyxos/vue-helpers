export default {
  install(Vue) {
    Vue.prototype.$errors = new Vue({
      data() {
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
        setBag(errors, bag = 'default') {
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
        set(key, message, bag = 'default') {
          this.findBag(bag).items.push({key, message});
        },
        get(key, bag = 'default') {
          return this.findBag(bag)
            .items.find(error => error.key === key)
            .message;
        },
        remove(key, bag = 'default') {
          let errors = this.findBag(bag).items;

          let match = errors.findIndex(error => error.key === key);

          errors.splice(match, 1);
        },
        clear(bag = 'default') {
          let match = this.findBag(bag);

          if (!match) {
            return;
          }

          match.items = [];
        },
        exists(key) {
          return Boolean(this.find(key));
        },
        findBag(bag = 'default') {
          return this.errors.find(errorBag => errorBag.key === bag);
        },
        find(key, bag = 'default') {
          let match = this.findBag(bag);

          if (!match) {
            return null;
          }

          return match
            .items.find(error => error.key === key);
        }
      }
    });

    Vue.component('form-error', require('../components/FormError.vue').default);
  }
};
