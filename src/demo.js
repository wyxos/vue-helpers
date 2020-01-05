import Vue from 'vue'
import helpers from './index'
import Example from "./components/Example";

Vue.use(helpers)

new Vue({
    components: {
        Example
    },
    el: '#app',
    data: {
        ajaxContent: null
    },
    methods: {
        ajax() {
            return this.$axios().get('https://jsonplaceholder.typicode.com/todos/1')
                .then(response => response.data)
                .then(data => {
                    this.ajaxContent = data
                })
        },
        showError(code){
            this.$errors.status = code;

            this.$modals.open('errorModal')
        }
    }
})
