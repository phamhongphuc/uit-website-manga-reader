import axios from 'axios';
import FormData from 'form-data';

const headers = {
    // Authorization: 'Client-ID xxx',
};

/**
 * @typedef {import('stream').Stream} Stream
 * @param {import('../interface/image').ImageUploadInput} imageInput
 */
export const uploadImage = imageInput => {
    const data = new FormData();
    data.append('image', imageInput);
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
