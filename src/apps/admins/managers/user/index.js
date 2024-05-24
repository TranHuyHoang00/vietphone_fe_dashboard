import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Input, Tag, Button, Popconfirm, Dropdown,
    Spin, Pagination, Typography, Avatar
} from 'antd';
import { AiOutlinePlus, AiFillEdit, AiOutlineMenu } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import ModalEdit from './modals/modalEdit';
import AvatarNone from '@assets/images/avatar_none.jpg';
import DrawerFilter from './drawers/drawer_filter';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { data_users } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeItemDropButton: 1,
            listItemSelected: [],
            modalDetail: false,
            modalCreate: false,
            drawer_filter: false,
            dataFilter: {
                page: 1,
                limit: 5,
                search: '',
                is_active: true,
                isSuperUser: '',
                groups: '',
            },
            dataPermissionsAfterCheck: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_user(this.state.dataFilter);
        let dataPermissionsAfterCheck = await handleCheckPermission(data_users, this.props.dataUserPermissions, this.props.isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (name, value, id) => {
        this.props.set_data_user({});
        if (name === 'create') {
            this.setState({ modalCreate: value });
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modalEdit: value, data_user: {} });
            } else {
                this.setState({ modalEdit: value });
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
    funcDropButtonHeaderOfTable = async () => {
        let listItemSelected = this.state.listItemSelected;
        if (this.state.typeItemDropButton === 1) { await this.props.delete_list_user(listItemSelected); }
        if (this.state.typeItemDropButton === 2) { await this.props.edit_list_user(listItemSelected, { is_active: false }); }
        if (this.state.typeItemDropButton === 3) { await this.props.edit_list_user(listItemSelected, { is_active: true }); }
        await this.props.get_list_user(this.state.dataFilter);
        if (this.state.typeItemDropButton === 1) { this.setState({ listItemSelected: [] }); }
    }
    onChangePage = async (value, type) => {
        let dataFilter = this.state.dataFilter;
        if (type === 'limit') { dataFilter.limit = value; }
        if (type === 'page') { dataFilter.page = value; }
        if (type === 'search') { dataFilter.search = value; dataFilter.page = 1; }
        if (type === 'is_active') { dataFilter.is_active = value; dataFilter.page = 1; }
        if (type === 'isSuperUser') { dataFilter.isSuperUser = value; dataFilter.page = 1; }
        if (type === 'groups') { dataFilter.groups = value; dataFilter.page = 1; }
        this.setState({ dataFilter: dataFilter })
        await this.props.get_list_user(dataFilter);
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
                                <Tag color={`${item.isSuperUser ? "green" : "red"}`}>{item.isSuperUser ? "Yes" : "No"}</Tag>
                            </div>
                        </div>
                    </div>
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataPermissionsAfterCheck['account.change_user']} onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        let dataPermissionsAfterCheck = this.state.dataPermissionsAfterCheck;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataPermissionsAfterCheck['account.delete_user'] },
            { key: 2, label: 'Khóa', disabled: !dataPermissionsAfterCheck['account.change_user'] },
            { key: 3, label: 'Mở', disabled: !dataPermissionsAfterCheck['account.change_user'] },
        ];
        const listItemSelected = this.state.listItemSelected;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        let dataFilter = this.state.dataFilter;
        let typeItemDropButton = this.state.typeItemDropButton;
        return (
            <>
                <Spin size='large' spinning={this.props.isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex flex-wrap items-center justify-between gap-[10px]'>
                            <div>
                                <Button disabled={!dataPermissionsAfterCheck['account.add_user']} onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
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
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên, SĐT !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-sm buser'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button disabled={!dataPermissionsAfterCheck['account.delete_user']}
                                            menu={{ items, onClick: (value) => { this.setState({ typeItemDropButton: parseInt(value.key) }) } }}  >
                                            <div>
                                                {typeItemDropButton === 1 && <span>Xóa</span>}
                                                {typeItemDropButton === 2 && <span>Khóa</span>}
                                                {typeItemDropButton === 3 && <span>Mở</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>TÀI KHOẢN</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_users} pagination={false}
                                    size="middle" busered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={this.props.dataMeta.total * this.props.dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modalCreate && dataPermissionsAfterCheck['account.add_user'] &&
                    <ModalCreate modalCreate={this.state.modalCreate}
                        openModal={this.openModal}
                        dataFilter={this.state.dataFilter} />}
                {this.state.modalEdit && dataPermissionsAfterCheck['account.change_user'] &&
                    <ModalEdit modalEdit={this.state.modalEdit}
                        openModal={this.openModal}
                        dataFilter={this.state.dataFilter} />}
                {this.state.drawer_filter &&
                    <DrawerFilter drawer_filter={this.state.drawer_filter}
                        open_drawer={this.open_drawer} dataFilter={this.state.dataFilter}
                        onChangePage={this.onChangePage} data_groups={this.props.data_groups} />
                }
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_users: state.user.data_users,
        data_user: state.user.data_user,
        dataMeta: state.user.dataMeta,
        isLoading: state.user.isLoading,
        isResult: state.user.isResult,
        data_groups: state.group.data_groups,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_user: (dataFilter) => dispatch(actions.get_list_user_redux(dataFilter)),
        get_user: (id) => dispatch(actions.get_user_redux(id)),
        edit_list_user: (id, data) => dispatch(actions.edit_list_user_redux(id, data)),
        delete_list_user: (id) => dispatch(actions.delete_list_user_redux(id)),
        set_data_user: (id) => dispatch(actions.set_data_user_redux(id)),
        get_list_group: (dataFilter) => dispatch(actions.get_list_group_redux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));