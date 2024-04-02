import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown, Tag, Image
} from 'antd';
import { AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '../../components/selects/form_select_page';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_menu: 1,
            data_selected: [],
            modal_detail: false,
            modal_create: false,
            modal_edit: false,
        }
    }
    async componentDidMount() {
        this.props.get_list_product(this.props.data_filter);
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
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_product(data_selected); }
        if (this.state.type_menu === 2) { await this.props.edit_list_product(data_selected, { is_active: false }); }
        if (this.state.type_menu === 3) { await this.props.edit_list_product(data_selected, { is_active: true }); }
        await this.props.get_list_product(this.state.data_filter);
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    onchange_page = async (value, type) => {
        let data_filter = this.props.data_filter;
        if (type === 'limit') { data_filter.limit = value; }
        if (type === 'page') { data_filter.page = value; }
        if (type === 'search') { data_filter.search_query = value; data_filter.page = 1; }
        await this.props.get_list_product(data_filter);
        this.props.set_data_filter_product(data_filter);
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
                        <Typography.Text className='text-[#0574b8]'>{name}</Typography.Text>
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
                title: 'Status', dataIndex: 'is_active', width: 70,
                render: (is_active) =>
                    <div className='flex items-center justify-start'>
                        {is_active === true ?
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
        let type_menu = this.state.type_menu;
        return (
            <>
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button disabled onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff]'>
                                <Space className='text-white'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Tên sản phẩm !" /></div>
                        </div>
                        <div className='bg-white p-[10px] rounded-[10px] shadow-sm border'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={this.props.data_filter.limit} onchange_page={this.onchange_page} />
                                <div>
                                    <Popconfirm disabled={(data_selected && data_selected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${data_selected && data_selected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}  >
                                            <div>
                                                {type_menu === 1 && <span>Xóa</span>}
                                                {type_menu === 2 && <span>Khóa</span>}
                                                {type_menu === 3 && <span>Mở</span>}
                                                <span> {data_selected && data_selected.length === 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>THÔNG SỐ</Divider>
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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));