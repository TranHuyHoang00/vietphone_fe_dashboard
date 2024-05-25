import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Input,
    Spin, Pagination, Typography, Avatar,
} from 'antd';
import { AiFillEye, AiOutlineMenu } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import { formatMoney, formatDay } from '@utils/handleFuncFormat';
import { textLine13 } from '@components/displays/line13';
import ModalDetail from './modals/modalDetail';
import DrawerFilter from './drawers/drawerFilter';
import AvatarNone from '@assets/images/avatarNone.jpg';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { dataOrders } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItemSelected: [],
            modalDetail: false,
            drawerFilter: false,
            dataFilter: {
                page: 1,
                limit: 5,
                search: '',
                status: '',
                source: '',
            },
            dataPermissionsAfterCheck: {},
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListOrder, dataUserPermissions, isSuperUser } = this.props;
        await getListOrder(dataFilter);
        const dataPermissionsAfterCheck = await handleCheckPermission(dataOrders, dataUserPermissions, isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataOrder, getDataOrder } = this.props;
        const actions = {
            setData: setDataOrder,
            getData: getDataOrder,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListOrder, editListOrder, getListOrder } = this.props;
        const actions = {
            deleteList: deleteListOrder,
            editList: editListOrder,
            getList: getListOrder
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListOrder } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListOrder(newDataFilter);
    }

    openDrawer = async (drawerName, drawerValue) => {
        switch (drawerName) {
            case 'filter':
                this.setState({ drawerFilter: drawerValue });
                break;
            default:
                return;
        }
    }
    render() {
        const columns = [
            {
                title: 'Ngày tạo', dataIndex: 'created_at', width: 140, responsive: ['sm'],
                render: (created_at) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{formatDay(created_at)}</Typography.Text>,
                sorter: (a, b) => a.created_at - b.created_at,
            },
            {
                title: 'Thông tin KH', dataIndex: 'user',
                render: (user, item) =>
                    <div className='flex items-center justify-start gap-x-[5px]'>
                        <Avatar size={60} src={AvatarNone} />
                        <div>
                            <Typography.Text strong className='text-[#0574b8] dark:text-white'>{user.full_name}</Typography.Text><br />
                            <Typography.Text italic strong>{user.phone}</Typography.Text><br />
                            {item.email ?
                                <Typography.Text italic>none@gmail.com</Typography.Text>
                                :
                                <Typography.Text italic>{item.email}</Typography.Text>
                            }
                        </div>
                    </div>
            },
            {
                title: 'Thông tin ĐH', dataIndex: 'id',
                render: (id, item) =>
                    <div >
                        {textLine13('Mã ĐH', item.code, 'font-medium')}
                        {textLine13('Khấu trừ', formatMoney(item.total_discount), 'font-medium text-red-500')}
                        {textLine13('Tổng tiền', formatMoney(item.total), 'font-medium text-red-500')}
                        {textLine13('Nguồn', item.source)}
                        {textLine13('Trạng thái', item.status,)}
                    </div>

            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataPermissionsAfterCheck['order.view_order']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                    </Space >
                ),
            },

        ];
        const { dataPermissionsAfterCheck, listItemSelected, dataFilter, modalDetail, drawerFilter } = this.state;
        const { isLoading, dataOrders, dataMeta } = this.props;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Space>
                                <Button disabled={!dataPermissionsAfterCheck['order.view_order']}
                                    onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlineMenu />
                                        Bộ lọc
                                    </Space>
                                </Button>
                            </Space>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên KH, SĐT, Mã ĐH !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                            </div>
                            <Divider >ĐƠN HÀNG</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataOrders} pagination={false}
                                    size="middle" bordered scroll={{ x: 600 }} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalDetail && dataPermissionsAfterCheck['order.view_order'] &&
                    <ModalDetail modalDetail={modalDetail}
                        openModal={this.openModal} />}
                {drawerFilter && dataPermissionsAfterCheck['order.view_order'] &&
                    <DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        onChangePage={this.onChangePage} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataOrders: state.order.dataOrders,
        dataOrder: state.order.dataOrder,
        dataMeta: state.order.dataMeta,
        isLoading: state.order.isLoading,
        isResult: state.order.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListOrder: (dataFilter) => dispatch(actions.getListOrderRedux(dataFilter)),
        getDataOrder: (id) => dispatch(actions.getDataOrderRedux(id)),
        editListOrder: (id, data) => dispatch(actions.editListOrderRedux(id, data)),
        deleteListOrder: (id) => dispatch(actions.deleteListOrderRedux(id)),
        setDataOrder: (id) => dispatch(actions.setDataOrderRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));