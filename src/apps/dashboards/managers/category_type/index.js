import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Space, Divider, Button, Popconfirm, Tooltip, message, AutoComplete, Spin } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { add_key_ant } from '../../../../utils/add_key_ant';
import Display_line_number from '../../components/display_line_number';
import { get_list_category_type, get_category_type, delete_category_type } from '../../../../services/category_type_service';
import Modal_create from './modals/modal_create';
import Modal_detail from './modals/modal_detail';
import Modal_edit from './modals/modal_edit';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            data_selected: [],
            modal_detail: false,
            modal_create: false,
            modal_edit: false,
            data_category_type: {},
            data_category_types: [],
        }
    }
    async componentDidMount() {
        await this.get_list_category_type();
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_category_type = async () => {
        this.handle_loading(true);
        try {
            let data = [
                { id: 1, name: 'Công việc', description: 'none', created_at: '23/12/2023', updated_at: '26/12/2023' },
                { id: 2, name: 'Giới tính', description: 'none', created_at: '24/12/2023', updated_at: '27/12/2023' },
                { id: 3, name: 'Độ tuổi', description: 'none', created_at: '25/12/2023', updated_at: '28/12/2023' },
            ]
            let data_new = data;
            this.setState({ data_category_types: data_new });
            // let data = await get_list_category_type();
            // if (data && data.data && data.data.success == 1) {
            //     let data_new=await add_key_ant(data);
            //     this.setState({ data_category_types: data.data.data });
            // } else {
            //     message.error("Lỗi");
            // }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }
    }
    get_category_type = async (id) => {
        this.handle_loading(true);
        try {
            let data = { id: 1, name: 'Công việc', description: 'none', created_at: '23/12/2023', updated_at: '26/12/2023' };
            this.setState({ data_category_type: data })
            // let data = await get_category_type(id);
            // if (data && data.data && data.data.success == 1) {
            //     this.setState({ data_category_type: data.data.data });
            // } else {
            //     message.error("Lỗi");
            // }
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
                this.setState({ modal_detail: value, data_category_type: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_category_type(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_category_type: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_category_type(id);
            }
        }
    }
    handle_delete = async (id) => {
        console.log(this.state.data_selected);
        // this.handle_loading(true);
        // try {
        //     let data = await delete_category_type(id);
        //     if (data && data.data && data.data.success == 1) {
        //         await this.get_list_category_type();
        //         message.success('Thành công');
        //     } else {
        //         message.error('Thất bại');
        //     }
        // } catch (e) {
        //     message.error('Lỗi hệ thống');
        // } finally {
        //     this.handle_loading(false);
        // }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'], width: 50,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Tên', dataIndex: 'name',
                render: (a) => <span className='font-semibold text-[#100ab6] italic'>{a}</span>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Mô tả', dataIndex: 'description', responsive: ['md'],
                render: (a) => <span className='italic'>{a}</span>,
                sorter: (a, b) => a.description.localeCompare(b.description),
            },
            {
                title: 'Ngày tạo', dataIndex: 'created_at', responsive: ['md'],
                render: (a) => <span className='italic'>{a}</span>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Ngày cập nhập', dataIndex: 'updated_at', responsive: ['md'],
                render: (a) => <span className='italic'>{a}</span>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <Tooltip title="Xem">
                            <a onClick={() => this.open_modal('detail', true, item.id)}><AiFillEye /></a>
                        </Tooltip>
                        <Tooltip title="Sửa">
                            <a onClick={() => this.open_modal('edit', true, item.id)}>
                                <AiFillEdit />
                            </a>
                        </Tooltip>
                    </Space >
                ),
            },
        ];
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        return (
            <>
                <Spin size='large' spinning={this.state.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button onClick={() => this.open_modal("create", true)} className='bg-[#100ab6]'>
                                <Space className='text-white'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <AutoComplete style={{ width: 200 }} placeholder="Nhập vào đây !" />
                        </div>
                        <div className='bg-white p-[10px] rounded-[10px] shadow-sm border'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <Space>
                                    <span>Hiển thị</span>
                                    <Display_line_number />
                                </Space>
                                <Popconfirm disabled={(data_selected && data_selected.length == 0 ? true : false)}
                                    title={`Bạn có chắc chắn muốn xóa ${data_selected && data_selected.length} dòng?`}
                                    placement="bottomLeft" okType='default' onConfirm={() => this.handle_delete()}>
                                    <Button className='bg-[#ed1e24] text-white'>
                                        <Space>
                                            <AiFillDelete />
                                            <span>Xóa {data_selected && data_selected.length == 0 ? '' : `(${data_selected.length})`}</span>
                                        </Space>
                                    </Button>
                                </Popconfirm>

                            </div>
                            <Divider>LOẠI DANH MỤC</Divider>
                            <Table rowSelection={row_selection}
                                columns={columns} dataSource={this.state.data_category_types}
                                size="middle" bordered scroll={{ y: 300, x: 300 }} pagination={{ pageSize: 5 }} />
                        </div>
                    </div >

                </Spin>
                <Modal_create modal_create={this.state.modal_create}
                    open_modal={this.open_modal} get_list_category_type={this.get_list_category_type} />
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_modal={this.open_modal} data_category_type={this.state.data_category_type} />
                <Modal_edit modal_edit={this.state.modal_edit}
                    open_modal={this.open_modal} get_list_category_type={this.get_list_category_type}
                    data_category_type={this.state.data_category_type} />
            </>
        );
    }

}
export default withRouter(index);