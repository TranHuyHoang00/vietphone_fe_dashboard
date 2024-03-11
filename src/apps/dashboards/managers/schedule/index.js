import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Space, Divider, Button, Popconfirm, Tooltip, message, Image } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_schedule, get_schedule, delete_schedule } from '../../../../services/schedule_services';
import Modal_detail from '../calender/modals/modal_detail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            data_schedule: {},
            data_schedules: [],
            type_filter: {
                user_id: 0,
                date: '',
                type_date: 1,
            },
        }
    }
    async componentDidMount() {
        let type_filter = this.state.type_filter;
        let date_now = this.get_date_now();
        type_filter.date = date_now;
        this.setState({
            type_filter: type_filter,
            date_select: date_now,
        })
        await this.get_list_schedule(this.state.type_filter);
    }
    get_date_now = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return `${day}-${month}-${year}`;
    };
    get_list_schedule = async (filter) => {
        try {
            let data = await get_list_schedule(filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_schedules: data.data.data })
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    get_schedule = async (id) => {
        try {
            let data = await get_schedule(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_schedule: data.data.data });
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
                this.setState({ modal_detail: value, data_schedule: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_schedule(id);
            }
        }
        if (name == 'edit') {
            if (id == null) {
                this.setState({ modal_edit: value, data_schedule: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.get_schedule(id);
            }
        }
    }
    handle_Delete = async (id) => {
        try {
            let data = await delete_schedule(id);
            if (data && data.data && data.data.success == 1) {
                message.success('Success');
                await this.get_list_schedule(this.state.type_filter);
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
                title: 'ID', dataIndex: 'id', responsive: ['md'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'AVATAR', dataIndex: 'user_id',
                render: (user_id) =>
                    <Image className='object-cover rounded-[5px]' width={50} height={50}
                        src={(user_id.avatar == "" || user_id.avatar == null) ? require(`../../../../assets/images/None.jpg`).default : user_id.avatar} />
                ,
            },
            {
                title: 'ARTIST', dataIndex: 'user_id',
                render: (user_id) => <h1>{user_id.fullname}</h1>,
                sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            },
            {
                title: 'SHOW TIME', dataIndex: 'time_localtion_id', responsive: ['md'],
                render: (time_localtion_id) => <h1>{time_localtion_id.show_time}</h1>,
                sorter: (a, b) => a.time_localtion_id.show_time.localeCompare(b.time_localtion_id.show_time),
            },
            {
                title: 'SHOW DATE', dataIndex: 'time_localtion_id', responsive: ['md'],
                render: (time_localtion_id) => <h1>{time_localtion_id.show_date}</h1>,
                sorter: (a, b) => a.time_localtion_id.show_date.localeCompare(b.time_localtion_id.show_date),
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
                    <Divider>SCHEDULE</Divider>
                    <Table columns={columns} dataSource={this.state.data_schedules}
                        size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                </div >
                {this.state.modal_detail == true &&
                    <Modal_detail modal_detail={this.state.modal_detail} open_Form={this.open_Form}
                        data_schedule={this.state.data_schedule} />
                }
            </>
        );
    }

}
export default withRouter(index);