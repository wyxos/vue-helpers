import Vue from 'vue'
import helpers from './index'
import Example from "./components/Example";

Vue.use(helpers)

new Vue({
  components: {
    Example
  },
  el: '#app'
})