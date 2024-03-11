import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Space, Divider, Button, Popconfirm, Tooltip, message, Image, Carousel } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_makeup_hair, get_makeup_hair, delete_makeup_hair } from '../../../../services/makeup_hair_services';
import Modal_detail from './modals/modal_detail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_detail: false,
            data_makeup_hair: {},
            data_makeup_hairs: [],
        }
    }
    async componentDidMount() {
        await this.get_list_makeup_hair();
    }
    get_list_makeup_hair = async () => {
        try {
            let data = await get_list_makeup_hair();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_makeup_hairs: data.data.data });
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    get_makeup_hair = async (id) => {
        try {
            let data = await get_makeup_hair(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_makeup_hair: data.data.data });
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
                this.setState({ modal_detail: value, data_makeup_hair: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_makeup_hair(id);
            }
        }
    }
    handle_Delete = async (id) => {
        try {
            let data = await delete_makeup_hair(id);
            if (data && data.data && data.data.success == 1) {
                message.success('Success');
                await this.get_list_makeup_hair();
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
                title: 'IMAGE', dataIndex: 'images', responsive: ['md'], width: 120,
                render: (images) => (
                    <>
                        {images.length !== 0 ?
                            <Carousel autoplay >
                                {images && images.map((item, index) => {
                                    return (
                                        <div key={item.id} className='flex items-center justify-center '>
                                            <Image width={80} height={80} className='object-cover rounded-[5px] '
                                                src={item.value} />
                                        </div>
                                    )
                                })}
                            </Carousel>
                            :
                            <div className='flex items-center justify-center'>
                                <Image width={80} height={80} className='object-cover rounded-[5px] '
                                    src={require(`../../../../assets/images/None.jpg`).default} />
                            </div>
                        }

                    </>
                ),
            },
            {
                title: 'MAKE UP', dataIndex: 'make_up',
                sorter: (a, b) => a.make_up.localeCompare(b.make_up),
            },
            {
                title: 'MAKE HAIR', dataIndex: 'make_hair',
                sorter: (a, b) => a.make_hair.localeCompare(b.make_hair),
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
                    <Divider>MAKEUP_HAIR</Divider>
                    <Table columns={columns} dataSource={this.state.data_makeup_hairs}
                        size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                </div >
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_Form={this.open_Form} data_makeup_hair={this.state.data_makeup_hair} />
            </>
        );
    }

}
export default withRouter(index);