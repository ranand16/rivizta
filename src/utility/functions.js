import axios from 'axios';

export async function createApiCall(method, baseURL, headers, url, data = {}) {
    return await axios({
        method: method,
        baseURL: baseURL,
        headers: headers,
        url: url,
        data: data
      })
      .then(response => response)
      .catch(error => {throw error});
}