import { stringify, request, apiUrlfun } from '../config';


// 获取帐户列表
export async function getBankAccountList(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/getBanks')}`, 'get', data);
}

// 帐户保存
export async function saveBankAccount(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/saveBanks')}`, 'get', data);
}

// 按银行帐户查询明细
export async function getBankByAccount(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/getBankByAccount')}`, 'get', data);
}

// 获取开户行列表
export async function getBankBranchList(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/getBankBranch')}`, 'get', data);
}

// 删除帐号
export async function delBankAccount(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/deleteBank')}`, 'get', data);
}


// 获取帐户明细通过主键

export async function getBankAccountByPK(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/getCompanyBank')}`, 'get', data);
}

// 提交
export async function submitBankAccount(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/submitCompanyBank')}`, 'get', data);
}

// 获取银行列表
export async function getBankTypeList(data) {
  return request(`${apiUrlfun('SEACompanyService/1.0/getBankType')}`, 'get', data);
}


