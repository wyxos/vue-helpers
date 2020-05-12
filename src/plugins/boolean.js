export default {
  install (Vue) {
    Vue.prototype.$boolean = new Vue({
      data () {
        return {
          states: []
        }
      },
      methods: {
        toggle (key) {
          let match = this.find(key)

          if (!match) {
            match = this.set(key)
          }

          match.value = !match.value
        },
        find (key) {
          return this.states.find(state => state.key === key)
        },
        set (key, value = false) {
          const match = this.find(key)

          if (match) {
            match.value = value

            return match
          }

          const state = {
            key,
            value
          }

          this.states.push(state)

          return state
        },
        get (key) {
          const match = this.find(key)
          return match ? match.value : false
        }
      }
    })
  }
}
