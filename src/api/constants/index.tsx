import axios from 'axios';
import Cookies from 'universal-cookie';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});
instance.interceptors.request.use((config) => {
  // console.log(config);
  if (config.url !== 'auth/token') {
    const cookies = new Cookies(config.headers.cookie);
    cookies.get('accessToken');
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    const config = error.config;
    if (error.response.status === 401 && !config.sent) {
      config.sent = true;
      if (config.url !== 'auth/token') {
        const cookies = new Cookies(config.headers.cookie);
        const refreshToken = cookies.get('refreshToken');
        instance
          .post(
            'auth/token',
            {},
            {
              headers: {
                Authorization: refreshToken,
              },
            }
          )
          .then((res) => {
            const accessToken = res.data.accessToken;
            const cookies = new Cookies();
            cookies.set('accessToken', accessToken, { path: '/' });
            cookies.set('refreshToken', res.data.refreshToken, { path: '/' });
            config.headers.Authorization = accessToken;
            return instance(config);
          });
      } else if (config.url === 'auth/token') {
        const cookies = new Cookies();
        cookies.remove('accessToken', { path: '/' });
        cookies.remove('refreshToken', { path: '/' });
      }
    }
  }
);

export default instance;

