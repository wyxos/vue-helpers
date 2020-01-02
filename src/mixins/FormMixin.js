export default {
  data () {
    return {
      form: this.formData()
    }
  },
  methods: {
    action () {
      throw Error('No url defined for form submission.')
    },
    formData () {
      throw Error('No form data structure defined.')
    },
    submit () {
      return this.$axios().post(this.action(), this.form)
        .then(response => response.data)
        .then(this.onSuccess)
    },
    onSuccess (data) {
      throw Error('Form submitted successfully but no onSuccess method defined.')
    },
    updateFormData (data) {
      Object.assign(this.form, data.user)
    }
  }
}
