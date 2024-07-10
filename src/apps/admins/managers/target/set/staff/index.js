import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown, Card, Collapse
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus, AiFillFilter } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import ModalDetail from './modals/modalDetail';
import ModalEdit from './modals/modalEdit';
import DrawerFilter from './drawers/drawerFilter';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataTargetStaffs } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
import { formatNumber } from '@utils/handleFuncFormat';
import dayjs from 'dayjs';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropButtonType: 1,
            listItemSelected: [],
            modalCreate: false,
            modalEdit: false,
            modalDetail: false,
            drawerFilter: false,
            dataFilter: {
                page: 1,
                limit: 20,
                search: '',
                month: dayjs().startOf('month').format("YYYY-MM-DD"),
            },
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListTargetStaff, dataUserPermis, isSuperUser } = this.props;
        await getListTargetStaff(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataTargetStaffs, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataTargetStaff, getDataTargetStaff } = this.props;
        const actions = {
            setData: setDataTargetStaff,
            getData: getDataTargetStaff,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListTargetStaff, editListTargetStaff, getListTargetStaff } = this.props;
        const actions = {
            deleteList: deleteListTargetStaff,
            editList: editListTargetStaff,
            getList: getListTargetStaff
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
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
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListTargetStaff } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListTargetStaff(newDataFilter);
    }
    render() {
        const { Text } = Typography;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'NHÂN VIÊN', dataIndex: 'staff',
                render: (staff) =>
                    <>
                        <Text strong className='text-[#0574b8] dark:text-white uppercase'>{staff?.name}</Text><br />
                        <Text strong>{staff?.phone_number}</Text>
                    </>,
                sorter: (a, b) => a?.staff?.name.localeCompare(b?.staff?.name),
            },
            {
                title: 'TARGET', dataIndex: 'value',
                render: (value) => <Text >{formatNumber(value)}</Text>,
                sorter: (a, b) => a?.value - b?.value,
            },
            {
                title: 'KPI', dataIndex: 'target_product_category',
                render: (datas) => {
                    return <>
                        {datas && datas.length !== 0 && <Collapse size='small' accordion items={[
                            {
                                key: '1',
                                label: 'Chi tiết',
                                children:
                                    <>
                                        {datas && datas.length !== 0 && datas.map((item) => {
                                            return (
                                                <Card key={item.id} title={`${item?.product_category?.name}`} size='small'>
                                                    <div className='flex items-center justify-between space-x-[5px]'>
                                                        {item?.quantity && <Text>Số lượng : {item?.quantity}</Text>}
                                                        {item?.value && <Text>Doanh thu : {formatNumber(item?.value)}</Text>}
                                                    </div>
                                                </Card>
                                            )
                                        })}
                                    </>,
                            },
                        ]} />
                        }
                    </>
                },
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataCheckPermis['analytic.view_staffmonthlytarget']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                        <button disabled={!dataCheckPermis['analytic.change_staffmonthlytarget']} className='cursor-pointer' onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        const { dataCheckPermis, listItemSelected, dataFilter, dropButtonType,
            modalCreate, modalEdit, drawerFilter, modalDetail } = this.state;
        const { isLoading, dataTargetStaffs, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['analytic.delete_staffmonthlytarget'] },
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
                            <Button disabled={!dataCheckPermis['analytic.add_staffmonthlytarget']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo
                                </Space>
                            </Button>
                            <div>
                                <Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên nhân viên !"
                                    enterButton="Tìm" className='bg-[#0e97ff]' />
                            </div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <Space>
                                    <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                    <Button disabled={!dataCheckPermis['analytic.view_staffmonthlytarget']}
                                        onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                        <Space className='text-white dark:text-black'>
                                            <AiFillFilter />
                                            Lọc
                                        </Space>
                                    </Button>
                                </Space>
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataCheckPermis['analytic.delete_staffmonthlytarget']}
                                            menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(value.key) }) } }}  >
                                            <div>
                                                {dropButtonType === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>TARGET NHÂN VIÊN THÁNG {dayjs(dataFilter?.month).format('MM-YYYY')}</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataTargetStaffs} pagination={false}
                                    size="middle" bordered scroll={{ x: 700 }} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div>
                </Spin>
                {modalCreate && dataCheckPermis['analytic.add_staffmonthlytarget'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} onChangePage={this.onChangePage} />}
                {modalDetail && dataCheckPermis['analytic.view_staffmonthlytarget'] &&
                    <ModalDetail modalDetail={modalDetail}
                        openModal={this.openModal} />}
                {modalEdit && dataCheckPermis['analytic.change_staffmonthlytarget'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {drawerFilter && dataCheckPermis['analytic.view_staffmonthlytarget'] &&
                    <DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        onChangePage={this.onChangePage} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTargetStaffs: state.targetStaff.dataTargetStaffs,
        dataTargetStaff: state.targetStaff.dataTargetStaff,
        dataMeta: state.targetStaff.dataMeta,
        isLoading: state.targetStaff.isLoading,
        isResult: state.targetStaff.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTargetStaff: (dataFilter) => dispatch(actions.getListTargetStaffRedux(dataFilter)),
        getDataTargetStaff: (id) => dispatch(actions.getDataTargetStaffRedux(id)),
        editListTargetStaff: (id, data) => dispatch(actions.editListTargetStaffRedux(id, data)),
        deleteListTargetStaff: (id) => dispatch(actions.deleteListTargetStaffRedux(id)),
        setDataTargetStaff: (data) => dispatch(actions.setDataTargetStaffRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));