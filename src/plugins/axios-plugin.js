const axios = require('axios');

export default {
  install(Vue) {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    let token = document.head.querySelector('meta[name="csrf-token"]');

    if (token) {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    } else {
      console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }

    Vue.prototype.$axios = function () {
      axios.interceptors.request.use((config) => {
        this.$errors.clear();

        this.$state.add('ajax');

        return config;
      });

      axios.interceptors.response.use((response) => {
        this.$state.clear('ajax');
        return response;
      }, (error) => {
        this.$state.clear('ajax');

        this.handleError(error);

        return Promise.reject(error);
      });

      return axios;
    };
  }
};
