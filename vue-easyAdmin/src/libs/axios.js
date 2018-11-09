import axios from 'axios';

export default {
    install(vue) {
        vue.prototype.$fetch = axios;
    }
}