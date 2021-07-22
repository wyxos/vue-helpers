const CODES = {
  SUCCESS: 200,
  INVALID: 422,
  UNEXPECTED: 500,
  NOT_FOUND: 404,
  MAINTENANCE: 503,
  EXPIRED: 419,
  UNAUTHORIZED: 403,
  UNAUTHENTICATED: 401
}

export default {
  install (Vue) {
    Vue.prototype.$errors = new Vue({
      data () {
        return {
          status: null,
          errors: [
            {
              key: 'default',
              items: []
            }
          ]
        }
      },
      computed: {
        isSuccessful () {
          return this.isStatus(CODES.SUCCESS)
        },
        isNotFound () {
          return this.isStatus(CODES.NOT_FOUND)
        },
        isInvalid () {
          return this.isStatus(CODES.INVALID)
        },
        isUnexpected () {
          return this.isStatus(CODES.UNEXPECTED)
        },
        isExpired () {
          return this.isStatus(CODES.EXPIRED)
        },
        isUnderMaintenance () {
          return this.isStatus(CODES.MAINTENANCE)
        },
        isUnauthorized () {
          return this.isStatus(CODES.UNAUTHORIZED)
        },
        isUnauthenticated () {
          return this.isStatus(CODES.UNAUTHENTICATED)
        }
      },
      methods: {
        setBag (errors, bag = 'default') {
          if (typeof errors === 'object') {
            const keys = Object.keys(errors)

            errors = keys.map(key => {
              return {
                key,
                message: errors[key][0]
              }
            })
          }

          this.findBag(bag).items = errors
        },
        set (key, message, bag = 'default') {
          this.findBag(bag).items.push({
            key,
            message
          })
        },
        get (key, bag = 'default') {
          return this.findBag(bag)
            .items.find(error => error.key === key)
            .message
        },
        remove (key, bag = 'default') {
          const errors = this.findBag(bag).items

          const match = errors.findIndex(error => error.key === key)

          errors.splice(match, 1)
        },
        clear (bag = 'default') {
          this.status = null

          const match = this.findBag(bag)

          if (!match) {
            return
          }

          match.items = []
        },
        exists (key) {
          return Boolean(this.find(key))
        },
        findBag (bag = 'default') {
          const match = this.errors.find(errorBag => errorBag.key === bag)

          if (!match) {
            this.errors.push({
              key: bag,
              items: []
            })
          }

          return this.errors.find(errorBag => errorBag.key === bag)
        },
        find (key, bag = 'default') {
          const match = this.findBag(bag)

          if (!match) {
            return null
          }

          return match
            .items.find(error => error.key === key)
        },
        isStatus (code) {
          return this.status === code
        }
      }
    })

    Vue.component('form-error', require('../components/FormError.vue').default)

    Vue.component('error-modal', require('../components/ErrorModal.vue').default)
  }
}
