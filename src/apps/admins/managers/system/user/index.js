import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Input, Tag, Button, Popconfirm, Dropdown,
    Spin, Pagination, Typography
} from 'antd';
import { AiOutlinePlus, AiFillEdit, AiFillFilter } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import ModalEdit from './modals/modalEdit';
import DrawerFilter from './drawers/drawerFilter';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataUsers } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage, compareObjects } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropButtonType: 1,
            listItemSelected: [],
            modalDetail: false,
            modalCreate: false,
            drawerFilter: false,
            dataFilter: {
                page: 1,
                limit: 5,
                search: '',
                is_active: true,
                is_superuser: '',
                groups: '',
            },
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListUser, dataUserPermis, isSuperUser } = this.props;
        await getListUser(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataUsers, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataUser, getDataUser } = this.props;
        const actions = {
            setData: setDataUser,
            getData: getDataUser,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }

    openDrawer = async (drawerName, drawerValue) => {
        switch (drawerName) {
            case 'filter':
                this.setState({ drawerFilter: drawerValue });
                break;
            default:
                return;
        }
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListUser, editListUser, getListUser } = this.props;
        const actions = {
            deleteList: deleteListUser,
            editList: editListUser,
            getList: getListUser
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListUser } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        const result = await compareObjects(newDataFilter, dataFilter);
        if (!result) {
            await getListUser(newDataFilter);
            this.setState({ dataFilter: newDataFilter });
        }
    }
    render() {
        const { Text } = Typography;

        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 80, responsive: ['sm'],
                render: (id) => <Text>{id}</Text>,
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'THÔNG TIN', dataIndex: 'full_name',
                render: (full_name, item) =>
                    <>
                        <Text strong className='text-[#0574b8] dark:text-white'>{full_name}</Text><br />
                        <Text strong italic >{item?.phone}</Text><br />
                    </>,
                sorter: (a, b) => a.full_name.localeCompare(b.full_name),
            },
            {
                title: 'QUYỀN', dataIndex: 'groups', responsive: ['md'],
                render: (groups) =>
                    <>
                        {groups && groups.map((item) => {
                            return (
                                <div key={item.id}>
                                    <Tag color='orange'>{item.name}</Tag>
                                </div>
                            )
                        })}
                    </>
            },
            {
                title: 'STATUS', dataIndex: 'id', responsive: ['lg'],
                render: (id, item) =>
                    <div className='space-y-[5px]'>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Text type="secondary">Is Active</Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Tag color={`${item.is_active ? "green" : "red"}`}>{item.is_active ? "Yes" : "No"}</Tag>
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Text type="secondary">Is Staff</Text>
                                <span>:</span>
                            </div>
                            <div className='w-2/3'>
                                <Tag color={`${item.is_staff ? "green" : "red"}`}>{item.is_staff ? "Yes" : "No"}</Tag>
                            </div>
                        </div>
                        <div className='flex gap-[5px]'>
                            <div className='w-1/3 flex justify-between space-x-[5px]'>
                                <Text type="secondary">Super User</Text>
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
                        <button disabled={!dataCheckPermis['account.change_user']} onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        const { dataCheckPermis, listItemSelected, dataFilter, dropButtonType,
            modalCreate, modalEdit, drawerFilter } = this.state;
        const { isLoading, dataUsers, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['account.delete_user'] },
            { key: 2, label: 'Khóa', disabled: !dataCheckPermis['account.change_user'] },
            { key: 3, label: 'Mở', disabled: !dataCheckPermis['account.change_user'] },
        ];
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex flex-wrap items-center justify-between gap-[10px]'>
                            <div>
                                <Button disabled={!dataCheckPermis['account.add_user']} onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlinePlus />
                                        Tạo
                                    </Space>
                                </Button>
                                <Button onClick={() => this.openDrawer('filter', true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiFillFilter />
                                        Lọc
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
                                        <Dropdown.Button disabled={!dataCheckPermis['account.delete_user']}
                                            menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(value.key) }) } }}  >
                                            <div>
                                                {dropButtonType === 1 && <span>Xóa</span>}
                                                {dropButtonType === 2 && <span>Khóa</span>}
                                                {dropButtonType === 3 && <span>Mở</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>TÀI KHOẢN</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataUsers} pagination={false}
                                    size="middle" busered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataCheckPermis['account.add_user'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalEdit && dataCheckPermis['account.change_user'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {drawerFilter &&
                    <DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        onChangePage={this.onChangePage} />
                }
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataUsers: state.user.dataUsers,
        dataUser: state.user.dataUser,
        dataMeta: state.user.dataMeta,
        isLoading: state.user.isLoading,
        isResult: state.user.isResult,
        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListUser: (dataFilter) => dispatch(actions.getListUserRedux(dataFilter)),
        getDataUser: (id) => dispatch(actions.getDataUserRedux(id)),
        editListUser: (id, data) => dispatch(actions.editListUserRedux(id, data)),
        deleteListUser: (id) => dispatch(actions.deleteListUserRedux(id)),
        setDataUser: (id) => dispatch(actions.setDataUserRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));