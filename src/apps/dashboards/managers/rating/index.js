import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, message,
    Spin, Pagination, Typography, Tag, Image, Rate, Dropdown, Input
} from 'antd';
import { AiOutlineMenu } from "react-icons/ai";
import Display_line_number from '../../components/display_line_number';
import { get_list_rating, get_rating, delete_rating } from '../../../../services/rating_service';
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
            data_rating: {},
            data_ratings: [
                {
                    id: 1,
                    user_id: {
                        full_name: 'Hoàng Thị Hương',
                        phone: '0912345678',
                    },
                    product_id: {
                        name: 'Iphone 15 pro max',
                        image: 'https://vietphone.vn/images/stories/virtuemart/product/resized/samsung-m33-5g-xanh-duong-1-copy_400x400.jpg',
                    },
                    content: 'Tỉnh lại đi cô gái à. Đừng mãi ôm khư khư cái chấp niệm về cậu ta nữa. Cậu ta đã không còn là của cậu nữa rồi nên đừng chìm đắng vào giấc mơ hoang tưởng của bản thân.',
                    score: 5,
                    activate: false,
                    created_at: '30/11/2023',
                },
                {
                    id: 2,
                    user_id: {
                        full_name: 'Nguyễn Thị Lan',
                        phone: '0987654321',
                    },
                    product_id: {
                        name: 'Iphone 14 pro max',
                        image: 'https://vietphone.vn/images/stories/virtuemart/product/resized/samsung-m33-5g-xanh-duong-1-copy_400x400.jpg',
                    },
                    content: 'Hai năm trôi qua bài này vẫn hay như vậy.',
                    score: 4,
                    activate: true,
                    created_at: '30/11/2023',
                },
            ],
        }
    }
    async componentDidMount() {
        await this.get_list_rating(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_rating = async () => {
        this.handle_loading(true);
        try {
            let data = await get_list_rating();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_ratings: data.data.data });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }
    }
    get_rating = async (id) => {
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
            this.setState({ data_rating: data })
            // let data = await get_rating(id);
            // if (data && data.data && data.data.success == 1) {
            //     this.setState({ data_rating: data.data.data });
            // } else {
            //     message.error("Lỗi");
            // }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }

    }
    handle_delete = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data = await delete_rating(id);
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
        await this.get_list_rating(data_filter);
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
                title: 'Thông tin đánh giá', dataIndex: 'user_id',
                render: (user_id, item) =>
                    <div className='flex justify-start gap-[10px]'>
                        <div className='min-w-0 flex-shrink-0'>
                            <Image width={60} height={60} className='border rounded-full' src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                        </div>
                        <div className='space-y-[10px] flex-grow'>
                            <div className='flex justify-start gap-[10px]'>
                                <Typography.Text strong className='text-[#0574b8]'>{user_id.full_name}</Typography.Text><br />
                                <Typography.Text italic strong>{user_id.phone}</Typography.Text><br />
                                <div>
                                    <Tag color="blue">Khách hàng</Tag>
                                </div>
                            </div>
                            <div className='border shadow-sm flex p-[8px]'>
                                <div className='min-w-0 flex-shrink-0'>
                                    <Image width={100} height={100} src={item.product_id && item.product_id.image} />
                                </div>
                                <div className='flex-grow'>
                                    <div className='flex items-center justify-between'>
                                        <Typography.Text className='text-[#0574b8]' strong italic>{item.product_id && item.product_id.name}</Typography.Text>
                                        <div className='flex items-center'>
                                            <Tag color="geekblue">{item.created_at}</Tag>
                                            {item.activate == true ?
                                                <Tag color="red">Chưa duyệt</Tag>
                                                :
                                                <Tag color="green">Đã duyệt</Tag>
                                            }
                                        </div>
                                    </div>
                                    <div><Rate className='text-[14px]' disabled defaultValue={item.score} /></div>
                                    <div class="break-word">
                                        <Typography.Text italic>{item.content}</Typography.Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            },
        ];
        const items = [
            { key: '1', label: 'Xóa' },
            { key: '2', label: 'Duyệt' },
            { key: '3', label: 'Hủy duyệt' },
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
                            <Button onClick={() => { this.setState({ drawer_filter: true }) }} className='bg-white'>
                                <Space>Lọc<AiOutlineMenu /></Space>
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
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}>
                                            <div>
                                                {type_menu == 1 && <span>Xóa</span>}
                                                {type_menu == 2 && <span>Duyệt</span>}
                                                {type_menu == 3 && <span>Hủy duyệt</span>}
                                                <span> {data_selected && data_selected.length == 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>ĐÁNH GIÁ</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.state.data_ratings} pagination={false}
                                    size="middle" bordered scroll={{ y: 260, x: 800 }} />

                                <Pagination responsive
                                    showQuickJumper defaultCurrent={data_filter.page} total={50} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                <Drawer_filter drawer_filter={this.state.drawer_filter}
                    open_drawer={this.open_drawer} />
            </>
        );
    }

}
export default withRouter(index);