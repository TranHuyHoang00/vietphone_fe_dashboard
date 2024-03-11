import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Space, Divider, Button, Popconfirm, Tooltip, message } from 'antd';
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { get_list_role, get_role, delete_role } from '../../../../services/role_services';

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
      data_role: {},
      data_roles: [],
    }
  }
  async componentDidMount() {
    await this.get_list_role();
  }
  get_list_role = async () => {
    try {
      let data = await get_list_role();
      if (data && data.data && data.data.success == 1) {
        this.setState({ data_roles: data.data.data });
      } else {
        message.error("Error");
      }
    } catch (e) {
      message.error("System Error");
    }
  }
  get_role = async (id) => {
    try {
      let data = await get_role(id);
      if (data && data.data && data.data.success == 1) {
        this.setState({ data_role: data.data.data });
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
        this.setState({ modal_detail: value, data_role: {} });
      } else {
        this.setState({ modal_detail: value });
        await this.get_role(id);
      }
    }
    if (name == 'edit') {
      if (id == null) {
        this.setState({ modal_edit: value, data_role: {} });
      } else {
        this.setState({ modal_edit: value });
        await this.get_role(id);
      }
    }
  }
  handle_Delete = async (id) => {
    try {
      let data = await delete_role(id);
      if (data && data.data && data.data.success == 1) {
        message.success('Success');
        await this.get_list_role();
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
          <Divider>ROLE</Divider>
          <Table columns={columns} dataSource={this.state.data_roles}
            size="middle" bordered pagination={{ pageSize: 6 }} scroll={{ y: 300, x: 300 }} />
        </div >

        <Modal_create modal_create={this.state.modal_create}
          open_Form={this.open_Form} get_list_role={this.get_list_role}
          data_roles={this.state.data_roles} />

        <Modal_detail modal_detail={this.state.modal_detail}
          open_Form={this.open_Form} data_role={this.state.data_role} />

        <Modal_edit modal_edit={this.state.modal_edit}
          open_Form={this.open_Form} get_list_role={this.get_list_role}
          data_roles={this.state.data_roles} data_role={this.state.data_role} />
      </>
    );
  }

}
export default withRouter(index);