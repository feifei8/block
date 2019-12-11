import React, { PureComponent } from 'react';
import { connect } from 'dva'
import { Table, Divider, Tag } from 'antd';


@connect(({ test, loading }) => ({
    test,
    firsstListLoading: loading.effects['test/GetCustomerList'],
}))

class Index extends PureComponent {
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
        const { dispatch } = this.props;
        dispatch({
            type: 'test/GetCustomerList',
            payload: {
                Keyword: this.state.Keyword,
                PSNCode: '0000015508',
                PageIndex: this.state.PageIndex,
                PageSize: this.state.PageSize,
                Sort: "ts desc"
            }
        }).then(() => {
            const { test } = this.props;
            var list = this.state.data
            if (test.customerList) {
                test.customerList.forEach(element => {
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
            <div >1111
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default Index;
