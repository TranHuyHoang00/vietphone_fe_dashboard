import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Input,
    Spin, Pagination, Typography
} from 'antd';
import { AiFillEye } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalDetail from './modals/modalDetail';
import { handleCheckPermis } from '@utils/handleFuncPermission';
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
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListCustomer, dataUserPermis, isSuperUser } = this.props;
        await getListCustomer(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataCustomers, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
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
        const { Text } = Typography;
        const columns = [
            {
                title: 'Mã KH', dataIndex: 'code', width: 120, responsive: ['sm'],
                render: (code) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{code}</Typography.Text>,
                sorter: (a, b) => a.code - b.code,
            },
            {
                title: 'TÊN', dataIndex: 'user',
                render: (user) => <Typography.Text >{user?.full_name}</Typography.Text>,
                sorter: (a, b) => a?.user?.full_name.localeCompare(b?.user?.full_name),
            },
            {
                title: 'SĐT', dataIndex: 'user',
                render: (user) => <Typography.Text >{user?.phone}</Typography.Text>,
                sorter: (a, b) => a?.user?.phone.localeCompare(b?.user?.phone),
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataCheckPermis['account.view_customer']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                    </Space >
                ),
            },

        ];
        const { dataCheckPermis, listItemSelected, dataFilter, modalDetail } = this.state;
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
                {modalDetail && dataCheckPermis['account.view_customer'] &&
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

        dataUserPermis: state.user.dataUserPermis,
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