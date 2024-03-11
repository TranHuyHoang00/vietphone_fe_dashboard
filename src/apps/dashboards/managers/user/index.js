import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Space, Divider, Button, Popconfirm, Tooltip, message, Image } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_user, get_user, delete_user } from '../../../../services/user_services';
import Modal_create from './modals/modal_create';
import Modal_detail from './modals/modal_detail';
import Modal_edit from './modals/modal_edit';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            data_user: {},
            data_users: [],
        }
    }
    async componentDidMount() {
        await this.get_list_user();
    }
    get_list_user = async () => {
        try {
            let data = await get_list_user();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_users: data.data.data });
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    get_user = async (id) => {
        try {
            let data = await get_user(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_user: data.data.data });
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    open_Form = async (name, value, id) => {
        if (name == 'create') {
            this.setState({ modal_create: value });
        }
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_user: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_user(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_user: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_user(id);
            }
        }
    }
    handle_Delete = async (id) => {
        try {
            let data = await delete_user(id);
            if (data && data.data && data.data.success == 1) {
                message.success('Success');
                await this.get_list_user();
            } else {
                message.error('Error');
            }
        } catch (e) {
            message.error('System error');
        }
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', responsive: ['md'], width: 100,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'AVATAR', dataIndex: 'avatar', responsive: ['md'], width: 120,
                render: (avatar) =>
                    <Image className='object-cover rounded-[5px]' width={80} height={80}
                        src={(avatar == "" || avatar == null) ? require(`../../../../assets/images/None.jpg`).default : avatar} />
                ,
            },
            {
                title: 'FULLNAME', dataIndex: 'fullname', responsive: ['md'],
                sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            },
            {
                title: 'USERNAME', dataIndex: 'username',
                sorter: (a, b) => a.username.localeCompare(b.username),
            },
            {
                title: 'ROLE', dataIndex: 'role', responsive: ['md'],
                render: (role) => <h1>{role && role.name}</h1>,
                sorter: (a, b) => a.role.name.localeCompare(b.role.name),
            },
            {
                title: 'COLOR', dataIndex: 'color',
                render: (color) =>
                    <input type='color' showText value={color} disabled />
            },
            {
                title: 'ACTION', width: 120,
                render: (_, item) => (
                    <Space size="middle" >
                        <Tooltip title="Detail"><a onClick={() => this.open_Form('detail', true, item.id)}><AiFillEye /></a></Tooltip>
                        <Tooltip title="Edit"><a onClick={() => this.open_Form('edit', true, item.id)}><AiFillEdit /></a></Tooltip>
                        <Popconfirm title="Are you sure you want to DELETE?" placement="right"
                            okType='default' onConfirm={() => this.handle_Delete(item.id)}>
                            <Tooltip title="Delete"> <a><AiFillDelete /></a></Tooltip>
                        </Popconfirm>
                    </Space >
                ),
            },
        ];
        return (
            <>
                <div className="m-[10px] p-[10px] border shadow-md bg-white">
                    <Button onClick={() => this.open_Form("create", true)}
                        type="default" size="middle" className="bg-[#001529] text-white">
                        CREATE
                    </Button>
                    <Divider>USER</Divider>
                    <Table columns={columns} dataSource={this.state.data_users}
                        size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                </div >

                <Modal_create modal_create={this.state.modal_create}
                    open_Form={this.open_Form} get_list_user={this.get_list_user}
                    data_users={this.state.data_users} />

                <Modal_detail modal_detail={this.state.modal_detail}
                    open_Form={this.open_Form} data_user={this.state.data_user} />

                <Modal_edit modal_edit={this.state.modal_edit}
                    open_Form={this.open_Form} get_list_user={this.get_list_user}
                    data_users={this.state.data_users} data_user={this.state.data_user} />
            </>
        );
    }

}
export default withRouter(index);