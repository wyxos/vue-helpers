<template>
    <span class="error"
          v-if="exists(name)">{{ get(name) }}</span>
</template>
<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      }
    },
    methods: {
      exists(name) {
        return this.$errors.exists(name);
      },
      get(name) {
        return this.$errors.get(name);
      }
    }
  };
</script>
