import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown, Card
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus, AiFillFilter } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import ModalDetail from './modals/modalDetail';
import ModalEdit from './modals/modalEdit';
import DrawerFilter from './drawers/drawerFilter';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataTargetShops } from '@datas/dataPermissionsOrigin';
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
        const { getListTargetShop, dataUserPermis, isSuperUser } = this.props;
        await getListTargetShop(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataTargetShops, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataTargetShop, getDataTargetShop } = this.props;
        const actions = {
            setData: setDataTargetShop,
            getData: getDataTargetShop,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListTargetShop, editListTargetShop, getListTargetShop } = this.props;
        const actions = {
            deleteList: deleteListTargetShop,
            editList: editListTargetShop,
            getList: getListTargetShop
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
        const { getListTargetShop } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListTargetShop(newDataFilter);
    }
    render() {
        const { Text } = Typography;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'CỬA HÀNG', dataIndex: ['shop', 'name'],
                render: (value) => <Text strong className='text-[#0574b8] dark:text-white uppercase'>{value}</Text>,
                sorter: (a, b) => a?.shop?.name.localeCompare(b?.shop?.name),
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
                    </>
                },
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataCheckPermis['analytic.view_shopmonthlytarget']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                        <button disabled={!dataCheckPermis['analytic.change_shopmonthlytarget']} className='cursor-pointer' onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        const { dataCheckPermis, listItemSelected, dataFilter, dropButtonType,
            modalCreate, modalEdit, drawerFilter, modalDetail } = this.state;
        const { isLoading, dataTargetShops, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['analytic.delete_shopmonthlytarget'] },
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
                            <Button disabled={!dataCheckPermis['analytic.add_shopmonthlytarget']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo
                                </Space>
                            </Button>
                            <div>
                                <Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên cửa hàng !"
                                    enterButton="Tìm" className='bg-[#0e97ff]' />
                            </div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <Space>
                                    <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                    <Button disabled={!dataCheckPermis['analytic.view_shopmonthlytarget']}
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
                                            disabled={!dataCheckPermis['analytic.delete_shopmonthlytarget']}
                                            menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(value.key) }) } }}  >
                                            <div>
                                                {dropButtonType === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>TARGET CỬA HÀNG THÁNG {dayjs(dataFilter?.month).format('MM-YYYY')}</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataTargetShops} pagination={false}
                                    size="middle" bordered scroll={{ x: 700 }} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div>
                </Spin>
                {modalCreate && dataCheckPermis['analytic.add_shopmonthlytarget'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} onChangePage={this.onChangePage} />}
                {modalDetail && dataCheckPermis['analytic.view_shopmonthlytarget'] &&
                    <ModalDetail modalDetail={modalDetail}
                        openModal={this.openModal} />}
                {modalEdit && dataCheckPermis['analytic.change_shopmonthlytarget'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {drawerFilter && dataCheckPermis['analytic.view_shopmonthlytarget'] &&
                    <DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        onChangePage={this.onChangePage} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTargetShops: state.targetShop.dataTargetShops,
        dataTargetShop: state.targetShop.dataTargetShop,
        dataMeta: state.targetShop.dataMeta,
        isLoading: state.targetShop.isLoading,
        isResult: state.targetShop.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTargetShop: (dataFilter) => dispatch(actions.getListTargetShopRedux(dataFilter)),
        getDataTargetShop: (id) => dispatch(actions.getDataTargetShopRedux(id)),
        editListTargetShop: (id, data) => dispatch(actions.editListTargetShopRedux(id, data)),
        deleteListTargetShop: (id) => dispatch(actions.deleteListTargetShopRedux(id)),
        setDataTargetShop: (data) => dispatch(actions.setDataTargetShopRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));