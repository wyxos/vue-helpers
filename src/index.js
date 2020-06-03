// import keenUi from 'keen-ui'
import events from 'vue-events'
import errors from './plugins/errors'
import state from './plugins/state'
import modals from './plugins/modals'
import boolean from './plugins/boolean'
import axios from './plugins/axios'
import cookies from './plugins/cookies'
import Modal from './components/Modal'

export default {
  install (Vue, options = {
    axios: {
      state: 'ajax',
      showError: null
    }
  }) {
    // Vue.use(keenUi)
    Vue.component('modal', Modal)
    Vue.use(events)
    Vue.use(errors)
    Vue.use(state)
    Vue.use(modals)
    Vue.use(boolean)
    Vue.use(axios, options.axios)
    Vue.use(cookies)

    Vue.mixin({
      mounted () {
        this.$events.on('openModal', modal => {
          if (!this.$refs[modal]) {
            return
          }

          this.openUiModal(modal)
        })

        this.$events.on('closeModal', modal => {
          if (!this.$refs[modal]) {
            return
          }

          this.closeUiModal(modal)
        })
      },
      computed: {
        isLoading () {
          return this.$state.running()
        }
      },
      methods: {
        openUiModal (ref) {
          this.$refs[ref].open()
        },
        closeUiModal (ref) {
          this.$refs[ref].close()
        }
      }
    })

    Vue.prototype.$path = function (name) {
      if (!window.Laravel) {
        console.error('Laravel is not globally defined.')
        return
      }

      return name ? window.Laravel.routes[name] : window.Laravel.routes
    }
  }
}
