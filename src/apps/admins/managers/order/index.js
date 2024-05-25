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
import { format_money } from '@utils/format_money';
import { textLine13 } from '@components/displays/line13';
import { format_day } from '@utils/format_day';
import ModalDetail from './modals/modalDetail';
import DrawerFilter from './drawers/drawer_filter';
import AvatarNone from '@assets/images/avatarNone.jpg';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { data_orders } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItemSelected: [],
            modalDetail: false,
            drawer_filter: false,
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
        this.props.get_list_order(this.state.dataFilter);
        let dataPermissionsAfterCheck = await handleCheckPermission(data_orders, this.props.dataUserPermissions, this.props.isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (name, value, id) => {
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modalDetail: value, data_order: {} });
            } else {
                this.setState({ modalDetail: value });
                await this.props.get_order(id);
            }
        }
    }
    open_drawer = async (name, value) => {
        if (name === 'filter') {
            this.setState({ drawer_filter: value });
        }
    }
    funcDropButtonHeaderOfTable = async () => {
    }
    onChangePage = async (value, type) => {
        let dataFilter = this.state.dataFilter;
        if (type === 'limit') { dataFilter.limit = value; }
        if (type === 'page') { dataFilter.page = value; }
        if (type === 'search') { dataFilter.search = value; dataFilter.page = 1; }
        if (type === 'status') { dataFilter.status = value; dataFilter.page = 1; }
        if (type === 'source') { dataFilter.source = value; dataFilter.page = 1; }
        this.setState({ dataFilter: dataFilter })
        await this.props.get_list_order(dataFilter);
    }
    render() {
        const columns = [
            {
                title: 'Ngày tạo', dataIndex: 'created_at', width: 140, responsive: ['sm'],
                render: (created_at) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{format_day(created_at)}</Typography.Text>,
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
                            {item.email === '' || item.email === null ?
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
                        {textLine13('Khấu trừ', format_money(item.total_discount), 'font-medium text-red-500')}
                        {textLine13('Tổng tiền', format_money(item.total), 'font-medium text-red-500')}
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
        let dataPermissionsAfterCheck = this.state.dataPermissionsAfterCheck;
        const listItemSelected = this.state.listItemSelected;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        let dataFilter = this.state.dataFilter;
        return (
            <>
                <Spin size='large' spinning={this.props.isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Space>
                                <Button disabled={!dataPermissionsAfterCheck['order.view_order']}
                                    onClick={() => this.open_drawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
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
                                    columns={columns} dataSource={this.props.data_orders} pagination={false}
                                    size="middle" bordered scroll={{ x: 600 }} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={this.props.dataMeta.total * this.props.dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modalDetail && dataPermissionsAfterCheck['order.view_order'] &&
                    <ModalDetail modalDetail={this.state.modalDetail}
                        openModal={this.openModal} />}
                {this.state.drawer_filter && dataPermissionsAfterCheck['order.view_order'] &&
                    <DrawerFilter drawer_filter={this.state.drawer_filter}
                        open_drawer={this.open_drawer} dataFilter={this.state.dataFilter}
                        onChangePage={this.onChangePage} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_orders: state.order.data_orders,
        data_order: state.order.data_order,
        dataMeta: state.order.dataMeta,
        isLoading: state.order.isLoading,
        isResult: state.order.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_order: (dataFilter) => dispatch(actions.get_list_order_redux(dataFilter)),
        get_order: (id) => dispatch(actions.get_order_redux(id)),
        edit_list_order: (id, data) => dispatch(actions.edit_list_order_redux(id, data)),
        delete_list_order: (id) => dispatch(actions.delete_list_order_redux(id)),
        set_data_order: (id) => dispatch(actions.set_data_order_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));