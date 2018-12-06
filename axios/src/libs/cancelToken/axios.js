import axios from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const service = axios.create({
    // baseURL:'http://192.168.28.43:8888',
    cancelToken: source.token
})
// source.cancel();
export {service, source}