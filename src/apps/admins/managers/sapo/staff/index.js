import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import ModalDetail from './modals/modalDetail';
import ModalEdit from './modals/modalEdit';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataStaffs } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';
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
            modalEdit: false,
            dataFilter: {
                page: 1,
                limit: 5,
                search: ''
            },
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListStaff, dataUserPermis, isSuperUser } = this.props;
        await getListStaff(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataStaffs, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataStaff, getDataStaff } = this.props;
        const actions = {
            setData: setDataStaff,
            getData: getDataStaff,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListStaff, editListStaff, getListStaff } = this.props;
        const actions = {
            deleteList: deleteListStaff,
            editList: editListStaff,
            getList: getListStaff
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListStaff } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListStaff(newDataFilter);
    }
    render() {
        const { Text } = Typography;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'TÊN', dataIndex: ['user', 'full_name'],
                render: (value) => {
                    return { children: <Text strong className='text-[#0574b8] dark:text-white'>{value}</Text> }
                },
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'SĐT', dataIndex: ['user', 'phone'],
                render: (value) => {
                    return { children: <Text strong className='text-[#0574b8] dark:text-white'>{value}</Text> }
                },
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataCheckPermis['account.view_staff']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                        <button hidden
                            disabled={!dataCheckPermis['account.change_staff']}
                            onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },
        ];
        const { dataCheckPermis, listItemSelected, dataFilter, dropButtonType,
            modalCreate, modalDetail, modalEdit } = this.state;
        const { isLoading, dataStaffs, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['account.delete_staff'] },
            { key: 2, label: 'Khóa', disabled: !dataCheckPermis['account.change_staff'] },
            { key: 3, label: 'Mở', disabled: !dataCheckPermis['account.change_staff'] },
        ];
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <div>
                                <Button hidden
                                    //disabled={!dataCheckPermis['account.add_staff']}
                                    onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlinePlus />
                                        Tạo
                                    </Space>
                                </Button>
                            </div>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên nhân viên !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm hidden
                                        disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button hidden
                                            disabled={!dataCheckPermis['account.delete_staff']}
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
                            <Divider>NHÂN VIÊN - SAPO</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataStaffs} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataCheckPermis['account.add_staff'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalDetail && dataCheckPermis['account.view_staff'] &&
                    <ModalDetail modalDetail={modalDetail}
                        openModal={this.openModal} />}
                {modalEdit && dataCheckPermis['account.change_staff'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataStaffs: state.staff.dataStaffs,
        dataStaff: state.staff.dataStaff,
        dataMeta: state.staff.dataMeta,
        isLoading: state.staff.isLoading,
        isResult: state.staff.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListStaff: (dataFilter) => dispatch(actions.getListStaffRedux(dataFilter)),
        getDataStaff: (id) => dispatch(actions.getDataStaffRedux(id)),
        editListStaff: (id, data) => dispatch(actions.editListStaffRedux(id, data)),
        deleteListStaff: (id) => dispatch(actions.deleteListStaffRedux(id)),
        setDataStaff: (data) => dispatch(actions.setDataStaffRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));