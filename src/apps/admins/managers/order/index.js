import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Input,
    Spin, Pagination, Typography, Avatar,
} from 'antd';
import { AiFillEye, AiOutlineMenu } from "react-icons/ai";
import FormSelectPage from '@components/selects/form_select_page';
import { format_money } from '@utils/format_money';
import { text_line_1_3 } from '@components/displays/data_line_1_3';
import { format_day } from '@utils/format_day';
import ModalDetail from './modals/modal_detail';
import DrawerFilter from './drawers/drawer_filter';
import AvatarNone from '@assets/images/avatar_none.jpg';
import { check_permission } from '@utils/check_permission';
import { data_orders } from '@datas/data_after_check_permissions';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_selected: [],
            modal_detail: false,
            drawer_filter: false,
            data_filter: {
                page: 1,
                limit: 5,
                search: '',
                status: '',
                source: '',
            },
            data_before_checks: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_order(this.state.data_filter);
        let data_before_checks = await check_permission(data_orders, this.props.data_user_permissions, this.props.is_superuser);
        this.setState({
            data_before_checks: data_before_checks,
        });
    }
    open_modal = async (name, value, id) => {
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value, data_order: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_order(id);
            }
        }
    }
    open_drawer = async (name, value) => {
        if (name === 'filter') {
            this.setState({ drawer_filter: value });
        }
    }
    handle_funtion_menu = async () => {
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type === 'limit') { data_filter.limit = value; }
        if (type === 'page') { data_filter.page = value; }
        if (type === 'search') { data_filter.search = value; data_filter.page = 1; }
        if (type === 'status') { data_filter.status = value; data_filter.page = 1; }
        if (type === 'source') { data_filter.source = value; data_filter.page = 1; }
        this.setState({ data_filter: data_filter })
        await this.props.get_list_order(data_filter);
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
                        {text_line_1_3('Mã ĐH', item.code, 'font-medium')}
                        {text_line_1_3('Khấu trừ', format_money(item.total_discount), 'font-medium text-red-500')}
                        {text_line_1_3('Tổng tiền', format_money(item.total), 'font-medium text-red-500')}
                        {text_line_1_3('Nguồn', item.source)}
                        {text_line_1_3('Trạng thái', item.status,)}
                    </div>

            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!data_before_checks['order.view_order']} onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></button>
                    </Space >
                ),
            },

        ];
        let data_before_checks = this.state.data_before_checks;
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        let data_filter = this.state.data_filter;
        return (
            <>
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Space>
                                <Button disabled={!data_before_checks['order.view_order']}
                                    onClick={() => this.open_drawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlineMenu />
                                        Bộ lọc
                                    </Space>
                                </Button>
                            </Space>
                            <div><Input.Search onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Tên KH, SĐT, Mã ĐH !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={data_filter.limit} onchange_page={this.onchange_page} />
                            </div>
                            <Divider >ĐƠN HÀNG</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_orders} pagination={false}
                                    size="middle" bordered scroll={{ x: 600 }} />
                                <Pagination responsive current={data_filter.page}
                                    showQuickJumper total={this.props.data_meta.total * this.props.data_meta.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modal_detail && data_before_checks['order.view_order'] &&
                    <ModalDetail modal_detail={this.state.modal_detail}
                        open_modal={this.open_modal} />}
                {this.state.drawer_filter && data_before_checks['order.view_order'] &&
                    <DrawerFilter drawer_filter={this.state.drawer_filter}
                        open_drawer={this.open_drawer} data_filter={this.state.data_filter}
                        onchange_page={this.onchange_page} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_orders: state.order.data_orders,
        data_order: state.order.data_order,
        data_meta: state.order.data_meta,
        is_loading: state.order.is_loading,
        is_result: state.order.is_result,

        data_user_permissions: state.user.data_user_permissions,
        is_superuser: state.user.is_superuser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_order: (data_filter) => dispatch(actions.get_list_order_redux(data_filter)),
        get_order: (id) => dispatch(actions.get_order_redux(id)),
        edit_list_order: (id, data) => dispatch(actions.edit_list_order_redux(id, data)),
        delete_list_order: (id) => dispatch(actions.delete_list_order_redux(id)),
        set_data_order: (id) => dispatch(actions.set_data_order_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));