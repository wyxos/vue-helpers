export default {
    install(Vue, options) {
        Vue.prototype.$boolean = new Vue({
            data() {
                return {
                    states: []
                };
            },
            methods: {
                toggle(key) {
                    let match = this.find(key);

                    if (!match) {
                        match = this.set(key);
                    }

                    match.value = !match.value;
                },
                find(key) {
                    return this.states.find(state => state.key === key);
                },
                set(key, value = false) {
                    let match = this.find(key);

                    if (match) {
                        match.value = value;

                        return match;
                    }

                    let state = {
                        key,
                        value
                    };

                    this.states.push(state);

                    return state;
                },
                get(key) {
                    let match = this.find(key);
                    return match ? match.value : false;
                }
            }
        });
    }
};
