import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: "https://bite-manager-server.vercel.app",
});

export default axiosPublic;
