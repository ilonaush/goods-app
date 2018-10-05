import axios from 'axios';

export const makeRequest = (url) => {
    return axios.get(url).then((response) => {
        try {
            return JSON.parse(response.request.response);
        } catch {
            throw new  Error('Invalid response')
        }
    })

};
