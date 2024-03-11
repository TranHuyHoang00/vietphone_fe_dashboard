import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Space, Divider, Button, Popconfirm, Tooltip, message, Image } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_device, delete_device } from '../../../../services/device_services';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_detail: false,
            data_devices: [],
        }
    }
    async componentDidMount() {
        await this.get_list_device();
    }
    get_list_device = async () => {
        try {
            let data = await get_list_device();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_devices: data.data.data });
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    handle_Delete = async (id) => {
        try {
            let data = await delete_device(id);
            if (data && data.data && data.data.success == 1) {
                message.success('Success');
                await this.get_list_device();
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
                title: 'AVATAR', dataIndex: 'user_id', responsive: ['md'], width: 120,
                render: (user_id) =>
                    <div className='flex items-center justify-center'>
                        <Image className='object-cover rounded-[5px]' width={80} height={80}
                            src={(user_id && user_id.avatar == "" || user_id && user_id.avatar == null) ? require(`../../../../assets/images/None.jpg`).default : user_id && user_id.avatar} />
                    </div>
                ,
            },
            {
                title: 'ARTIST', dataIndex: 'user_id', responsive: ['md'],
                render: (user_id) => <h1>{user_id && user_id.fullname}</h1>,
                sorter: (a, b) => a.user_id.fullname.localeCompare(b.user_id.fullname),
            },
            {
                title: 'DEVICE', dataIndex: 'push_token',
                sorter: (a, b) => a.push_token.localeCompare(b.push_token),
            },
            {
                title: 'ACTION', width: 120,
                render: (_, item) => (
                    <Space size="middle" >
                        <Tooltip title="Detail"><a disabled><AiFillEye /></a></Tooltip>
                        <Tooltip title="Edit"><a disabled><AiFillEdit /></a></Tooltip>
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
                    <Button disabled onClick={() => this.open_Form("create", true)}
                        type="default" size="middle" className="bg-[#001529] text-white">
                        CREATE
                    </Button>
                    <Divider>DEVICE</Divider>
                    <Table columns={columns} dataSource={this.state.data_devices}
                        size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                </div >
            </>
        );
    }

}
export default withRouter(index);