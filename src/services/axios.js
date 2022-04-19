import axios from 'axios';

const axiosConfig = axios.create();

axiosConfig.defaults.baseURL = 'http://192.168.0.21';

export default axiosConfig;
