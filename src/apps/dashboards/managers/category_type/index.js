import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, message, Input,
    Spin, Pagination, Typography, Dropdown
} from 'antd';
import { AiOutlineMenu, AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import Display_line_number from '../../components/display_line_number';
import { get_list_category_type, get_category_type, delete_category_type } from '../../../../services/category_type_service';
import Modal_create from './modals/modal_create';
import Modal_detail from './modals/modal_detail';
import Modal_edit from './modals/modal_edit';
import Drawer_filter from './drawers/drawer_filter';
import { load_data_url } from '../../../../utils/load_data_url';
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
            data_category_type: {},
            data_category_types: [],
            metadata: {},
        }
    }
    async componentDidMount() {
        await this.load_data();
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            await this.load_data();
        }
    }
    load_data = async () => {
        let data_filter = load_data_url(this.state.data_filter, new URLSearchParams(this.props.location.search));
        await this.get_list_category_type(data_filter);
        this.setState({
            data_filter: data_filter
        })
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_category_type = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_category_type(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_category_types: data.data.data.categorie_types,
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
    get_category_type = async (id) => {
        this.handle_loading(true);
        try {
            let data = await get_category_type(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_category_type: data.data.data });
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
                this.setState({ modal_detail: value, data_category_type: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_category_type(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_category_type: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_category_type(id);
            }
        }
    }
    handle_funtion_menu = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data;
                if (this.state.type_menu == 1) { data = await delete_category_type(id); }
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Thất bại khi xử lý dòng ID=${id}`);
                }
            }
            await this.get_list_category_type(this.state.data_filter);
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
            this.props.history.push(`/admin/manager/category_type?page=${data_filter.page}&limit=${value}&search_query=${data_filter.search_query}`);
        }
        if (type == 'page') {
            this.props.history.push(`/admin/manager/category_type?page=${value}&limit=${data_filter.limit}&search_query=${data_filter.search_query}`);
        }
    }
    open_drawer = (name, value) => {
        if (name == 'filter') { this.setState({ drawer_filter: value }); }
    }
    on_search = async (value) => {
        let data_filter = this.state.data_filter;
        this.props.history.push(`/admin/manager/category_type?page=1&limit=${data_filter.limit}&search_query=${value}`);
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
                title: 'Mô tả', dataIndex: 'description', responsive: ['md'],
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
                                                <span> {data_selected && data_selected.length == 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>LOẠI DANH MỤC</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.state.data_category_types} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={data_filter.page}
                                    showQuickJumper total={metadata.total * metadata.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                <Modal_create modal_create={this.state.modal_create}
                    open_modal={this.open_modal} get_list_category_type={this.get_list_category_type} />
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} data_category_type={this.state.data_category_type} />
                <Modal_edit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal} get_list_category_type={this.get_list_category_type}
                    data_category_type={this.state.data_category_type} data_filter={this.state.data_filter} />
                <Drawer_filter drawer_filter={this.state.drawer_filter}
                    open_drawer={this.open_drawer} />
            </>
        );
    }

}
export default withRouter(index);