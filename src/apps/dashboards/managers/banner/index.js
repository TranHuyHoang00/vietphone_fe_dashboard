import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, message, Tooltip,
    Spin, Pagination, Typography, Dropdown, Input, Carousel, Image
} from 'antd';
import { AiOutlineMenu, AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import Display_line_number from '../../components/display_line_number';
import { get_list_banner, get_banner, delete_banner } from '../../../../services/banner_service';
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
            data_banner: {},
            data_banners: [
                {
                    id: 1, title: 'Quốc tế phụ nữ', location_id: { id: 1, name: 'Banner header' }, description: 'none', created_at: '23/12/2023', updated_at: '26/12/2023',
                    media: [
                        { id: 1, image: 'https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638449086704799381_F-H1_800x300.png' },
                        { id: 2, image: 'https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/2/29/638448424956202070_F-H1_800x300.png' },
                    ]
                },
                {
                    id: 2, title: 'Quốc tế phụ nữ', location_id: { id: 1, name: 'Banner slider right' }, description: 'none', created_at: '23/12/2023', updated_at: '26/12/2023',
                    media: [
                        { id: 1, image: 'https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638449086704799381_F-H1_800x300.png' },
                        { id: 2, image: 'https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/2/29/638448424956202070_F-H1_800x300.png' },
                    ]
                },
                {
                    id: 3, title: '30/4-1/5', location_id: { id: 1, name: 'Banner slider right' }, description: 'none', created_at: '23/12/2023', updated_at: '26/12/2023',
                    media: [
                        { id: 1, image: 'https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638449086704799381_F-H1_800x300.png' },
                        { id: 2, image: 'https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/2/29/638448424956202070_F-H1_800x300.png' },
                    ]
                },
            ],
        }
    }
    async componentDidMount() {
        await this.get_list_banner(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_banner = async () => {
        this.handle_loading(true);
        try {
            let data = await get_list_banner();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_banners: data.data.data });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }
    }
    get_banner = async (id) => {
        this.handle_loading(true);
        try {
            let data = { id: 1, name: 'Banner header', created_at: '23/12/2023', updated_at: '26/12/2023' };
            this.setState({ data_banner: data })
            // let data = await get_banner(id);
            // if (data && data.data && data.data.success == 1) {
            //     this.setState({ data_banner: data.data.data });
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
                this.setState({ modal_detail: value, data_banner: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_banner(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_banner: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_banner(id);
            }
        }
    }
    handle_delete = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data = await delete_banner(id);
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
        await this.get_list_banner(data_filter);
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
                title: 'Ảnh', dataIndex: 'media', width: 180,
                render: (media) => (
                    <>
                        {media.length !== 0 ?
                            <Carousel autoplay >
                                {media && media.map((item, index) => {
                                    return (
                                        <div key={item.id} className='flex items-center justify-center'>
                                            <Image width={160} height={80} className='object-cover rounded-[5px]' src={item.image} />
                                        </div>
                                    )
                                })}
                            </Carousel>
                            :
                            <span>None</span>
                        }

                    </>
                ),
            },
            {
                title: 'Tiêu đề', dataIndex: 'title',
                render: (title) => <Typography.Text strong className='text-[#0574b8]'>{title}</Typography.Text>,
                sorter: (a, b) => a.title.localeCompare(b.title),
            },
            {
                title: 'Vị trí', dataIndex: 'location_id',
                render: (location_id) => <Typography.Text>{location_id.name}</Typography.Text>,
                sorter: (a, b) => a.location_id.name.localeCompare(b.location_id.name),
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
                            <Divider>BĂNG RÔN</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.state.data_banners} pagination={false}
                                    size="middle" bordered scroll={{ y: 260, x: 600 }} />

                                <Pagination size={{ xs: 'small', xl: 'defaul', }}
                                    showQuickJumper defaultCurrent={data_filter.page} total={50} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {/* <Modal_create modal_create={this.state.modal_create}
                    open_modal={this.open_modal} get_list_banner={this.get_list_banner} />
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} data_banner={this.state.data_banner} />
                <Modal_edit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal} get_list_banner={this.get_list_banner}
                    data_banner={this.state.data_banner} /> */}
                <Drawer_filter drawer_filter={this.state.drawer_filter}
                    open_drawer={this.open_drawer} />
            </>
        );
    }

}
export default withRouter(index);