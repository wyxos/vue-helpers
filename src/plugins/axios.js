const axios = require('axios');

export default {
  install(Vue) {
    Vue.prototype.$axios = function(options = {state: 'ajax'}){
      let instance = axios.create();

      instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

      instance.interceptors.request.use((config) => {
        this.$errors.clear();

        this.$state.add(options.state);

        return config;
      });

      instance.interceptors.response.use((response) => {
        this.$state.clear(options.state);

        return response;
      }, (error) => {
        this.$state.clear(options.state);

        this.$errors.handleError(error).bind(this);

        return Promise.reject(error);
      });

      return instance;
    };
  }
};
