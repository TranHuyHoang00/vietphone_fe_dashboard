import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Space, Divider, Button, Popconfirm, Tooltip, message } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_time_location, get_time_location, delete_time_location } from '../../../../services/time_location_services';
import Modal_detail from './modals/modal_detail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_detail: false,
            data_time_location: {},
            data_time_locations: [],
        }
    }
    async componentDidMount() {
        await this.get_list_time_location();
    }
    get_list_time_location = async () => {
        try {
            let data = await get_list_time_location();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_time_locations: data.data.data });
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    get_time_location = async (id) => {
        try {
            let data = await get_time_location(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_time_location: data.data.data });
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    open_Form = async (name, value, id) => {
        if (name == 'detail') {
            if (id == null) {
                this.setState({ modal_detail: value, data_time_location: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_time_location(id);
            }
        }
    }
    handle_Delete = async (id) => {
        try {
            let data = await delete_time_location(id);
            if (data && data.data && data.data.success == 1) {
                message.success('Success');
                await this.get_list_time_location();
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
                title: 'SHOW DATE', dataIndex: 'show_date',
                sorter: (a, b) => a.show_date.localeCompare(b.show_date),
            },
            {
                title: 'SHOW TIME', dataIndex: 'show_time',
                sorter: (a, b) => a.show_time.localeCompare(b.show_time),
            },
            {
                title: 'LEAVE TIME', dataIndex: 'leave_time', responsive: ['md'],
                sorter: (a, b) => a.leave_time.localeCompare(b.leave_time),
            },
            {
                title: 'MAKEUP TIME', dataIndex: 'make_up_time', responsive: ['md'],
                sorter: (a, b) => a.make_up_time.localeCompare(b.make_up_time),
            },
            {
                title: 'ACTION', width: 120,
                render: (_, item) => (
                    <Space size="middle" >
                        <Tooltip title="Detail"><a onClick={() => this.open_Form('detail', true, item.id)}><AiFillEye /></a></Tooltip>
                        <Tooltip title="Edit"><a disabled onClick={() => this.open_Form('edit', true, item.id)}><AiFillEdit /></a></Tooltip>
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
                    <Divider>TIME_LOCATION</Divider>
                    <Table columns={columns} dataSource={this.state.data_time_locations}
                        size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                </div >
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_Form={this.open_Form} data_time_location={this.state.data_time_location} />
            </>
        );
    }

}
export default withRouter(index);