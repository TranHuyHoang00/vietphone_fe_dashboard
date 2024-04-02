import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown, Avatar
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '../../components/selects/form_select_page';
import { format_money } from '../../../../utils/format_money';
import { text_line_1_3 } from '../../components/displays/data_line_1_3';

import ModalDetail from './modals/modal_detail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_menu: 1,
            data_selected: [],
            modal_detail: false,
            modal_create: false,
            modal_edit: false,
            data_filter: {
                page: 1,
                limit: 5,
                search_query: ''
            },
        }
    }
    async componentDidMount() {
        this.props.get_list_order(this.state.data_filter);
    }
    open_modal = async (name, value, id) => {
        if (name === 'create') {
            this.setState({ modal_create: value });
            this.props.set_data_order({});
        }
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value, data_order: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_order(id);
            }
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modal_edit: value, data_order: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.props.get_order(id);
            }
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_order(data_selected); }
        if (this.state.type_menu === 2) { await this.props.edit_list_order(data_selected, { is_active: false }); }
        if (this.state.type_menu === 3) { await this.props.edit_list_order(data_selected, { is_active: true }); }
        await this.props.get_list_order(this.state.data_filter);
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type === 'limit') { data_filter.limit = value; }
        if (type === 'page') { data_filter.page = value; }
        if (type === 'search') { data_filter.search_query = value; data_filter.page = 1; }
        this.setState({ data_filter: data_filter })
        await this.props.get_list_order(data_filter);
    }
    render() {
        const columns = [
            {
                title: 'Ngày tạo', dataIndex: 'created_at', width: 140, responsive: ['sm'],
                render: (created_at) => <Typography.Text strong className='text-[#0574b8]'>{created_at}</Typography.Text>,
                sorter: (a, b) => a.created_at - b.created_at,
            },
            {
                title: 'Thông tin KH', dataIndex: 'user',
                render: (user, item) =>
                    <div className='flex items-center justify-start'>
                        <Avatar size={60} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                        <div>
                            <Typography.Text strong className='text-[#0574b8]'>{user.full_name}</Typography.Text><br />
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
                        {text_line_1_3('Mã ĐH', item.code)}
                        {text_line_1_3('Mã ĐH', format_money(item.total))}
                        {text_line_1_3('Khấu trừ', format_money(item.total_discount))}

                    </div>

            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <span onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></span>
                        <span disabled >
                            <AiFillEdit />
                        </span>
                    </Space >
                ),
            },

        ];
        const items = [
            { key: '1', label: 'Xóa' },
            { key: '2', label: 'Khóa' },
            { key: '3', label: 'Mở' },
        ];
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        let data_filter = this.state.data_filter;
        let type_menu = this.state.type_menu;
        return (
            <>
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button disabled={true} onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff]'>
                                <Space className='text-white'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Tên, SĐT, Mã ĐH !" /></div>
                        </div>
                        <div className='bg-white p-[10px] rounded-[10px] shadow-sm border'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={data_filter.limit} onchange_page={this.onchange_page} />
                                <div>
                                    <Popconfirm disabled={true}
                                        title={`Thực hiện tác vụ với ${data_selected && data_selected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                        <Dropdown.Button disabled={true} menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}  >
                                            <div>
                                                {type_menu === 1 && <span>Xóa</span>}
                                                {type_menu === 2 && <span>Khóa</span>}
                                                {type_menu === 3 && <span>Mở</span>}
                                                <span> {data_selected && data_selected.length === 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>ĐƠN HÀNG</Divider>
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
                {/* <ModalCreate modal_create={this.state.modal_create}
                    open_modal={this.open_modal}
                    data_filter={this.state.data_filter} /> */}
                <ModalDetail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} />
                {/* <ModalEdit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal}
                    data_filter={this.state.data_filter} /> */}
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