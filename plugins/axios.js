import axios from 'axios';

const options = {};

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.NODE_ENV === 'development' ? 3000 : process.env.PORT || 8080;

options.baseURL = `http://${HOST}:${PORT}`;

export default axios.create(options);
