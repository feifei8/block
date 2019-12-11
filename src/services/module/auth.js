import { stringify, request, apiUrlfun } from '../config';

// 友户通认证
export async function getPersonByToken(params) {
  return request(`${apiUrlfun('SEAPersonService/1.0/getPersonByToken')}`, 'get', params);
}
