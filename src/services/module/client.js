import { stringify, request, apiUrlfun } from '../config';


// 获取客户列表
export async function getCustomerList(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/list')}`, 'get', data);
}

// 客商保存
export async function saveCutomer(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/save')}`, 'get', data);
}

// 搜索
export async function getCompanyByKeyword(data) {
  return request(`${apiUrlfun('YSMIntegrationService/1.0/getCompanyByKeyword')}`, 'get', data);
}

// 根据客户ID获取客户详细数据
export async function getCompanyDetailByID(data) {
  return request(`${apiUrlfun('YSMIntegrationService/1.0/getCompanyByID')}`, 'get', data);
}

// 根据PK_Company获取客户详细数据
export async function getCompanyDetailByPK(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/get')}`, 'get', data);
}

// 根据公司名称和信用代码校验是否已有该客户
export async function validateIsExistByCompany(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/check')}`, 'get', data);
}


