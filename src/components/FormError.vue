<template>
    <span class="error"
          v-if="exists">{{ get() }}</span>
</template>
<script>
export default {
  name: 'FormError',
  props: {
    name: {
      type: String,
      required: true
    },
    bag: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    exists () {
      return this.$errors.exists(this.name, this.bag)
    },
    get () {
      return this.$errors.get(this.name, this.bag)
    }
  }
}
</script>
