import { saveCutomer, getCustomerList, getCompanyByKeyword, getCompanyDetailByID, getCompanyDetailByPK, validateIsExistByCompany } from '../../services';
import { Toast } from 'antd-mobile'


export default {
    namespace: 'client',
    state: {
        data: "",
        customerList: [],
        searchList: [],
        companyDetail: "",
        isSave: false,
        isExist: false,
        pk_company: "",
        compName: ""
    },
    effects: {
        // 保存客商数据
        *SaveCustomer({ payload }, { call, put }) {
            const response = yield call(saveCutomer, payload);
            const { request, message, result } = response.data;
            if (result === 'success' && JSON.parse(message).Status !== '0') {
                Toast.fail(JSON.parse(message).Description);
            } else {
                let data = JSON.parse(message)
                yield put({
                    type: 'saveCustomerData',
                    payload: {
                        isSave: true,
                        pk_company: data.pk_company,
                        compName: data.compName
                    },
                });
            }
        },
        // 获取个人客户列表
        *GetCustomerList({ payload }, { call, put }) {
            const response = yield call(getCustomerList, payload);
            const { request, message, result } = response.data;
            if (result !== 'success') {
                Toast.fail('接口错误');
            } else {
                if (result === 'success' && JSON.parse(message).Status !== '0') {
                    Toast.fail('接口错误');
                } else {
                    let customerList = JSON.parse(message).Body.Company
                    if (!Array.isArray(customerList)) {
                        let temp = []
                        if (customerList) {
                            temp.push(customerList)
                        }
                        customerList = [...temp]
                    }
                    yield put({
                        type: 'GetCustomerListData',
                        payload: {
                            customerList: customerList,
                        },
                    });
                }
            }
        },
        // 根据关键字查询客户列表
        *GetCompanyByKeyword({ payload }, { call, put }) {
            const response = yield call(getCompanyByKeyword, payload);
            const { request, message, result } = response.data;
            if (result !== 'success') {
                Toast.fail('接口错误');
            } else {
                if (result === 'success' && JSON.parse(message).Status !== '0') {
                    Toast.fail('接口错误');
                } else {
                    let searchList = JSON.parse(message).Body.CompanyList ? JSON.parse(message).Body.CompanyList : []
                    if (!Array.isArray(searchList)) {
                        let temp = []
                        temp.push(searchList)
                        searchList = [...temp]
                    }

                    yield put({
                        type: 'GetCompanyByKeywordData',
                        payload: {
                            searchList: searchList,
                        },
                    });
                }
            }
        },
        // 根据客户ID查询客户明细数据
        *GetCompanyDetailByID({ payload }, { call, put }) {
            const response = yield call(getCompanyDetailByID, payload);
            const { request, message, result } = response.data;
            if (result === 'success' && JSON.parse(message).Status !== '0') {
                Toast.fail('接口错误');
            } else {
                yield put({
                    type: 'GetCompanyDetailByIDData',
                    payload: {
                        companyDetail: JSON.parse(message).Body.CompanyList,
                    },
                });
            }
        },
        // 根据客户pk查询客户明细数据
        *GetCompanyDetailByPK({ payload }, { call, put }) {
            const response = yield call(getCompanyDetailByPK, payload);
            const { request, message, result } = response.data;
            if (result === 'success' && JSON.parse(message).Status !== '0') {
                Toast.fail('接口错误');
            } else {
                yield put({
                    type: 'GetCompanyDetailByPKData',
                    payload: {
                        companyDetail: JSON.parse(message).Body.Company,
                    },
                });
            }
        },
        // 根据客户名称和信用代码查询是否存在该客户
        *ValidateIsExistByCompany({ payload }, { call, put }) {
            const response = yield call(validateIsExistByCompany, payload);
            const { request, message, result } = response.data;
            if (result !== 'success') {
                Toast.fail('接口错误');
            } else {
                let isExist = false
                if (result === 'success' && JSON.parse(message).Status === '0') {
                    isExist = false
                } else {
                    isExist = true
                }
                yield put({
                    type: 'ValidateIsExistByCompanyData',
                    payload: {
                        isExist: isExist,
                    },
                });
            }
        },

    },
    reducers: {
        saveCustomerData(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        GetCustomerListData(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        GetCompanyByKeywordData(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        GetCompanyDetailByIDData(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        GetCompanyDetailByPKData(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        ValidateIsExistByCompanyData(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
    },
};
