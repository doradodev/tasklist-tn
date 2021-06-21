import axios from 'axios';

export const fetchDataAxios = async (url, options) => {
  const response = await axios({
    url: url,
    method: options.method,
    headers: options.headers,
    data: JSON.stringify(options.data),
  });
  return await response.data;
};
