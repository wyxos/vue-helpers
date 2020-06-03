import Vue from 'vue'
import helpers from './index'
import Example from './components/Example'

Vue.use(helpers, {
  axios: {
    onSuccess (response) {
      console.log('cool')
    },
    onError (error) {
      console.log('default error')
    }
  }
})

const app = new Vue({
  components: {
    Example
  },
  data: {
    ajaxContent: null
  },
  methods: {
    ajax () {
      return this.$axios().get('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.data)
        .then(data => {
          this.ajaxContent = data
        })
    },
    showError (code) {
      return this.$axios().get('https://undefined.com')
        .then(response => response.data)
        .then(data => {
          this.ajaxContent = data
        })
    },
    customErrorHandler () {
      return this.$axios({
        onError: () => {
          console.log('custom error')
        }
      }).get('https://laravel.com/test')
        .then(response => response.data)
        .then(data => {
          this.ajaxContent = data
        })
    }
  }
})

app.$mount('#app')
