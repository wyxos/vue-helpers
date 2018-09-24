import errors from './errors';
import events from 'vue-events';
import state from './state';
import modals from './modals';
import boolean from './boolean';
import request from './request';
import UiAlert from 'keen-ui/src/UiAlert';
import UiButton from 'keen-ui/src/UiButton';
import UiConfirm from 'keen-ui/src/UiConfirm';
import UiIcon from 'keen-ui/src/UiIcon';
import UiModal from 'keen-ui/src/UiModal';

export default {
    install(Vue, options) {
        Vue.component('ui-alert', UiAlert);
        Vue.component('ui-button', UiButton);
        Vue.component('ui-confirm', UiConfirm);
        Vue.component('ui-icon', UiIcon);
        Vue.component('ui-modal', {
            mixins: [UiModal],
            methods: {
                restrictFocus(e) {
                    // if (!this.$refs.container.contains(e.target)) {
                    //   e.stopPropagation();
                    //   this.$refs.container.focus();
                    // }
                }
            }
        });

        Vue.use(events);
        Vue.use(errors);
        Vue.use(state);
        Vue.use(modals);
        Vue.use(boolean);

        Vue.prototype.$axios = request;

        Vue.prototype.$routes = function (name, parameters) {
            return name ? window.Laravel.routes[name] : window.Laravel.routes;
        };

        Vue.prototype.$openModal = function (ref) {
            this.$refs[ref].open();
        };

        Vue.prototype.$closeModal = function (ref) {
            this.$refs[ref].close();
        };
    }
};
