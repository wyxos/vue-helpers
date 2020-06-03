import axios from 'axios'

export default {
  install (Vue, globalParams = {
    state: 'ajax',
    onSuccess: null,
    onError: null
  }) {
    Vue.prototype.$axios = function (instanceParams = {
      state: 'ajax',
      onSuccess: null,
      onError: null
    }) {
      const options = Object.assign(globalParams, instanceParams)

      const instance = axios.create()

      instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

      instance.interceptors.request.use((config) => {
        this.$errors.clear()

        this.$state.add(options.state)

        return config
      })

      instance.interceptors.response.use((response) => {
        this.$state.clear(options.state)

        if (options.onSuccess) {
          options.onSuccess(response)
        }

        return response
      }, (error) => {
        this.$state.clear(options.state)

        this.$errors.status = error && error.response ? error.response.status : 500

        const hasErrors = error.response && error.response.data && error.response.data.errors

        const errors = {}

        if (hasErrors) {
          Object.assign(errors, error.response.data.errors)
        }

        this.$errors.setBag(errors)

        if (options.onError) {
          options.onError(error)
        }

        return Promise.reject(error)
      })

      return instance
    }
  }
}
