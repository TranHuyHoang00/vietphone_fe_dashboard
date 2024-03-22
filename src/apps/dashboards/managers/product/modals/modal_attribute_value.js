import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Table, Space, Divider, Button, Popconfirm, message, Input,
    Spin, Pagination, Typography, Dropdown, Modal
} from 'antd';
import { get_list_attribute_value, get_attribute_value, delete_attribute_value } from '../../../../../services/attribute_value_service';
import { AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import Display_line_number from '../../../components/display_line_number';

class modal_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
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
            data_attribute_value: {},
            data_attribute_values: [],
            metadata: {},
        }
    }
    async componentDidMount() {
        await this.get_list_attribute_value(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_attribute_value = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_attribute_value(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_attribute_values: data.data.data.attribute_values,
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
    get_attribute_value = async (id) => {
        this.handle_loading(true);
        try {
            let data = await get_attribute_value(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_attribute_value: data.data.data });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }

    }
    open_modal = async (name, value, id) => {
        if (name == 'create') { this.setState({ modal_create: value }); }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_attribute_value: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_attribute_value(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_attribute_value: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_attribute_value(id);
            }
        }
    }
    handle_delete = async () => {
        this.handle_loading(true);
        try {
            let data_selected = this.state.data_selected;
            for (const id of data_selected) {
                let data = await delete_attribute_value(id);
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
        await this.get_list_attribute_value(data_filter);
        this.setState({ data_filter: data_filter })
    }
    on_search = async (value) => {
        let data_filter = this.state.data_filter;
        data_filter.search_query = value;
        data_filter.page = 1;
        await this.get_list_attribute_value(data_filter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Giá trị', dataIndex: 'value',
                render: (value) => <Typography.Text strong className='text-[#0574b8]'>{value}</Typography.Text>,
                sorter: (a, b) => a.value.localeCompare(b.value),
            },
            {
                title: 'Thông số', dataIndex: 'attribute', responsive: ['md'],
                render: (attribute) => <Typography.Text strong className='text-[#0574b8]'>{attribute && attribute.name}</Typography.Text>,
            },
            {
                title: 'Loại thông số', dataIndex: 'attribute', responsive: ['md'],
                render: (attribute) => <Typography.Text strong className='text-[#0574b8]'>{attribute && attribute.group_attribute && attribute.group_attribute.name}</Typography.Text>,
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
            <Modal title="Thông số kỹ thuật" open={this.props.modal_attribute_value}
                onCancel={() => this.props.open_modal("attribute_value", false)} width={'100%'}>
                <Spin size='large' spinning={this.state.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff]'>
                                <Space className='text-white'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.on_search(value)} placeholder="Giá trị thông số !" /></div>
                        </div>
                        <div className='bg-white p-[10px] rounded-[10px] shadow-sm battribute_value'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <Display_line_number limit={data_filter.limit} onchange_page={this.onchange_page} />
                                <div>
                                    <Popconfirm disabled={(data_selected && data_selected.length == 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${data_selected && data_selected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ type_menu: value.key }) } }}  >
                                            <div>
                                                {type_menu == 1 && <span>Xóa</span>}
                                                <span> {data_selected && data_selected.length == 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>GIÁ TRỊ</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.state.data_attribute_values} pagination={false}
                                    size="middle" battribute_valueed scroll={{}} />
                                <Pagination responsive current={data_filter.page}
                                    showQuickJumper total={metadata.total * metadata.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_attribute_value);