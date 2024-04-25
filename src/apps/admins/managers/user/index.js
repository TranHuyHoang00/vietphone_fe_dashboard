import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Input, Tag, Button, Popconfirm, Dropdown,
    Spin, Pagination, Typography, Avatar
} from 'antd';
import { AiOutlinePlus, AiFillEdit, AiOutlineMenu } from "react-icons/ai";
import FormSelectPage from '@components/selects/form_select_page';
import ModalCreate from './modals/modal_create';
import ModalEdit from './modals/modal_edit';
import AvatarNone from '@assets/images/avatar_none.jpg';
import DrawerFilter from './drawers/drawer_filter';
import { check_permission } from '@utils/check_permission';
import { data_users } from '@datas/data_after_check_permissions';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type_menu: 1,
            data_selected: [],
            modal_detail: false,
            modal_create: false,
            drawer_filter: false,
            data_filter: {
                page: 1,
                limit: 5,
                search: '',
                is_active: true,
                is_superuser: '',
                groups: '',
            },
            data_before_checks: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_user(this.state.data_filter);
        let data_before_checks = await check_permission(data_users, this.props.data_user_permissions, this.props.is_superuser);
        this.setState({
            data_before_checks: data_before_checks,
        });
    }
    open_modal = async (name, value, id) => {
        this.props.set_data_user({});
        if (name === 'create') {
            this.setState({ modal_create: value });
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modal_edit: value, data_user: {} });
            } else {
                this.setState({ modal_edit: value });
                await this.props.get_user(id);
            }
        }
    }
    open_drawer = async (name, value) => {
        if (name === 'filter') {
            this.props.get_list_group({ page: 1, limit: 50, search: '' });
            this.setState({ drawer_filter: value });
        }
    }
    handle_funtion_menu = async () => {
        let data_selected = this.state.data_selected;
        if (this.state.type_menu === 1) { await this.props.delete_list_user(data_selected); }
        if (this.state.type_menu === 2) { await this.props.edit_list_user(data_selected, { is_active: false }); }
        if (this.state.type_menu === 3) { await this.props.edit_list_user(data_selected, { is_active: true }); }
        await this.props.get_list_user(this.state.data_filter);
        if (this.state.type_menu === 1) { this.setState({ data_selected: [] }); }
    }
    onchange_page = async (value, type) => {
        let data_filter = this.state.data_filter;
        if (type === 'limit') { data_filter.limit = value; }
        if (type === 'page') { data_filter.page = value; }
        if (type === 'search') { data_filter.search = value; data_filter.page = 1; }
        if (type === 'is_active') { data_filter.is_active = value; data_filter.page = 1; }
        if (type === 'is_superuser') { data_filter.is_superuser = value; data_filter.page = 1; }
        if (type === 'groups') { data_filter.groups = value; data_filter.page = 1; }
        this.setState({ data_filter: data_filter })
        await this.props.get_list_user(data_filter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                render: (id) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{id}</Typography.Text>,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Thông tin', dataIndex: 'id',
                render: (id, item) =>
                    <div className='flex items-center justify-start gap-x-[5px]'>
                        <Avatar size={60} src={AvatarNone} />
                        <div>
                            <Typography.Text strong className='text-[#0574b8] dark:text-white'>{item?.full_name}</Typography.Text><br />
                            <Typography.Text italic strong>{item?.phone}</Typography.Text><br />
                        </div>
                    </div>
            },
            {
                title: 'Quyền', dataIndex: 'groups', responsive: ['md'],
                render: (groups) =>
                    <>
                        {groups && groups.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    <Tag color='orange'>{item.name}</Tag>
                                </div>
                            )
                        })}
                    </>
            },
            {
                title: 'Trạng thái', dataIndex: 'id', responsive: ['lg'],
                render: (id, item) =>
                    <div className='space-y-[5px]'>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Is Active</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Tag color={`${item.is_active ? "green" : "red"}`}>{item.is_active ? "Yes" : "No"}</Tag>
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Is Staff</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Tag color={`${item.is_staff ? "green" : "red"}`}>{item.is_staff ? "Yes" : "No"}</Tag>
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Typography.Text type="secondary">Super User</Typography.Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Tag color={`${item.is_superuser ? "green" : "red"}`}>{item.is_superuser ? "Yes" : "No"}</Tag>
                            </div>
                        </div>
                    </div>
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!data_before_checks['account.change_user']} onClick={() => this.open_modal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        let data_before_checks = this.state.data_before_checks;
        const items = [
            { key: 1, label: 'Xóa', disabled: !data_before_checks['account.delete_user'] },
            { key: 2, label: 'Khóa', disabled: !data_before_checks['account.change_user'] },
            { key: 3, label: 'Mở', disabled: !data_before_checks['account.change_user'] },
        ];
        const data_selected = this.state.data_selected;
        const onchange_selected = (data_new) => {
            this.setState({ data_selected: data_new })
        };
        const row_selection = { data_selected, onChange: onchange_selected };
        let data_filter = this.state.data_filter;
        let type_menu = this.state.type_menu;
        return (
            <>
                <Spin size='large' spinning={this.props.is_loading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex flex-wrap items-center justify-between gap-[10px]'>
                            <div>
                                <Button disabled={!data_before_checks['account.add_user']} onClick={() => this.open_modal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlinePlus />
                                        Tạo mới
                                    </Space>
                                </Button>
                                <Button onClick={() => this.open_drawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlineMenu />
                                        Bộ lọc
                                    </Space>
                                </Button>
                            </div>
                            <div><Input.Search onSearch={(value) => this.onchange_page(value, 'search')} placeholder="Tên, SĐT !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-sm buser'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={data_filter.limit} onchange_page={this.onchange_page} />
                                <div>
                                    <Popconfirm disabled={(data_selected && data_selected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${data_selected && data_selected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.handle_funtion_menu()}>
                                        <Dropdown.Button disabled={!data_before_checks['account.delete_user']}
                                            menu={{ items, onClick: (value) => { this.setState({ type_menu: parseInt(value.key) }) } }}  >
                                            <div>
                                                {type_menu === 1 && <span>Xóa</span>}
                                                {type_menu === 2 && <span>Khóa</span>}
                                                {type_menu === 3 && <span>Mở</span>}
                                                <span> {data_selected && data_selected.length === 0 ? '' : `(${data_selected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>TÀI KHOẢN</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={row_selection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_users} pagination={false}
                                    size="middle" busered scroll={{}} />
                                <Pagination responsive current={data_filter.page}
                                    showQuickJumper total={this.props.data_meta.total * this.props.data_meta.limit} pageSize={data_filter.limit}
                                    onChange={(value) => this.onchange_page(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modal_create && data_before_checks['account.add_user'] &&
                    <ModalCreate modal_create={this.state.modal_create}
                        open_modal={this.open_modal}
                        data_filter={this.state.data_filter} />}
                {this.state.modal_edit && data_before_checks['account.change_user'] &&
                    <ModalEdit modal_edit={this.state.modal_edit}
                        open_modal={this.open_modal}
                        data_filter={this.state.data_filter} />}
                {this.state.drawer_filter &&
                    <DrawerFilter drawer_filter={this.state.drawer_filter}
                        open_drawer={this.open_drawer} data_filter={this.state.data_filter}
                        onchange_page={this.onchange_page} data_groups={this.props.data_groups} />
                }
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_users: state.user.data_users,
        data_user: state.user.data_user,
        data_meta: state.user.data_meta,
        is_loading: state.user.is_loading,
        is_result: state.user.is_result,
        data_groups: state.group.data_groups,

        data_user_permissions: state.user.data_user_permissions,
        is_superuser: state.user.is_superuser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_user: (data_filter) => dispatch(actions.get_list_user_redux(data_filter)),
        get_user: (id) => dispatch(actions.get_user_redux(id)),
        edit_list_user: (id, data) => dispatch(actions.edit_list_user_redux(id, data)),
        delete_list_user: (id) => dispatch(actions.delete_list_user_redux(id)),
        set_data_user: (id) => dispatch(actions.set_data_user_redux(id)),
        get_list_group: (data_filter) => dispatch(actions.get_list_group_redux(data_filter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));