import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown, Tag
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import Form_select_page from '../../components/selects/form_select_page';
import Modal_create from './modals/modal_create';
import Modal_detail from './modals/modal_detail';
import Modal_edit from './modals/modal_edit';
import moment from 'moment';

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
        this.props.get_list_flash_sale(this.state.data_filter);
    }
    open_modal = async (name, value, id) => {
        if (name == 'create') {
            this.setState({ modal_create: value });
            this.props.set_data_flash_sale({});
        }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_flash_sale: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.props.get_flash_sale(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_flash_sale: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.props.get_flash_sale(id);
            }
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu == 1) { await this.props.delete_list_flash_sale(data_selected); }
        if (this.state.type_menu == 2) { await this.props.edit_list_flash_sale(data_selected, { is_active: false }); }
        if (this.state.type_menu == 3) { await this.props.edit_list_flash_sale(data_selected, { is_active: true }); }
        await this.props.get_list_flash_sale(this.state.data_filter);
        if (this.state.type_menu == 1) { this.setState({ data_selected: [] }); }
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type == 'limit') { data_filter.limit = value; }
        if (type == 'page') { data_filter.page = value; }
        if (type == 'search') { data_filter.search_query = value; data_filter.page = 1; }
        this.setState({ data_filter: data_filter })
        await this.props.get_list_flash_sale(data_filter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Tên', dataIndex: 'name',
                render: (name) => <Typography.Text strong className='text-[#0574b8]'>{name}</Typography.Text>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Ngày BĐ', dataIndex: 'start_time', responsive: ['md'],
                render: (start_time) => <Typography.Text>{moment(start_time).format('HH:mm DD/MM/YYYY ')}</Typography.Text>,
            },
            {
                title: 'Ngày KT', dataIndex: 'end_time', responsive: ['md'],
                render: (end_time) => <Typography.Text>{moment(end_time).format('HH:mm DD/MM/YYYY ')}</Typography.Text>,
            },
            {
                title: 'Status', dataIndex: 'is_active', width: 70, responsive: ['md'],
                render: (is_active) =>
                    <div className='flex items-center justify-start'>
                        {is_active == true ?
                            <Tag color='green'>Mở</Tag>
                            :
                            <Tag color='red'>Khóa</Tag>
                        }
                    </div>
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
                            <div><Input.Search onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Tên flash_sale!" /></div>
                        </div>
                        <div className='bg-white p-[10px] rounded-[10px] shadow-sm border'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <Form_select_page limit={data_filter.limit} onchange_page={this.onchange_page} />
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
                            <Divider>FLASH SALE</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_flash_sales} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={data_filter.page}
                                    showQuickJumper total={this.props.data_meta.total * this.props.data_meta.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                <Modal_create modal_create={this.state.modal_create}
                    open_modal={this.open_modal}
                    data_filter={this.state.data_filter} />
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} />
                <Modal_edit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal}
                    data_filter={this.state.data_filter} />
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_flash_sales: state.flash_sale.data_flash_sales,
        data_flash_sale: state.flash_sale.data_flash_sale,
        data_meta: state.flash_sale.data_meta,
        is_loading: state.flash_sale.is_loading,
        is_result: state.flash_sale.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_flash_sale: (data_filter) => dispatch(actions.get_list_flash_sale_redux(data_filter)),
        get_flash_sale: (id) => dispatch(actions.get_flash_sale_redux(id)),
        edit_list_flash_sale: (id, data) => dispatch(actions.edit_list_flash_sale_redux(id, data)),
        delete_list_flash_sale: (id) => dispatch(actions.delete_list_flash_sale_redux(id)),
        set_data_flash_sale: (id) => dispatch(actions.set_data_flash_sale_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));