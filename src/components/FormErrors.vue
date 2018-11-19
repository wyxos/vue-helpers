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
      exists: function (name) {
        return this.$errors.exists(name);
      },
      get: function (name) {
        return this.$errors.get(name);
      }
    }
  };
</script>
