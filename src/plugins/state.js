export default {
  install (Vue) {
    Vue.prototype.$state = new Vue({
      data () {
        return {
          items: []
        }
      },
      methods: {
        running (name) {
          if (!name) {
            return Boolean(this.items.length)
          }

          return Boolean(this.items.find(loader => loader.name === name))
        },
        add (name) {
          if (this.running(name)) {
            return
          }

          this.items.push({
            name
          })
        },
        clear (name) {
          if (!name) {
            this.items = []

            return
          }

          const match = this.items.findIndex(loader => loader.name === name)

          this.items.splice(match, 1)
        }
      }
    })
  }
}
