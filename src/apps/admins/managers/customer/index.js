import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Input,
    Spin, Pagination, Typography, Avatar
} from 'antd';
import { AiFillEye } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalDetail from './modals/modalDetail';
import AvatarNone from '@assets/images/avatar_none.jpg';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { data_customers } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItemSelected: [],
            modalDetail: false,
            dataFilter: {
                page: 1,
                limit: 5,
                search: ''
            },
            dataPermissionsAfterCheck: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_customer(this.state.dataFilter);
        let dataPermissionsAfterCheck = await handleCheckPermission(data_customers, this.props.dataUserPermissions, this.props.isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (name, value, id) => {
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modalDetail: value, data_customer: {} });
            } else {
                this.setState({ modalDetail: value });
                await this.props.get_customer(id);
            }
        }
    }
    funcDropButtonHeaderOfTable = async () => {
    }
    onChangePage = async (value, type) => {
        let dataFilter = this.state.dataFilter;
        if (type === 'limit') { dataFilter.limit = value; }
        if (type === 'page') { dataFilter.page = value; }
        if (type === 'search') { dataFilter.search = value; dataFilter.page = 1; }
        this.setState({ dataFilter: dataFilter })
        await this.props.get_list_customer(dataFilter);
    }
    render() {
        const columns = [
            {
                title: 'Mã KH', dataIndex: 'code', width: 120, responsive: ['sm'],
                render: (code) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{code}</Typography.Text>,
                sorter: (a, b) => a.code - b.code,
            },
            {
                title: 'Thông tin', dataIndex: 'user',
                render: (user, item) =>
                    <div className='flex items-center justify-start gap-x-[5px]'>
                        <Avatar size={60} src={AvatarNone} />
                        <div>
                            <Typography.Text strong className='text-[#0574b8] dark:text-white'>{user.full_name}</Typography.Text><br />
                            <Typography.Text italic strong>{user.phone}</Typography.Text><br />
                            {item.email === '' || item.email === null ?
                                <Typography.Text italic>none@gmail.com</Typography.Text>
                                :
                                <Typography.Text italic>{item.email}</Typography.Text>
                            }
                        </div>
                    </div>
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataPermissionsAfterCheck['account.view_customer']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                    </Space >
                ),
            },

        ];
        const listItemSelected = this.state.listItemSelected;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        let dataFilter = this.state.dataFilter;
        let dataPermissionsAfterCheck = this.state.dataPermissionsAfterCheck;
        return (
            <>
                <Spin size='large' spinning={this.props.isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <div>
                            </div>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên, Mã KH, SĐT !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-sm bcustomer'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                            </div>
                            <Divider>KHÁCH HÀNG</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_customers} pagination={false}
                                    size="middle" bcustomered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={this.props.dataMeta.total * this.props.dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modalDetail && dataPermissionsAfterCheck['account.view_customer'] &&
                    <ModalDetail modalDetail={this.state.modalDetail}
                        openModal={this.openModal} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_customers: state.customer.data_customers,
        data_customer: state.customer.data_customer,
        dataMeta: state.customer.dataMeta,
        isLoading: state.customer.isLoading,
        isResult: state.customer.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_customer: (dataFilter) => dispatch(actions.get_list_customer_redux(dataFilter)),
        get_customer: (id) => dispatch(actions.get_customer_redux(id)),
        edit_list_customer: (id, data) => dispatch(actions.edit_list_customer_redux(id, data)),
        delete_list_customer: (id) => dispatch(actions.delete_list_customer_redux(id)),
        set_data_customer: (id) => dispatch(actions.set_data_customer_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));