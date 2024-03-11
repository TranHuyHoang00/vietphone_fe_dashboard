import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Space, Divider, Button, Popconfirm, Tooltip, message } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_brand, get_brand, delete_brand } from '../../../../services/brand_services';
import Modal_detail from './modals/modal_detail';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_detail: false,
            data_brand: {},
            data_brands: [],
        }
    }
    async componentDidMount() {
        await this.get_list_brand();
    }
    get_list_brand = async () => {
        try {
            let data = await get_list_brand();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_brands: data.data.data });
            } else {
                message.error("Error");
            }
        } catch (e) {
            message.error("System Error");
        }
    }
    get_brand = async (id) => {
        try {
            let data = await get_brand(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_brand: data.data.data });
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
                this.setState({ modal_detail: value, data_brand: {} });
            } else {
                this.setState({ modal_detail: value });
                await this.get_brand(id);
            }
        }
    }
    handle_Delete = async (id) => {
        try {
            let data = await delete_brand(id);
            if (data && data.data && data.data.success == 1) {
                message.success('Success');
                await this.get_list_brand();
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
                title: 'NAME', dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name),
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
                    <Divider>BRAND</Divider>
                    <Table columns={columns} dataSource={this.state.data_brands}
                        size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
                </div >
                <Modal_detail modal_detail={this.state.modal_detail}
                    open_Form={this.open_Form} data_brand={this.state.data_brand} />
            </>
        );
    }

}
export default withRouter(index);