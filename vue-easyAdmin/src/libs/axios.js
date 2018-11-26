import axios from 'axios';
axios.defaults.baseURL = '/api';
export default {
    install(vue) {
        vue.prototype.$fetch = axios;
    }
}