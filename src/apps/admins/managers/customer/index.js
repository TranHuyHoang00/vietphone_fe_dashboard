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
import AvatarNone from '@assets/images/avatarNone.jpg';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { dataCustomers } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
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
        const { dataFilter } = this.state;
        const { getListCustomer, dataUserPermissions, isSuperUser } = this.props;
        await getListCustomer(dataFilter);
        const dataPermissionsAfterCheck = await handleCheckPermission(dataCustomers, dataUserPermissions, isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataCustomer, getDataCustomer } = this.props;
        const actions = {
            setData: setDataCustomer,
            getData: getDataCustomer,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListCustomer, editListCustomer, getListCustomer } = this.props;
        const actions = {
            deleteList: deleteListCustomer,
            editList: editListCustomer,
            getList: getListCustomer
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListCustomer } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListCustomer(newDataFilter);
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
                            {item?.email ?
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
        const { dataPermissionsAfterCheck, listItemSelected, dataFilter, modalDetail } = this.state;
        const { isLoading, dataCustomers, dataMeta } = this.props;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (
            <>
                <Spin size='large' spinning={isLoading}>
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
                                    columns={columns} dataSource={dataCustomers} pagination={false}
                                    size="middle" bcustomered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalDetail && dataPermissionsAfterCheck['account.view_customer'] &&
                    <ModalDetail modalDetail={modalDetail}
                        openModal={this.openModal} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataCustomers: state.customer.dataCustomers,
        dataCustomer: state.customer.dataCustomer,
        dataMeta: state.customer.dataMeta,
        isLoading: state.customer.isLoading,
        isResult: state.customer.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListCustomer: (dataFilter) => dispatch(actions.getListCustomerRedux(dataFilter)),
        getDataCustomer: (id) => dispatch(actions.getDataCustomerRedux(id)),
        editListCustomer: (id, data) => dispatch(actions.editListCustomerRedux(id, data)),
        deleteListCustomer: (id) => dispatch(actions.deleteListCustomerRedux(id)),
        setDataCustomer: (id) => dispatch(actions.setDataCustomerRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));