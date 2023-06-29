import axios from 'axios';
import { useRouter } from 'next/navigation';

import Cookies from 'universal-cookie';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

instance.interceptors.request.use((config) => {
  console.log(config);
  if (config.url !== '/auth/token') {
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    config.headers.Authorization = 'Bearer ' + accessToken;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  // 401

  (error) => {
    const config = error.config;
    // console.log("config", config);
    if (error.response.status === 401 && !config.sent) {
      config.sent = true;
      if (
        config.url !== '/auth/token' &&
        config.url !== '/auth/login' &&
        config.url !== '/auth/logout'
      ) {
        const cookies = new Cookies();
        const refreshToken = cookies.get('refreshToken');
        instance.post('/auth/token', { refreshToken }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            const accessToken = res?.data?.token.accessToken;
            cookies.set('accessToken', accessToken);
            // cookie.set("refreshToken", res.data.refreshToken);
            config.headers.Authorization = 'Bearer ' + accessToken;
            return instance(config);
          } else {
            const router = useRouter();
            cookies.remove('accessToken');
            cookies.remove('refreshToken');
            // localStorage.removeItem('user_info');
            router.push('/login');
          }
        });
      } else if (config.url === '/auth/token' && config.url !== '/auth/login') {
        const cookies = new Cookies();
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        // localStorage.removeItem('user_info');
        // location.href = routes.protected.Login;
      }
    }
    return error.response;
  }
);

// instance.interceptors.request.use((config) => {
//   // console.log(config);
//   if (config.url !== 'auth/token') {
//     const cookies = new Cookies(config.headers.cookie);
//     cookies.get('accessToken');
//   }
//   return config;
// });

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     const config = error.config;
//     if (error.response.status === 401 && !config.sent) {
//       config.sent = true;
//       if (config.url !== 'auth/token') {
//         const cookies = new Cookies(config.headers.cookie);
//         const refreshToken = cookies.get('refreshToken');
//         instance
//           .post(
//             'auth/token',
//             {},
//             {
//               headers: {
//                 Authorization: refreshToken,
//               },
//             }
//           )
//           .then((res) => {
//             const accessToken = res.data.accessToken;
//             const cookies = new Cookies();
//             cookies.set('accessToken', accessToken, { path: '/' });
//             cookies.set('refreshToken', res.data.refreshToken, { path: '/' });
//             config.headers.Authorization = accessToken;
//             return instance(config);
//           });
//       } else if (config.url === 'auth/token') {
//         const cookies = new Cookies();
//         cookies.remove('accessToken', { path: '/' });
//         cookies.remove('refreshToken', { path: '/' });
//       }
//     }
//   }
// );

export default instance;
