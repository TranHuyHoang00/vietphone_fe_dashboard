import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '../../components/selects/form_select_page';
import ModalCreate from './modals/modal_create';
import ModalDetail from './modals/modal_detail';
import ModalEdit from './modals/modal_edit';
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
                search_query: ''
            },
        }
    }
    async componentDidMount() {
        this.props.get_list_attribute(this.state.data_filter);
    }
    open_modal = async (name, value, id) => {
        if (name === 'create') {
            this.setState({ modal_create: value });
            this.props.set_data_attribute({});
        }
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modal_detail: value, data_attribute: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_attribute(id);
            }
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modal_edit: value, data_attribute: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.props.get_attribute(id);
            }
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_attribute(data_selected); }
        await this.props.get_list_attribute(this.state.data_filter);
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type === 'limit') { data_filter.limit = value; }
        if (type === 'page') { data_filter.page = value; }
        if (type === 'search') { data_filter.search_query = value; data_filter.page = 1; }
        this.setState({ data_filter: data_filter })
        await this.props.get_list_attribute(data_filter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'CODE', dataIndex: 'code', width: 100, responsive: ['sm'],
            },
            {
                title: 'Tên', dataIndex: 'name',
                render: (name) => <Typography.Text strong className='text-[#0574b8]'>{name}</Typography.Text>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Loại thông số', dataIndex: 'group_attribute', responsive: ['md'],
                render: (group_attribute) => <Typography.Text strong className='text-[#0574b8]'>{group_attribute && group_attribute.name}</Typography.Text>,
            },
            {
                title: 'Mô tả', dataIndex: 'description', responsive: ['md'],
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <span onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></span>
                        <span onClick={() => this.open_modal('edit', true, item.id)}>
                            <AiFillEdit />
                        </span>
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
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff]'>
                                <Space className='text-white'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Tên thông số !" /></div>
                        </div>
                        <div className='bg-white p-[10px] rounded-[10px] shadow-sm border'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={data_filter.limit} onchange_page={this.onchange_page} />
                                <div>
                                    <Popconfirm disabled={(data_selected && data_selected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${data_selected && data_selected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}  >
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
                                    columns={columns} dataSource={this.props.data_attributes} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={data_filter.page}
                                    showQuickJumper total={this.props.data_meta.total * this.props.data_meta.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                <ModalCreate modal_create={this.state.modal_create}
                    open_modal={this.open_modal}
                    data_filter={this.state.data_filter} />
                <ModalDetail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} />
                <ModalEdit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal}
                    data_filter={this.state.data_filter} />
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_attributes: state.attribute.data_attributes,
        data_attribute: state.attribute.data_attribute,
        data_meta: state.attribute.data_meta,
        is_loading: state.attribute.is_loading,
        is_result: state.attribute.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_attribute: (data_filter) => dispatch(actions.get_list_attribute_redux(data_filter)),
        get_attribute: (id) => dispatch(actions.get_attribute_redux(id)),
        edit_list_attribute: (id, data) => dispatch(actions.edit_list_attribute_redux(id, data)),
        delete_list_attribute: (id) => dispatch(actions.delete_list_attribute_redux(id)),
        set_data_attribute: (id) => dispatch(actions.set_data_attribute_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));