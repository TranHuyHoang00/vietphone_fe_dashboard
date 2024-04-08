import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import {
    Modal, Input, Table, Divider, Popconfirm,
    Spin, Pagination, Typography, Dropdown,
} from 'antd';
import ModalFooter from '../../../components/modal/modal_footer';
import FormSelectPage from '../../../components/selects/form_select_page';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_menu: 1,
            data_selected: [],
            data_filter: {
                page: 1,
                limit: 5,
                search: ''
            },
        }
    }
    async componentDidMount() {
        this.props.get_list_variant(this.state.data_filter);
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        let data_flash_sale = this.props.data_flash_sale;
        if (this.state.type_menu == 1) {
            if (data_flash_sale.id) {
                await this.props.create_list_flash_sale_item(data_flash_sale.id, data_selected);
            }
        }
        if (this.props.is_result === true) {
            await this.props.get_flash_sale(data_flash_sale.id);
            this.props.open_modal("create", false);
            if (this.state.type_menu == 1) { this.setState({ data_selected: [] }); }
        }
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type === 'limit') { data_filter.limit = value; }
        if (type === 'page') { data_filter.page = value; }
        if (type === 'search') { data_filter.search = value; data_filter.page = 1; }
        this.setState({ data_filter: data_filter })
        await this.props.get_list_variant(data_filter);
    }
    render() {
        let is_loading = this.props.is_loading;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Tên sản phẩm', dataIndex: 'name',
                render: (name) => <Typography.Text className='text-[#0574b8]'>{name}</Typography.Text>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
        ];
        const items = [
            { key: 1, label: 'Thêm' },
        ];
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        let type_menu = this.state.type_menu;
        return (

            <Modal title="THÊM MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={900}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'create'}
                        is_loading={is_loading} handle_funtion={this.handle_funtion_menu} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <div><Input.Search onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Tên sản phẩm !" /></div>
                        </div>
                        <div className='bg-white p-[10px] rounded-[10px] shadow-sm border'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={this.state.data_filter.limit} onchange_page={this.onchange_page} />
                                <div>
                                    <Popconfirm disabled={(data_selected && data_selected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${data_selected && data_selected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}  >
                                            <div>
                                                {type_menu == 1 && <span>Thêm</span>}
                                                <span> {data_selected && data_selected.length === 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>SẢN PHẨM</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_variants} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={this.state.data_filter.page}
                                    showQuickJumper total={this.props.data_meta.total * this.props.data_meta.limit} pageSize={this.state.data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_variants: state.variant.data_variants,
        data_meta: state.variant.data_meta,
        is_loading: state.variant.is_loading,
        data_flash_sale: state.flash_sale.data_flash_sale,
        is_result: state.flash_sale_item.is_result,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_flash_sale: (id) => dispatch(actions.get_flash_sale_redux(id)),
        get_list_variant: (data_filter) => dispatch(actions.get_list_variant_redux(data_filter)),
        create_list_flash_sale_item: (id, list_it) => dispatch(actions.create_list_flash_sale_item_redux(id, list_it)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));