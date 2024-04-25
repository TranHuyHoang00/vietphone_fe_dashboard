import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown
} from 'antd';
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '@components/selects/form_select_page';
import ModalCreate from './modals/modal_create';
import ModalEdit from './modals/modal_edit';
import { check_permission } from '@utils/check_permission';
import { data_attribute_values } from '@datas/data_after_check_permissions';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_menu: 1,
            data_selected: [],
            modal_create: false,
            modal_edit: false,
            data_filter: {
                page: 1,
                limit: 5,
                search: ''
            },
            data_before_checks: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_attribute_value(this.state.data_filter);
        let data_before_checks = await check_permission(data_attribute_values, this.props.data_user_permissions, this.props.is_superuser);
        this.setState({
            data_before_checks: data_before_checks,
        });
    }
    open_modal = async (name, value, id) => {
        this.props.set_data_attribute_value({});
        if (name === 'create') {
            this.setState({ modal_create: value });
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modal_edit: value, data_attribute_value: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.props.get_attribute_value(id);
            }
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_attribute_value(data_selected); }
        await this.props.get_list_attribute_value(this.state.data_filter);
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type === 'limit') { data_filter.limit = value; }
        if (type === 'page') { data_filter.page = value; }
        if (type === 'search') { data_filter.search = value; data_filter.page = 1; }
        this.setState({ data_filter: data_filter })
        await this.props.get_list_attribute_value(data_filter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Giá trị', dataIndex: 'value',
                render: (value) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{value}</Typography.Text>,
                sorter: (a, b) => a.value.localeCompare(b.value),
            },
            {
                title: 'Thông số', dataIndex: 'attribute', responsive: ['md'],
                render: (attribute) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{attribute && attribute.name}</Typography.Text>,
            },
            {
                title: 'Loại thông số', dataIndex: 'attribute', responsive: ['md'],
                render: (attribute) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{attribute && attribute.group_attribute && attribute.group_attribute.name}</Typography.Text>,
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!data_before_checks['product.change_attributevalue']} className='cursor-pointer' onClick={() => this.open_modal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        let data_before_checks = this.state.data_before_checks;
        const items = [
            { key: 1, label: 'Xóa', disabled: !data_before_checks['product.delete_attributevalue'] },
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
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button disabled={!data_before_checks['product.add_attributevalue']}
                                onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Giá trị !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={data_filter.limit} onchange_page={this.onchange_page} />
                                <div>
                                    <Popconfirm disabled={(data_selected && data_selected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${data_selected && data_selected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                        <Dropdown.Button
                                            disabled={!data_before_checks['product.delete_attributevalue']}
                                            menu={{ items, onClick: (value) => { this.setState({ type_menu: parseInt(value.key) }) } }}  >
                                            <div>
                                                {type_menu === 1 && <span>Xóa</span>}
                                                <span> {data_selected && data_selected.length === 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>THÔNG SỐ</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_attribute_values} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={data_filter.page}
                                    showQuickJumper total={this.props.data_meta.total * this.props.data_meta.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modal_create && data_before_checks['product.add_attributevalue'] &&
                    <ModalCreate modal_create={this.state.modal_create}
                        open_modal={this.open_modal}
                        data_filter={this.state.data_filter} />}
                {this.state.modal_edit && data_before_checks['product.change_attributevalue'] &&
                    <ModalEdit modal_edit={this.state.modal_edit}
                        open_modal={this.open_modal}
                        data_filter={this.state.data_filter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_attribute_values: state.attribute_value.data_attribute_values,
        data_attribute_value: state.attribute_value.data_attribute_value,
        data_meta: state.attribute_value.data_meta,
        is_loading: state.attribute_value.is_loading,
        is_result: state.attribute_value.is_result,

        data_user_permissions: state.user.data_user_permissions,
        is_superuser: state.user.is_superuser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_attribute_value: (data_filter) => dispatch(actions.get_list_attribute_value_redux(data_filter)),
        get_attribute_value: (id) => dispatch(actions.get_attribute_value_redux(id)),
        edit_list_attribute_value: (id, data) => dispatch(actions.edit_list_attribute_value_redux(id, data)),
        delete_list_attribute_value: (id) => dispatch(actions.delete_list_attribute_value_redux(id)),
        set_data_attribute_value: (id) => dispatch(actions.set_data_attribute_value_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));