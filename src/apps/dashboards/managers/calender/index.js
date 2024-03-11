import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Calendar, ConfigProvider, Modal, Divider, Tag, Table, Space, Tooltip, Popconfirm, Button, Avatar, Image, Select, message
} from 'antd';
import { toast } from 'react-toastify';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { delete_schedule, get_list_schedule, get_schedule } from '../../../../services/schedule_services';
import { get_list_user } from '../../../../services/user_services';
import Modal_detail from './modals/modal_detail';
import Modal_create from './modals/modal_create';
import Modal_edit from './modals/modal_edit';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_create: false,
            modal_detail: false,
            modal_edit: false,
            modal_list_schedule: false,
            date_select: '',
            data_schedule: {},
            data_schedules: [],
            data_schedules_date: [],
            type_filter: {
                user_id: 0,
                date: '',
                type_date: 1,
            },
            id_schedule: '',
            data_users: [],
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
        await this.get_list_schedule(type_filter)
        await this.get_list_user();
    }
    get_list_user = async () => {
        try {
            let data = await get_list_user();
            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                let data_filter = data_raw.filter(obj => obj.role.name == 'artist');
                let data_users = [{ value: 0, label: 'All' }];
                for (const i of data_filter) {
                    var obj = {};
                    obj.value = i.id;
                    obj.label = i.fullname;
                    data_users.push(obj);
                }
                this.setState({ data_users: data_users })
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    get_list_schedule = async (filter) => {
        try {
            let data = await get_list_schedule(filter);
            if (data && data.data && data.data.success == 1) {
                if (filter.type_date == 1) {
                    this.setState({ data_schedules: data.data.data })
                }
                if (filter.type_date == 2) {
                    this.setState({ data_schedules_date: data.data.data })
                }
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
                if (this.state.modal_detail == true) {
                    this.setState({ data_schedule: data.data.data })
                } else {
                    let data_raw = data.data.data;
                    let data_schedule = {};
                    data_schedule.user_id = data_raw.user_id.id;
                    data_schedule.brand_id = data_raw.brand_id.id;
                    data_schedule.stylist_id = data_raw.stylist_id.id;
                    data_schedule.makeup_hair_id = data_raw.makeup_hair_id.id;
                    data_schedule.charge_of_id = data_raw.charge_of_id.id;
                    data_schedule.time_localtion_id = data_raw.time_localtion_id.id;
                    this.setState({ data_schedule: data_schedule })
                }
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    open_Form = async (name, value, id) => {
        if (name == 'create') { this.setState({ modal_create: value }) }
        if (name == 'modal_list_schedule') { this.setState({ modal_list_schedule: value }) }
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
                this.setState({ modal_edit: value, id_schedule: id });
                await this.get_schedule(id);
            }
        }
    }
    onSelectDate = async (date, infor) => {
        let type_filter = this.state.type_filter;
        let date_format = date?.format('DD-MM-YYYY');
        let date_format1 = date?.format('YYYY-MM-DD');
        if (infor.source == 'date') {
            type_filter.date = date_format;
            type_filter.type_date = 2;
            this.setState({
                type_filter: type_filter,
                modal_list_schedule: true,
                date_select: date_format1,
                data_time_location: {
                    ...this.state.data_time_location,
                    show_date: date_format1,
                }
            })
            await this.get_list_schedule(type_filter);
        } else {
            type_filter.date = date_format;
            type_filter.type_date = 1;
            this.setState({ type_filter: type_filter, })
            await this.get_list_schedule(type_filter);
        }
    }
    get_date_now = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return `${day}-${month}-${year}`;
    };
    format_time = (time) => {
        var time_raw = new Date(time);
        var hour = time_raw.getHours();
        var minute = time_raw.getMinutes();
        return `${hour}:${minute}`
    }
    handle_Delete = async (id) => {
        try {
            let data = await delete_schedule(id);
            if (data && data.data && data.data.success == 1) {
                let type_filter = this.state.type_filter;
                await this.get_list_schedule(type_filter);
                let type_filter1 = type_filter;
                type_filter1.type_date = 1;
                await this.get_list_schedule(type_filter1);
                toast.success('Success')
            } else {
                toast.error('Error')
            }
        } catch (e) {
            toast.error('System error');
        }
    }
    onChange_User = async (value) => {
        let type_filter = this.state.type_filter;
        type_filter.user_id = value;
        type_filter.type_date = 1;
        await this.get_list_schedule(type_filter);
    }
    // Calender
    calender_render = (current, info) => {
        if (info.type === 'date') return this.dateCellRender(current);
        if (info.type === 'month') return this.monthCellRender(current);
        return info.originNode;
    }
    dateCellRender = (value) => {
        const listData = this.get_date_data(value);
        let DateNow = new Date();
        return (
            <div className="space-y-[5px]">
                {listData && listData.map((item, index) => (
                    <li className='truncate text-white' key={item.id}>
                        <div className='flex items-center '>
                            <Avatar size={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30, xxl: 30 }} src={item.user_id && item.user_id.avatar} />
                            {
                                (this.format_date(new Date(item.time_localtion_id.show_date))) > this.format_date(DateNow) ?
                                    (
                                        <Tag className="bg-orange-500 text-white hidden lg:block truncate max-w-[60px]" severity="success" >
                                            {item.user_id && item.user_id.fullname}
                                        </Tag>
                                    ) :
                                    (this.format_date(new Date(item.time_localtion_id.show_date))) < this.format_date(DateNow) ?
                                        (
                                            <Tag className="bg-red-500 text-white hidden lg:block truncate max-w-[60px]" severity="danger" >
                                                {item.user_id && item.user_id.fullname}
                                            </Tag>
                                        ) :
                                        (
                                            <Tag className="bg-green-500 text-white hidden lg:block max-w-[60px]" severity="success" >
                                                {item.user_id && item.user_id.fullname}
                                            </Tag>
                                        )
                            }
                        </div>
                    </li>
                ))}
            </div>
        );
    };
    monthCellRender = (value) => {
        const listData = this.get_month_data(value);
        let DateNow = new Date();
        return (
            <div className="space-y-[5px]">
                {listData && listData.map((item, index) => (
                    <li className='truncate text-white' key={item.id}>
                        {
                            <div className='flex items-center '>
                                <Avatar size={30} src={item.user_id && item.user_id.avatar} />
                                {
                                    (this.format_date(new Date(item.time_localtion_id.show_date))) > this.format_date(DateNow) ?
                                        (
                                            <Tag className="bg-orange-500 text-white hidden lg:block max-w-[60px]" severity="success" >
                                                {item.user_id && item.user_id.fullname}
                                            </Tag>
                                        ) :
                                        (this.format_date(new Date(item.time_localtion_id.show_date))) < this.format_date(DateNow) ?
                                            (
                                                <Tag className="bg-red-500 text-white hidden lg:block max-w-[60px]" severity="danger" >
                                                    {item.user_id && item.user_id.fullname}
                                                </Tag>
                                            ) :
                                            (
                                                <Tag className="bg-green-500 text-white hidden lg:block max-w-[60px]" severity="success" >
                                                    {item.user_id && item.user_id.fullname}
                                                </Tag>
                                            )
                                }
                            </div>}
                    </li>
                ))}
            </div>
        );
    };
    get_date_data = (value) => {
        let listData = [];
        let data_schedules = this.state.data_schedules;
        for (const i of data_schedules) {
            if (i && i.time_localtion_id) {
                let day = (new Date(i.time_localtion_id.show_date)).getDate();
                let month = (new Date(i.time_localtion_id.show_date)).getMonth();
                let year = (new Date(i.time_localtion_id.show_date)).getFullYear();
                if (day == value.date() && month == value.month() && year == value.year()) {
                    listData.push(i);
                }
            }
        }
        return listData;
    };
    get_month_data = (value) => {
        let listData = [];
        let data_schedules = this.state.data_schedules;
        for (const i of data_schedules) {
            if (i && i.time_localtion_id) {
                let month = (new Date(i.time_localtion_id.show_date)).getMonth();
                let year = (new Date(i.time_localtion_id.show_date)).getFullYear();
                if (month == value.month() && year == value.year()) {
                    listData.push(i);
                }
            }
        }
        return listData;
    };
    format_date = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    format_month = (dateToCompare) => {
        return dateToCompare.getFullYear() * 12 + dateToCompare.getMonth();
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
                    <ConfigProvider
                        theme={{
                            components: {
                                Calendar: {
                                    yearControlWidth: 100,
                                    monthControlWidth: 100,
                                },
                            },
                            token: {
                                padding: 20,
                            },
                        }}>
                        <div className='px-[10px]'>
                            <Select
                                defaultValue={{ value: 0, label: 'All' }}
                                style={{ width: 150, }}
                                onChange={(value) => this.onChange_User(value)}
                                options={this.state.data_users} />
                        </div>
                        <Calendar fullscreen className='p-[10px] '
                            onSelect={(date, infor) => this.onSelectDate(date, infor)}
                            cellRender={(current, info) => this.calender_render(current, info)} />
                    </ConfigProvider>
                </div >
                {this.state.modal_create == true &&
                    <Modal_create modal_create={this.state.modal_create} open_Form={this.open_Form}
                        date_select={this.state.date_select} get_list_schedule={this.get_list_schedule}
                        type_filter={this.state.type_filter} />
                }
                {this.state.modal_detail == true &&
                    <Modal_detail modal_detail={this.state.modal_detail} open_Form={this.open_Form}
                        date_select={this.state.date_select} data_schedule={this.state.data_schedule} />
                }
                {this.state.modal_edit == true &&
                    <Modal_edit modal_edit={this.state.modal_edit} open_Form={this.open_Form}
                        date_select={this.state.date_select} data_schedule={this.state.data_schedule}
                        type_filter={this.state.type_filter} id_schedule={this.state.id_schedule}
                        get_list_schedule={this.get_list_schedule} />
                }
                <Modal title={`SCHEDULE FOR DATE: ${this.state.date_select}`} open={this.state.modal_list_schedule}
                    okText={"EXIT"} okType={"default"} cancelText={"CANCEL"}
                    onOk={() => this.open_Form("modal_list_schedule", false)}
                    onCancel={() => this.open_Form("modal_list_schedule", false)}
                    width={800}>
                    <div className="m-[10px] p-[10px] border shadow-md bg-white">
                        <Button onClick={() => this.open_Form("create", true)}
                            type="default" size="middle" className="bg-[#001529] text-white">
                            CREATE
                        </Button>
                        <Divider>SCHEDULE</Divider>
                        <Table columns={columns} dataSource={this.state.data_schedules_date}
                            size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                    </div >
                </Modal>
            </>
        );
    }

}
export default withRouter(index);
