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
      const state = instanceParams.state || globalParams.state

      const onError = instanceParams.onError || globalParams.onError

      const onSuccess = instanceParams.onSuccess || globalParams.onSuccess

      const instance = axios.create()

      instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

      instance.interceptors.request.use((config) => {
        this.$errors.clear()

        this.$state.add(state)

        return config
      })

      instance.interceptors.response.use((response) => {
        this.$state.clear(state)

        if (onSuccess) {
          onSuccess(response)
        }

        return response
      }, (error) => {
        this.$state.clear(state)

        this.$errors.status = error && error.response ? error.response.status : 500

        const hasErrors = error.response && error.response.data && error.response.data.errors

        const errors = {}

        if (hasErrors) {
          Object.assign(errors, error.response.data.errors)
        }

        this.$errors.setBag(errors)

        if (onError) {
          onError(error)
        }

        return Promise.reject(error)
      })

      return instance
    }
  }
}
