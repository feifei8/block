
import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
import router from 'umi/router';
import hash from 'hash.js';
import md5 from 'js-md5';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function parseJSON(response) {
  return  response.json();
}
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  Toast.offline(`请求错误 ${response.status}: ${response.url},${errortext}`);
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};
const parseQuery = obj => {
  let str = '';
  for (const key in obj) {
    const value = typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key];
    str += `&${key}=${encodeURIComponent(value)}`;
  }
  return str.substr(1);
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};
/*
itAPI平台调用生成oauth
*/
const appKey = 'UQXJB';
const accessToken = '0b9f30ed-125d-4bd8-94c9-117729039bb0';
let strTime = new Date().getTime();
strTime = strTime.toString().substring(0, 10);
const oauthString = appKey + strTime + accessToken;
const oauth = md5(oauthString);

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, method = 'get', data) {
  const options = {
    method, // HTTP请求方法，默认为GET
    headers: {
      // HTTP的请求头，默认为{}
      'Content-Type': 'application/json',
    },
    credentials: 'omit', // 是否携带cookie，默认为omit,不携带; same-origi,同源携带; include,同源跨域都携带
  };

  if (method === 'get') {
    url += `?resultType=json` + `&appKey=` + appKey + `&oauth=` + oauth + `&timestamp=` + strTime + `&${parseQuery(data)}`;
    console.log(url);
  } else {
    data['resultType'] = "json"
    data['oauth'] = oauth
    data['appKey'] = appKey
    data['timestamp'] = strTime
    options.body = JSON.stringify(data);
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => ({ data }))
    .catch(e => {
      const status = e.name;
      //   if (status === 401) {
      //     // @HACK
      //     /* eslint-disable no-underscore-dangle */
      //     window.g_app._store.dispatch({
      //       type: 'login/logout',
      //     });
      //     return;
      //   }
      // environment should not be used
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/404');
      }
    });
}
