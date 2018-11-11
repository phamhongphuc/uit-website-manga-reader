import axios from 'axios';
import FormData from 'form-data';

const headers = {
    // Authorization: 'Client-ID xxx',
};

export const uploadImage = imageBuffer => {
    const data = new FormData();
    data.append('image', imageBuffer);
    return axios.post('https://api.imgur.com/3/image', data, {
        headers: {
            ...data.getHeaders(),
            ...headers,
        },
    });
};

export const deleteImage = deletehash => {
    return axios.delete(`https://api.imgur.com/3/image/${deletehash}`, {
        headers,
    });
};
