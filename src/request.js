import axios from 'axios';

export default function ajax(method, path, data, callback) {
    this.$state.add('ajax');

    return axios[method](path, data)
        .then((response) => {
            this.$state.clear('ajax');
            callback(response);
        })
        .catch((error) => {
            this.$state.clear('ajax');
            if (error.response && error.response.status === 422) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // let errorMessage = 'An error occurred.';

                let errors = error.response.data.errors;

                this.$errors.setBag(errors);

                this.$modals.open('error', {
                    title: 'Error',
                    content: 'Your submission is invalid. Please review and try again.'
                });
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                this.$modals.open('error', {
                    title: 'Error',
                    content: 'An unexpected error occurred. Please try again or contact the site administrator.'
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                this.$modals.open('error', {
                    title: 'Error',
                    content: 'An unexpected error occurred. Please try again or contact the site administrator.'
                });
            }
            console.log(error, error.message);
        });
};
