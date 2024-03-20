import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, Tooltip, message,
    Spin, Pagination, Avatar, Typography, Tag, Dropdown, Input
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus, AiOutlineMenu } from "react-icons/ai";
import { FaFemale, FaMale, FaLock, FaLockOpen } from "react-icons/fa";
import Display_line_number from '../../components/display_line_number';
import { get_list_staff, get_staff, delete_staff } from '../../../../services/staff_service';
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
            modal_detail: false,
            modal_create: false,
            modal_edit: false,
            data_filter: {
                page: 1,
                limit: 5,
            },
            data_staff: {},
            data_staffs: [
                {
                    id: 1,
                    full_name: 'Hoàng Thị Hương',
                    phone: '0912345678',
                    email: '',
                    activate: false,
                    gender: false,
                    registered_at: '',
                    created_at: '30/11/2023',
                    updated_at: '02/12/2023'
                },
                {
                    id: 2,
                    full_name: 'Nguyễn Thị Lan',
                    phone: '0987654321',
                    email: 'lan.nguyen@example.com',
                    activate: true,
                    gender: false,
                    registered_at: '',
                    created_at: '10/02/2023',
                    updated_at: '15/02/2023'
                },
                {
                    id: 3,
                    full_name: 'Lê Văn Đức',
                    phone: '0771234567',
                    email: 'van-duc.le@example.com',
                    activate: false,
                    gender: true,
                    registered_at: '',
                    created_at: '05/05/2023',
                    updated_at: '08/05/2023'
                },
                {
                    id: 4,
                    full_name: 'Phạm Thị Anh',
                    phone: '0965432198',
                    email: 'anh.pham@example.com',
                    activate: true,
                    gender: false,
                    registered_at: '',
                    created_at: '20/07/2023',
                    updated_at: '24/07/2023'
                },
                {
                    id: 5,
                    full_name: 'Trần Văn Nam',
                    phone: '0832109876',
                    email: 'van-nam.tran@example.com',
                    activate: true,
                    gender: true,
                    registered_at: '',
                    created_at: '14/09/2023',
                    updated_at: '18/09/2023'
                }
            ],
        }
    }
    async componentDidMount() {
        await this.get_list_staff(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_staff = async () => {
        this.handle_loading(true);
        try {
            let data = await get_list_staff();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_staffs: data.data.data });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }
    }
    get_staff = async (id) => {
        this.handle_loading(true);
        try {
            let data = {
                id: 1,
                full_name: 'Hoàng Thị Hương',
                phone: '0912345678',
                email: 'thh@gmail.com',
                activate: false,
                gender: false,
                registered_at: '',
                created_at: '30/11/2023',
                updated_at: '02/12/2023'
            };
            this.setState({ data_staff: data })
            // let data = await get_staff(id);
            // if (data && data.data && data.data.success == 1) {
            //     this.setState({ data_staff: data.data.data });
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
                this.setState({ modal_detail: value, data_staff: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_staff(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_staff: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_staff(id);
            }
        }
    }
    handle_delete = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data = await delete_staff(id);
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
        await this.get_list_staff(data_filter);
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
                title: 'Thông tin', dataIndex: 'full_name',
                render: (full_name, item) =>
                    <div className='flex items-center justify-start'>
                        <Avatar size={60} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                        <div>
                            <Typography.Text strong className='text-[#0574b8]'>{full_name}</Typography.Text><br />
                            <Typography.Text italic strong>{item.phone}</Typography.Text><br />
                            {item.email == '' || item.email == null ?
                                <Typography.Text italic>none@gmail.com</Typography.Text>
                                :
                                <Typography.Text italic>{item.email}</Typography.Text>
                            }
                        </div>
                    </div>
            },
            {
                title: 'Vai trò', dataIndex: 'id', width: 100,
                render: (id) =>
                    <div className='space-y-[5px]'>
                        <Tag color="blue">Nhân viên</Tag>
                    </div>,
            },
            {
                title: 'Status', dataIndex: 'activate', width: 80,
                render: (activate, item) =>
                    <div className='flex items-center justify-start'>
                        {item && item.gender == true ?
                            <FaMale className='text-[30px] text-[#016cb9]' />
                            :
                            <FaFemale className='text-[30px] text-[#e71e76]' />
                        }
                        {activate == true ?
                            <FaLock className='text-[20px] text-[#e94138]' />
                            :
                            <FaLockOpen className='text-[20px] text-[#36aa00]' />
                        }
                    </div>
            },
            {
                title: 'Người tạo', dataIndex: 'registered_at', width: 100, responsive: ['lg'],
                render: (registered_at) => <Avatar size={60} src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />,
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
                            <Divider>NHÂN VIÊN</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.state.data_staffs} pagination={false}
                                    size="middle" bordered scroll={{ y: 260, x: 600 }} />

                                <Pagination responsive
                                    showQuickJumper defaultCurrent={data_filter.page} total={50} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                <Modal_create modal_create={this.state.modal_create}
                    open_modal={this.open_modal} get_list_staff={this.get_list_staff} />
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} data_staff={this.state.data_staff} />
                <Modal_edit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal} get_list_staff={this.get_list_staff}
                    data_staff={this.state.data_staff} />
                <Drawer_filter drawer_filter={this.state.drawer_filter}
                    open_drawer={this.open_drawer} />
            </>
        );
    }

}
export default withRouter(index);