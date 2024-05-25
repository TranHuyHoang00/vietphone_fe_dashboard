import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Input,
    Spin, Pagination, Typography, Tag, Image
} from 'antd';
import { AiOutlineMenu } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import DrawerFilter from './drawers/drawer_filter';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { data_products } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItemSelected: [],
            modalDetail: false,
            modalCreate: false,
            modalEdit: false,
            drawer_filter: false,
            dataFilter: {},

            dataPermissionsAfterCheck: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_product(this.props.dataFilter);
        this.props.getListBrand({ page: 1, limit: 100, search: '' });
        this.props.getListTag({ page: 1, limit: 100, search: '' });
        this.props.getListCategory({ page: 1, limit: 100, search: '' });
        this.setState({ dataFilter: this.props.dataFilter });

        let dataPermissionsAfterCheck = await handleCheckPermission(data_products, this.props.dataUserPermissions, this.props.isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (name, value, id) => {
        if (name === 'create') {
            this.setState({ modalCreate: value });
            this.props.set_data_product({});
        }
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modalDetail: value, data_product: {} });
            } else {
                this.setState({ modalDetail: value });
                await this.props.get_product(id);
            }
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modalEdit: value, data_product: {} });
            } else {
                this.setState({ modalEdit: value });
                await this.props.get_product(id);
            }
        }
    }
    open_drawer = async (name, value) => {
        if (name === 'filter') {
            this.setState({ drawer_filter: value });
        }
    }
    funcDropButtonHeaderOfTable = async () => {
        let listItemSelected = this.state.listItemSelected;
        if (this.state.dropButtonType === 1) { await this.props.delete_list_product(listItemSelected); }
        if (this.state.dropButtonType === 2) { await this.props.edit_list_product(listItemSelected, { is_active: false }); }
        if (this.state.dropButtonType === 3) { await this.props.edit_list_product(listItemSelected, { is_active: true }); }
        await this.props.get_list_product(this.state.dataFilter);
        if (this.state.dropButtonType === 1) { this.setState({ listItemSelected: [] }); }
    }
    onChangePage = async (value, type) => {
        let dataFilter = this.state.dataFilter;
        if (type === 'limit') { dataFilter.limit = value; }
        if (type === 'page') { dataFilter.page = value; }
        if (type === 'search') { dataFilter.search = value; dataFilter.page = 1; }
        if (type === 'product_brand') { dataFilter.product_brand = value; dataFilter.page = 1; }
        if (type === 'tag') { dataFilter.tag = value; dataFilter.page = 1; }
        if (type === 'is_active') { dataFilter.is_active = value; dataFilter.page = 1; }
        if (type === 'category') { dataFilter.category = value; dataFilter.page = 1; }
        if (type === 'has_page') { dataFilter.has_page = value; dataFilter.page = 1; }

        this.setState({ dataFilter: dataFilter })
        await this.props.get_list_product(dataFilter);
        this.props.set_dataFilter_product(dataFilter);
    }
    onchange_search = (value) => {
        this.setState({
            dataFilter: {
                ...this.state.dataFilter,
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
        let dataPermissionsAfterCheck = this.state.dataPermissionsAfterCheck;
        const listItemSelected = this.state.listItemSelected;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (
            <>
                <Spin size='large' spinning={this.props.isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Space>
                                <Button disabled={!dataPermissionsAfterCheck['product.view_product']}
                                    onClick={() => this.open_drawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlineMenu />
                                        Bộ lọc
                                    </Space>
                                </Button>
                            </Space>
                            <div><Input.Search value={this.state.dataFilter.search}
                                onChange={(event) => this.onchange_search(event.target.value)}
                                onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên sản phẩm !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={this.props.dataFilter.limit} onChangePage={this.onChangePage} />
                            </div>
                            <Divider>SẢN PHẨM</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_products} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={this.props.dataFilter.page}
                                    showQuickJumper total={this.props.dataMeta.total * this.props.dataMeta.limit} pageSize={this.props.dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.drawer_filter && dataPermissionsAfterCheck['product.view_product'] &&
                    <DrawerFilter drawer_filter={this.state.drawer_filter}
                        open_drawer={this.open_drawer} dataFilter={this.state.dataFilter}
                        onChangePage={this.onChangePage}
                        dataBrands={this.props.dataBrands} dataTags={this.props.dataTags}
                        dataCategorys={this.props.dataCategorys} />
                }
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_products: state.product.data_products,
        data_product: state.product.data_product,
        dataMeta: state.product.dataMeta,
        isLoading: state.product.isLoading,
        isResult: state.product.isResult,
        dataFilter: state.product.dataFilter,
        dataTags: state.tag.dataTags,
        dataBrands: state.brand.dataBrands,
        dataCategorys: state.category.dataCategorys,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_product: (dataFilter) => dispatch(actions.get_list_product_redux(dataFilter)),
        get_product: (id) => dispatch(actions.get_product_redux(id)),
        edit_list_product: (id, data) => dispatch(actions.edit_list_product_redux(id, data)),
        delete_list_product: (id) => dispatch(actions.delete_list_product_redux(id)),
        set_data_product: (id) => dispatch(actions.set_data_product_redux(id)),
        set_dataFilter_product: (data) => dispatch(actions.set_dataFilter_product_redux(data)),
        getListBrand: (dataFilter) => dispatch(actions.getListBrandRedux(dataFilter)),
        getListTag: (dataFilter) => dispatch(actions.getListTagRedux(dataFilter)),
        getListCategory: (dataFilter) => dispatch(actions.getListCategoryRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));