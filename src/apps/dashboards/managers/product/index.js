import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, message, Input,
    Spin, Pagination, Typography, Dropdown, Tag, Image
} from 'antd';
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import Display_line_number from '../../components/display_line_number';
import { get_list_product, delete_product, edit_product } from '../../../../services/product_service';
import Drawer_filter from './drawers/drawer_filter';
import { load_data_url } from '../../../../utils/load_data_url';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            type_menu: 1,
            data_selected: [],
            data_filter: {
                page: '',
                limit: '',
                search_query: ''
            },
            data_product: {},
            data_products: [],
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
        await this.get_list_product(data_filter);
        this.setState({
            data_filter: data_filter
        })
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_product = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_product(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_products: data.data.data.products,
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

    handle_funtion_menu = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data;
                if (this.state.type_menu == 1) { data = await delete_product(id); }
                if (this.state.type_menu == 2) { data = await edit_product(id, { is_active: false }); }
                if (this.state.type_menu == 3) { data = await edit_product(id, { is_active: true }); }
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Thất bại khi xử lý dòng ID=${id}`);
                }
            }
            await this.load_data(this.state.data_filter);
            if (this.state.type_menu == 1) { this.setState({ data_selected: [] }); }
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
            this.props.history.push(`/admin/manager/product?page=${data_filter.page}&limit=${value}&search_query=${data_filter.search_query}`);
        }
        if (type == 'page') {
            this.props.history.push(`/admin/manager/product?page=${value}&limit=${data_filter.limit}&search_query=${data_filter.search_query}`);
        }
    }
    open_drawer = (name, value) => {
        if (name == 'filter') { this.setState({ drawer_filter: value }); }
    }
    on_search = async (value) => {
        let data_filter = this.state.data_filter;
        this.props.history.push(`/admin/manager/product?page=1&limit=${data_filter.limit}&search_query=${value}`);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Ảnh', dataIndex: 'media', width: 90, responsive: ['sm'],
                render: (media) =>
                    <>
                        {(media && media.length !== 0) &&
                            <Image width={80} height={80} src={media[0].image} className='object-cover' />
                        }

                    </>
            },
            {
                title: 'Tên sản phẩm', dataIndex: 'name',
                render: (name, item) =>
                    <a className='hover:underline' onClick={() => this.props.history.push(`/admin/manager/product/edit/${item.id}`)}>
                        <Typography.Text className='text-[#0574b8]'>{name}</Typography.Text>
                    </a>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Thương hiệu', dataIndex: 'product_brand', responsive: ['lg'],
                render: (product_brand) =>
                    <>
                        {(product_brand && product_brand.name) ?
                            <Tag key={index} color='green'>{product_brand && product_brand.name}</Tag>
                            :
                            <span   ></span>
                        }
                    </>
            },
            {
                title: 'Tag', dataIndex: 'tags', responsive: ['lg'],
                render: (tags) =>
                    <div className='space-y-[5px]'>
                        {tags && tags.map((item, index) => {
                            return (
                                <Tag key={index} color='orange'>{item.name}</Tag>
                            )
                        })}
                    </div>,
            },
            {
                title: 'Danh mục', dataIndex: 'categories', responsive: ['lg'],
                render: (categories) =>
                    <div className='space-y-[5px]'>
                        {categories && categories.map((item, index) => {
                            return (
                                <Tag key={index} color='blue'>{item.name}</Tag>
                            )
                        })}
                    </div>,
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
                                <Button disabled className='bg-[#0e97ff]'>
                                    <Space className='text-white'>
                                        <AiOutlinePlus />
                                        Tạo mới
                                    </Space>
                                </Button>
                                <Button disabled onClick={() => { this.setState({ drawer_filter: true }) }} className='bg-white'>
                                    <Space>Lọc<AiOutlineMenu /></Space>
                                </Button>
                            </div>
                            <div><Input.Search onSearch={(value) => this.on_search(value)} placeholder="Tên sản phẩm !" /></div>
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
                            <Divider>DANH SÁCH SẢN PHẨM</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.state.data_products} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={data_filter.page}
                                    showQuickJumper total={metadata.total * metadata.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {/* <Drawer_filter drawer_filter={this.state.drawer_filter}
                    open_drawer={this.open_drawer} /> */}
            </>
        );
    }

}
export default withRouter(index);