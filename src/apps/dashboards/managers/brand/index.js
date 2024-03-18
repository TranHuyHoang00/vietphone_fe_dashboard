import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, message, Input,
    Spin, Pagination, Typography, Image, Dropdown, Tag
} from 'antd';
import { AiOutlineMenu, AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import Display_line_number from '../../components/display_line_number';
import { get_list_brand, get_brand, delete_brand, edit_brand } from '../../../../services/brand_service';
import Modal_create from './modals/modal_create';
import Modal_detail from './modals/modal_detail';
import Modal_edit from './modals/modal_edit';
import Drawer_filter from './drawers/drawer_filter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
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
            data_brand: {},
            data_brands: [],
            metadata: {},
        }
    }
    async componentDidMount() {
        await this.get_list_brand(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_brand = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_brand(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_brands: data.data.data.brands,
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
    get_brand = async (id) => {
        this.handle_loading(true);
        try {
            let data = await get_brand(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_brand: data.data.data });
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
                this.setState({ modal_detail: value, data_brand: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_brand(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_brand: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_brand(id);
            }
        }
    }
    handle_funtion_menu = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data;
                if (this.state.type_menu == 1) { data = await delete_brand(id); }
                if (this.state.type_menu == 2) { data = await edit_brand(id, { is_active: false }); }
                if (this.state.type_menu == 3) { data = await edit_brand(id, { is_active: true }); }
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Thất bại khi xử lý dòng ID=${id}`);
                }
            }
            await this.get_list_brand(this.state.data_filter);
            this.setState({ data_selected: [] });
            message.success(`Thành công xử lý ${data_selected.length} dòng`);
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
        await this.get_list_brand(data_filter);
        this.setState({ data_filter: data_filter })
    }
    open_drawer = (name, value) => {
        if (name == 'filter') { this.setState({ drawer_filter: value }); }
    }
    on_search = async (value) => {
        let data_filter = this.state.data_filter;
        data_filter.search_query = value;
        data_filter.page = 1;
        await this.get_list_brand(data_filter);
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
                title: 'Slug', dataIndex: 'slug', responsive: ['md'],
            },
            {
                title: 'Icon', dataIndex: 'icon', responsive: ['lg'],
            },
            {
                title: 'Ảnh', dataIndex: 'image', responsive: ['md'], width: 120,
                render: (image) => <Image src={image} height={50} width={100} className='object-cover' />
            },
            {
                title: 'Status', dataIndex: 'is_active', width: 70,
                render: (is_active) =>
                    <div className='flex items-center justify-start'>
                        {is_active == true ?
                            <Tag color='green'>Mở</Tag>
                            :
                            <Tag color='red'>Khóa</Tag>
                        }
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
            { key: '3', label: 'Mở' },
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
                        <div className='flex items-center justify-between gap-[10px]'>
                            <div className='flex items-center gap-[5px]'>
                                <Button onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff]'>
                                    <Space className='text-white'>
                                        <AiOutlinePlus />
                                        Tạo mới
                                    </Space>
                                </Button>
                                <Button disabled onClick={() => { this.setState({ drawer_filter: true }) }} className='bg-white'>
                                    <Space>Lọc<AiOutlineMenu /></Space>
                                </Button>
                            </div>
                            <div><Input.Search onSearch={(value) => this.on_search(value)} placeholder="Tên thương hiệu !" /></div>
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
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}  >
                                            <div>
                                                {type_menu == 1 && <span>Xóa</span>}
                                                {type_menu == 2 && <span>Khóa</span>}
                                                {type_menu == 3 && <span>Mở</span>}
                                                <span> {data_selected && data_selected.length == 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>THƯƠNG HIỆU</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.state.data_brands} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination size={{ xs: 'small', xl: 'defaul', }} current={data_filter.page}
                                    showQuickJumper total={metadata.total * metadata.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                <Modal_create modal_create={this.state.modal_create}
                    open_modal={this.open_modal} get_list_brand={this.get_list_brand} />
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} data_brand={this.state.data_brand} />
                <Modal_edit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal} get_list_brand={this.get_list_brand}
                    data_brand={this.state.data_brand} data_filter={this.state.data_filter} />
                <Drawer_filter drawer_filter={this.state.drawer_filter}
                    open_drawer={this.open_drawer} />
            </>
        );
    }

}
export default withRouter(index);