import axios from 'axios';

export default function ajax(method, path, data, callback) {
  this.$state.add('ajax');

  return axios[method](path, data)
    .then((response) => {
      this.$state.clear('ajax');
      callback(response);
    })
    .catch((error) => {

    });
};
