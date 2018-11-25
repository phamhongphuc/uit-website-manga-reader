import axios from 'axios';

export default axios.create({
    baseURL: process.env.DATA_API,
});
