import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, Tooltip, message,
    Spin, Pagination, Avatar, Typography, Tag, Dropdown, Input
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";
import Display_line_number from '../../components/display_line_number';
import { get_list_order, get_order, delete_order } from '../../../../services/order_service';
import Modal_create from './modals/modal_create';
import Modal_detail from './modals/modal_detail';
import Modal_edit from './modals/modal_edit';
import Drawer_filter from './drawers/drawer_filter';
import { format_number } from '../../../../utils/format_number';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            drawer_filter: false,
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
            data_order: {},
            data_orders: [],
            metadata: {},
        }
    }
    async componentDidMount() {
        await this.get_list_order(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_order = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_order(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_orders: data.data.data.orders,
                    metadata: data.data.data.metadata,
                });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }
    }
    get_order = async (id) => {
        this.handle_loading(true);
        try {
            let data = await get_order(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_order: data.data.data });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }

    }
    open_modal = async (name, value, id) => {
        if (name == 'create') { this.setState({ modal_create: value }); }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_order: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_order(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_order: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_order(id);
            }
        }
    }
    handle_delete = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data = await delete_order(id);
                if (data && data.data && data.data.success == 1) {
                    message.success(`Thành công xóa dòng ID=${id}`);
                } else {
                    message.error(`Thất bại xóa dòng ID=${id}`);
                }
            }
            message.success(`Thành công xóa ${data_selected.length} dòng`)
        } catch (e) {
            message.error('Lỗi hệ thống');
        } finally {
            this.handle_loading(false);
        }
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type == 'limit') {
            data_filter.limit = value;
        }
        if (type == 'page') {
            data_filter.page = value;
        }
        await this.get_list_order(data_filter);
        this.setState({ data_filter: data_filter })
    }
    open_drawer = (name, value) => {
        if (name = 'filter') {
            this.setState({ drawer_filter: value });
        }
    }
    on_search = async (value) => {
        let data_filter = this.state.data_filter;
        data_filter.search_query = value;
        data_filter.page = 1;
        await this.get_list_order(data_filter);
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
                            {item.email == '' || item.email == null ?
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
                        <div className='flex gap-[5px] w-full'>
                            <div className='w-1/3'>
                                <Typography.Text className='text-gray-700'>Mã ĐH</Typography.Text>
                            </div>
                            <div className='w-2/3 flex items-center justify-between'>
                                <Typography.Text strong>: {item.code}</Typography.Text>
                                <Tag color="green">{item.status}</Tag>
                            </div>
                        </div>
                        <div className='flex gap-[5px] w-full'>
                            <div className='w-1/3'>
                                <Typography.Text className='text-gray-700'>Tổng tiền</Typography.Text>
                            </div>
                            <div className='w-2/3 '>
                                <Typography.Text strong className='text-[#0574b8]'>: {format_number(item.total)} vnđ</Typography.Text>
                            </div>
                        </div>
                        <div className='flex gap-[5px] w-full'>
                            <div className='w-1/3'>
                                <Typography.Text className='text-gray-700'>Khấu trừ</Typography.Text>
                            </div>
                            <div className='w-2/3'>
                                <Typography.Text strong className='text-red-600'>: {format_number(item.total_discount)} vnđ</Typography.Text>
                            </div>
                        </div>
                    </div>

            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <a onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></a>
                        <a onClick={() => this.open_modal('edit', true, item.id)}>
                            <AiFillEdit />
                        </a>
                    </Space >
                ),
            },

        ];
        const items = [
            { key: '1', label: 'Xóa' },
            { key: '2', label: 'Khóa' },
            { key: '3', label: 'Mở khóa' },
        ];
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        let data_filter = this.state.data_filter;
        let type_menu = this.state.type_menu;
        let metadata = this.state.metadata;
        return (
            <>
                <Spin size='large' spinning={this.state.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[5px]'>
                            <div className='flex items-center gap-[5px]'>
                                <Button onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff]'>
                                    <Space className='text-white'>
                                        <AiOutlinePlus />
                                        Tạo mới
                                    </Space>
                                </Button>
                                <Button onClick={() => { this.setState({ drawer_filter: true }) }} className='bg-white'>
                                    <Space>Lọc<AiOutlineMenu /></Space>
                                </Button>
                            </div>
                            <div><Input.Search onSearch={(value) => this.on_search(value)} placeholder="Tên, SĐT, Mã ĐH !" /></div>
                        </div>
                        <div className='bg-white p-[10px] rounded-[10px] shadow-sm border'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <Space>
                                    <span>Hiển thị</span>
                                    <Display_line_number limit={data_filter.limit} onchange_page={this.onchange_page} />
                                </Space>
                                <div>
                                    <Popconfirm disabled={(data_selected && data_selected.length == 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${data_selected && data_selected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_delete()}>
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}  >
                                            <div>
                                                {type_menu == 1 && <span>Xóa</span>}
                                                {type_menu == 2 && <span>Khóa</span>}
                                                {type_menu == 3 && <span>Mở khóa</span>}
                                                <span> {data_selected && data_selected.length == 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>ĐƠN HÀNG</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.state.data_orders} pagination={false}
                                    size="middle" bordered scroll={{ x: 700 }} />

                                <Pagination size={{ xs: 'small', xl: 'defaul', }} current={data_filter.page}
                                    showQuickJumper total={metadata.total * metadata.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {/* <Modal_create modal_create={this.state.modal_create}
                    open_modal={this.open_modal} get_list_order={this.get_list_order} /> */}
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} data_order={this.state.data_order} />
                {/* <Modal_edit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal} get_list_order={this.get_list_order}
                    data_order={this.state.data_order} /> */}
                <Drawer_filter drawer_filter={this.state.drawer_filter}
                    open_drawer={this.open_drawer} />
            </>
        );
    }

}
export default withRouter(index);