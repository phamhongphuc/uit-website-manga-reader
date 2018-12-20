import axios from 'axios';
import FormData from 'form-data';

const headers = {
    // Authorization: 'Client-ID xxx',
};

/**
 * @param {string | Buffer | import('stream').Stream} imageInput
 */
export const uploadImage = async imageInput => {
    const data = new FormData();
    data.append('image', imageInput);

    const result = await axios.post('https://api.imgur.com/3/image', data, {
        headers: {
            ...data.getHeaders(),
            ...headers,
        },
    });
    return result;
};

export const deleteImage = deletehash => {
    return axios.delete(`https://api.imgur.com/3/image/${deletehash}`, {
        headers,
    });
};
