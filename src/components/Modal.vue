<template>
    <div v-if="show">
        <slot>Modal content</slot>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      open () {
        this.show = true
      },
      close () {
        this.show = false
      }
    }
  }
</script>
