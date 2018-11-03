import axios from 'axios';

const options = {};

const PORT = 3000; // process.env.NODE_ENV == 'development' ? 3000 : process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

options.baseURL = `http://${HOST}:${PORT}`;

export default axios.create(options);
