import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, message, Tooltip,
    Spin, Pagination, Typography, Dropdown, Input
} from 'antd';
import { AiOutlineMenu, AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import Display_line_number from '../../components/display_line_number';
import { get_list_location, get_location, delete_location } from '../../../../services/location_service';
import Modal_create from './modals/modal_create';
import Modal_detail from './modals/modal_detail';
import Modal_edit from './modals/modal_edit';
import Drawer_filter from './drawers/drawer_filter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            drawer_filter: false,
            type_menu: 1,
            data_selected: [],
            data_filter: {
                page: 1,
                limit: 5,
            },
            data_location: {},
            data_locations: [
                { id: 1, name: 'Banner header', created_at: '23/12/2023', updated_at: '26/12/2023' },
                { id: 2, name: 'Banner slider right', created_at: '23/12/2023', updated_at: '26/12/2023' },
                { id: 3, name: 'Banner slider left top', created_at: '23/12/2023', updated_at: '26/12/2023' },
                { id: 4, name: 'Banner slider left bottom', created_at: '23/12/2023', updated_at: '26/12/2023' },
            ],
        }
    }
    async componentDidMount() {
        await this.get_list_location(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_location = async () => {
        this.handle_loading(true);
        try {
            let data = await get_list_location();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_locations: data.data.data });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }
    }
    get_location = async (id) => {
        this.handle_loading(true);
        try {
            let data = { id: 1, name: 'Banner header', created_at: '23/12/2023', updated_at: '26/12/2023' };
            this.setState({ data_location: data })
            // let data = await get_location(id);
            // if (data && data.data && data.data.success == 1) {
            //     this.setState({ data_location: data.data.data });
            // } else {
            //     message.error("Lỗi");
            // }
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
                this.setState({ modal_detail: value, data_location: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_location(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_location: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_location(id);
            }
        }
    }
    handle_delete = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data = await delete_location(id);
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
        await this.get_list_location(data_filter);
        this.setState({ data_filter: data_filter })
    }
    open_drawer = (name, value) => {
        if (name = 'filter') {
            this.setState({ drawer_filter: value });
        }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Tên', dataIndex: 'name',
                render: (name) => <Typography.Text strong className='text-[#0574b8]'>{name}</Typography.Text>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Ngày tạo', dataIndex: 'created_at', width: 100, responsive: ['lg'],
                sorter: (a, b) => a.created_at.localeCompare(b.created_at),
            },
            {
                title: 'Ngày sửa', dataIndex: 'updated_at', width: 100, responsive: ['lg'],
                sorter: (a, b) => a.updated_at.localeCompare(b.updated_at),
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <Tooltip title="Xem">
                            <a onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></a>
                        </Tooltip>
                        <Tooltip title="Sửa">
                            <a onClick={() => this.open_modal('edit', true, item.id)}>
                                <AiFillEdit />
                            </a>
                        </Tooltip>
                    </Space >
                ),
            },
        ];
        const items = [
            { key: '1', label: 'Xóa' },
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
                <Spin size='large' spinning={this.state.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
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
                            <div><Input.Search placeholder="Nhập vào đây !" /></div>
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
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}>
                                            <div>
                                                {type_menu == 1 && <span>Xóa</span>}
                                                <span> {data_selected && data_selected.length == 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>VÍ TRÍ</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.state.data_locations} pagination={false}
                                    size="middle" bordered scroll={{ y: 260, }} />

                                <Pagination size={{ xs: 'small', xl: 'defaul', }}
                                    showQuickJumper defaultCurrent={data_filter.page} total={50} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                <Modal_create modal_create={this.state.modal_create}
                    open_modal={this.open_modal} get_list_location={this.get_list_location} />
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} data_location={this.state.data_location} />
                <Modal_edit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal} get_list_location={this.get_list_location}
                    data_location={this.state.data_location} />
                <Drawer_filter drawer_filter={this.state.drawer_filter}
                    open_drawer={this.open_drawer} />
            </>
        );
    }

}
export default withRouter(index);