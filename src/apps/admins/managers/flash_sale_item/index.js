import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm,
    Spin, Typography, Dropdown, Image
} from 'antd';
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import ModalCreate from './modals/modal_create';
import ModalEdit from './modals/modal_edit';
import FormSelectInput from '@components/selects/form_select_input';
import { format_money } from '@utils/format_money';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_menu: 1,
            data_selected: [],
            modal_detail: false,
            modal_create: false,
            modal_edit: false,
            data_filter: {
                page: 1,
                limit: 5,
                search: ''
            },
        }
    }
    async componentDidMount() {
        this.props.get_list_flash_sale(this.state.data_filter);
    }
    open_modal = async (name, value, id) => {
        if (name === 'create') {
            this.setState({ modal_create: value });
        }
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_flash_sale_item(id);
            }
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modal_edit: value });
            } else {
                this.setState({ modal_edit: value });
                await this.props.get_flash_sale_item(id);

            }
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_flash_sale_item(data_selected); }
        await this.props.get_flash_sale(this.props.data_flash_sale.id);
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Ảnh', dataIndex: 'product_variant', width: 90, responsive: ['sm'],
                render: (product_variant) =>
                    <>
                        {(product_variant && product_variant.media && product_variant.media.length !== 0) &&
                            <Image width={80} height={80} src={product_variant.media[0].image} className='object-cover' />
                        }
                    </>
            },
            {
                title: 'Tên ', dataIndex: 'product_variant',
                render: (product_variant) => <Typography.Text strong className='text-[#0574b8]'>{product_variant && product_variant.name}</Typography.Text>,
            },
            {
                title: 'Giá gốc ', dataIndex: 'product_variant', responsive: ['md'],
                render: (product_variant) => <Typography.Text >{format_money(product_variant && product_variant.regular_price)}</Typography.Text>,
            },
            {
                title: 'Giá Sale', dataIndex: 'discount_price', responsive: ['md'],
                render: (discount_price) => <Typography.Text >{format_money(discount_price)}</Typography.Text>,
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        {/* <span onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></span> */}
                        <span onClick={() => this.open_modal('edit', true, item.id)}>
                            <AiFillEdit />
                        </span>
                    </Space >
                ),
            },
        ];
        const items = [
            { key: 1, label: 'Xóa' },
        ];
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        let type_menu = this.state.type_menu;
        let data_flash_sale = this.props.data_flash_sale;
        return (
            <>
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button disabled={this.props.data_flash_sale.id ? false : true}
                                onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff]'>
                                <Space className='text-white'>
                                    <AiOutlinePlus />
                                    Thêm mới
                                </Space>
                            </Button>
                        </div>
                        <div className='bg-white p-[10px] rounded-[10px] shadow-sm border'>
                            <div className='flex items-end justify-between gap-[10px]'>
                                <div className='w-[200px] sm:w-[300px] md:w-[500px]'>
                                    <FormSelectInput name={'Flash sale'}
                                        important={true} width={'100%'}
                                        variable={'id'} value={this.props.data_flash_sale.id}
                                        options={this.props.data_flash_sales.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                        handle_onchange_input={this.props.get_flash_sale}
                                    />
                                </div>
                                <div>
                                    <Popconfirm disabled={(data_selected && data_selected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${data_selected && data_selected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ type_menu: parseInt(value.key) }) } }}  >
                                            <div>
                                                {type_menu === 1 && <span>Xóa</span>}
                                                <span> {data_selected && data_selected.length === 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>FLASH SALE</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={data_flash_sale && data_flash_sale.flash_sale_items} pagination={false}
                                    size="middle" bordered scroll={{}} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modal_create &&
                    <ModalCreate modal_create={this.state.modal_create}
                        open_modal={this.open_modal} />}
                {this.state.modal_edit &&
                    <ModalEdit modal_edit={this.state.modal_edit}
                        open_modal={this.open_modal} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_flash_sales: state.flash_sale.data_flash_sales,
        data_flash_sale: state.flash_sale.data_flash_sale,
        is_loading: state.flash_sale.is_loading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_flash_sale: (data_filter) => dispatch(actions.get_list_flash_sale_redux(data_filter)),
        get_flash_sale: (id) => dispatch(actions.get_flash_sale_redux(id)),
        delete_list_flash_sale_item: (id) => dispatch(actions.delete_list_flash_sale_item_redux(id)),
        get_flash_sale_item: (id) => dispatch(actions.get_flash_sale_item_redux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));