import axios from 'axios';

export const methods = ["GET", "POST", "PATCH", "DELETE"];

function formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? `/${path}` : path;
    return `/${adjustedPath}`;
}

export class Api {
    constructor() {
        methods.forEach(method => {
            this[method] = (path, {params, data, headers = {}} = {}) =>
                new Promise((resolve, reject) => {
                    const requestOptions = {
                        url: formatUrl(path),
                        method,
                        headers
                    };
                    if (params) {
                        requestOptions.params = params;
                    }
                    if (data) requestOptions.data = data;

                    axios.request({...requestOptions})
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                })
        })
    }
}