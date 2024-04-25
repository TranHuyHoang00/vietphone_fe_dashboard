import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Input,
    Spin, Pagination, Typography, Tag, Image
} from 'antd';
import { AiOutlineMenu } from "react-icons/ai";
import FormSelectPage from '@components/selects/form_select_page';
import DrawerFilter from './drawers/drawer_filter';
import { check_permission } from '@utils/check_permission';
import { data_products } from '@datas/data_after_check_permissions';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_selected: [],
            modal_detail: false,
            modal_create: false,
            modal_edit: false,
            drawer_filter: false,
            data_filter: {},

            data_before_checks: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_product(this.props.data_filter);
        this.props.get_list_brand({ page: 1, limit: 100, search: '' });
        this.props.get_list_tag({ page: 1, limit: 100, search: '' });
        this.props.get_list_category({ page: 1, limit: 100, search: '' });
        this.setState({ data_filter: this.props.data_filter });

        let data_before_checks = await check_permission(data_products, this.props.data_user_permissions, this.props.is_superuser);
        this.setState({
            data_before_checks: data_before_checks,
        });
    }
    open_modal = async (name, value, id) => {
        if (name === 'create') {
            this.setState({ modal_create: value });
            this.props.set_data_product({});
        }
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value, data_product: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_product(id);
            }
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modal_edit: value, data_product: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.props.get_product(id);
            }
        }
    }
    open_drawer = async (name, value) => {
        if (name === 'filter') {
            this.setState({ drawer_filter: value });
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_product(data_selected); }
        if (this.state.type_menu === 2) { await this.props.edit_list_product(data_selected, { is_active: false }); }
        if (this.state.type_menu === 3) { await this.props.edit_list_product(data_selected, { is_active: true }); }
        await this.props.get_list_product(this.state.data_filter);
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type === 'limit') { data_filter.limit = value; }
        if (type === 'page') { data_filter.page = value; }
        if (type === 'search') { data_filter.search = value; data_filter.page = 1; }
        if (type === 'product_brand') { data_filter.product_brand = value; data_filter.page = 1; }
        if (type === 'tag') { data_filter.tag = value; data_filter.page = 1; }
        if (type === 'is_active') { data_filter.is_active = value; data_filter.page = 1; }
        if (type === 'category') { data_filter.category = value; data_filter.page = 1; }
        if (type === 'has_page') { data_filter.has_page = value; data_filter.page = 1; }

        this.setState({ data_filter: data_filter })
        await this.props.get_list_product(data_filter);
        this.props.set_data_filter_product(data_filter);
    }
    onchange_search = (value) => {
        this.setState({
            data_filter: {
                ...this.state.data_filter,
                search: value,
            }
        })
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
                    <span className='hover:underline' onClick={() => this.props.history.push(`/admin/manager/product/edit/${item.id}`)}>
                        <Typography.Text className='text-[#0574b8] dark:text-white cursor-pointer'>{name}</Typography.Text>
                    </span>,
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
                title: 'Website', dataIndex: 'has_page', width: 70,
                render: (has_page) =>
                    <div className='flex items-center justify-start'>
                        {has_page ?
                            <Tag color='green'>Đã đăng</Tag>
                            :
                            <Tag color='red'>Chưa đăng</Tag>
                        }
                    </div>
            },
            {
                title: 'Status', dataIndex: 'is_active', width: 70, responsive: ['lg'],
                render: (is_active) =>
                    <div className='flex items-center justify-start'>
                        {is_active ?
                            <Tag color='green'>Mở</Tag>
                            :
                            <Tag color='red'>Khóa</Tag>
                        }
                    </div>
            },
        ];
        let data_before_checks = this.state.data_before_checks;
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        return (
            <>
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Space>
                                <Button disabled={!data_before_checks['product.view_product']}
                                    onClick={() => this.open_drawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlineMenu />
                                        Bộ lọc
                                    </Space>
                                </Button>
                            </Space>
                            <div><Input.Search value={this.state.data_filter.search}
                                onChange={(event) => this.onchange_search(event.target.value)}
                                onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Tên sản phẩm !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={this.props.data_filter.limit} onchange_page={this.onchange_page} />
                            </div>
                            <Divider>SẢN PHẨM</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_products} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={this.props.data_filter.page}
                                    showQuickJumper total={this.props.data_meta.total * this.props.data_meta.limit} pageSize={this.props.data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.drawer_filter && data_before_checks['product.view_product'] &&
                    <DrawerFilter drawer_filter={this.state.drawer_filter}
                        open_drawer={this.open_drawer} data_filter={this.state.data_filter}
                        onchange_page={this.onchange_page}
                        data_brands={this.props.data_brands} data_tags={this.props.data_tags}
                        data_categorys={this.props.data_categorys} />
                }
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_products: state.product.data_products,
        data_product: state.product.data_product,
        data_meta: state.product.data_meta,
        is_loading: state.product.is_loading,
        is_result: state.product.is_result,
        data_filter: state.product.data_filter,
        data_tags: state.tag.data_tags,
        data_brands: state.brand.data_brands,
        data_categorys: state.category.data_categorys,

        data_user_permissions: state.user.data_user_permissions,
        is_superuser: state.user.is_superuser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_product: (data_filter) => dispatch(actions.get_list_product_redux(data_filter)),
        get_product: (id) => dispatch(actions.get_product_redux(id)),
        edit_list_product: (id, data) => dispatch(actions.edit_list_product_redux(id, data)),
        delete_list_product: (id) => dispatch(actions.delete_list_product_redux(id)),
        set_data_product: (id) => dispatch(actions.set_data_product_redux(id)),
        set_data_filter_product: (data) => dispatch(actions.set_data_filter_product_redux(data)),
        get_list_brand: (data_filter) => dispatch(actions.get_list_brand_redux(data_filter)),
        get_list_tag: (data_filter) => dispatch(actions.get_list_tag_redux(data_filter)),
        get_list_category: (data_filter) => dispatch(actions.get_list_category_redux(data_filter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));