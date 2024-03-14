import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, Tooltip, message, Input,
    Spin, Pagination, Typography, Image, Dropdown, Tag
} from 'antd'; import { AiFillEdit, AiFillDelete, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import Display_line_number from '../../components/display_line_number';
import { get_list_brand, get_brand, delete_brand } from '../../../../services/brand_service';
import Modal_create from './modals/modal_create';
import Modal_detail from './modals/modal_detail';
import Modal_edit from './modals/modal_edit';

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
            },
            data_brand: {},
            data_brands: [
                { id: 3, name: 'SAMSUNG', image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', slug: '/samsung', description: 'none', created_at: '23/12/2023', updated_at: '26/12/2023' },
                { id: 2, name: 'IPHONE', image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', slug: '/iphone', description: 'none', created_at: '24/12/2023', updated_at: '27/12/2023' },
                { id: 1, name: 'OPPO', image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', slug: '/oppo', description: 'none', created_at: '25/12/2023', updated_at: '28/12/2023' },
            ],
        }
    }
    async componentDidMount() {
        await this.get_list_brand(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_brand = async () => {
        this.handle_loading(true);
        try {
            let data = await get_list_brand();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_brands: data.data.data });
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
            let data = { id: 1, name: 'OPPO', image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', slug: '/oppo', description: 'none', created_at: '25/12/2023', updated_at: '28/12/2023' };
            this.setState({ data_brand: data })
            // let data = await get_brand(id);
            // if (data && data.data && data.data.success == 1) {
            //     this.setState({ data_brand: data.data.data });
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
    handle_delete = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data = await delete_brand(id);
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
        await this.get_list_brand(data_filter);
        this.setState({ data_filter: data_filter })
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
                title: 'Logo', dataIndex: 'image',
                render: (image) =>
                    <>
                        {image == null ?
                            <span></span>
                            :
                            <Image src={image} width={30} />
                        }
                    </>,
            },
            {
                title: 'Slug', dataIndex: 'slug', responsive: ['md'],
                sorter: (a, b) => a.description.localeCompare(b.description),
            },
            {
                title: 'Mô tả', dataIndex: 'description', responsive: ['md'],
                sorter: (a, b) => a.description.localeCompare(b.description),
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
                            <Button onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff]'>
                                <Space className='text-white'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
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
                                    size="middle" bordered scroll={{ y: 250 }} />

                                <Pagination size={{ xs: 'small', xl: 'defaul', }}
                                    showQuickJumper defaultCurrent={data_filter.page} total={50} pageSize={data_filter.limit}
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
                    data_brand={this.state.data_brand} />
            </>
        );
    }

}
export default withRouter(index);