import React, { PureComponent } from 'react';
import { connect } from 'dva'
import { Table, Divider, Tag } from 'antd';


@connect(({ client, loading }) => ({
    client,
    firsstListLoading: loading.effects['client/GetCustomerList'],
}))

class CustomerList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            data: [],
            Keyword: "",
            PageSize: 10,
            PageIndex: 1,
            columns: [
                {
                    title: '客商名称',
                    dataIndex: 'compName',
                    key: 'compName'
                },
                {
                    title: '信用代码',
                    dataIndex: 'creditCode',
                    key: 'creditCode'
                }
            ],
            dataSource: [],
        };
    }
    componentDidMount() {
        this.getList();
    };
    // 获取数据
    getList = () => {
        const { dispatch} = this.props;
        dispatch({
            type: 'client/GetCustomerList',
            payload: {
                Keyword: this.state.Keyword,
                PSNCode: localStorage.getItem('psnCode'),
                PageIndex: this.state.PageIndex,
                PageSize: this.state.PageSize,
                Sort: "ts desc"
            }
        }).then(() => {
            const { client } = this.props;
            var list = this.state.data
            if (client.customerList) {
                client.customerList.forEach(element => {
                    list.push(element)
                });
            }
            this.setState({
                dataSource: list ? list : [],
                refreshing: false
            })
        })
    }

    render() {

        return (
            <div >
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default CustomerList;
