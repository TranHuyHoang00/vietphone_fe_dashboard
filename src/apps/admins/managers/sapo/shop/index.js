import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Image, Dropdown, Tag
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import ModalDetail from './modals/modalDetail';
import ModalEdit from './modals/modalEdit';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataShops } from '@datas/dataPermissionsOrigin';
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
        const { getListShop, dataUserPermis, isSuperUser } = this.props;
        await getListShop(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataShops, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataShop, getDataShop } = this.props;
        const actions = {
            setData: setDataShop,
            getData: getDataShop,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListShop, editListShop, getListShop } = this.props;
        const actions = {
            deleteList: deleteListShop,
            editList: editListShop,
            getList: getListShop
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListShop } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        const result = await compareObjects(newDataFilter, dataFilter);
        if (!result) {
            await getListShop(newDataFilter);
            this.setState({ dataFilter: newDataFilter });
        }
    }
    render() {
        const { Text } = Typography;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'TÊN', dataIndex: 'name',
                render: (name) => <Text strong className='text-[#0574b8] dark:text-white'>{name}</Text>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'ĐỊA CHỈ', dataIndex: 'address', responsive: ['lg'],
                sorter: (a, b) => a.address.localeCompare(b.address),
            },
            {
                title: 'ẢNH', dataIndex: 'image', responsive: ['md'], width: 60,
                render: (image) => <>{image && <Image src={image} height={50} width={50} className='object-cover' />}</>
            },
            {
                title: 'STATUS', dataIndex: 'is_active', width: 70, responsive: ['md'],
                render: (is_active) => <>{is_active ? <Tag color='green'>Mở</Tag> : <Tag color='red'>Khóa</Tag>}</>
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataCheckPermis['shop.view_shop']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                        <button disabled={!dataCheckPermis['shop.change_shop']} onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        const { dataCheckPermis, listItemSelected, dataFilter, dropButtonType,
            modalCreate, modalDetail, modalEdit } = this.state;
        const { isLoading, dataShops, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['shop.delete_shop'] },
            { key: 2, label: 'Khóa', disabled: !dataCheckPermis['shop.change_shop'] },
            { key: 3, label: 'Mở', disabled: !dataCheckPermis['shop.change_shop'] },
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
                            <Button
                                disabled={!dataCheckPermis['shop.add_shop']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên cửa hàng !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter?.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm
                                        disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataCheckPermis['shop.delete_shop']}
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
                            <Divider>CỬA HÀNG</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataShops} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter?.page}
                                    showQuickJumper total={dataMeta?.total * dataMeta?.limit} pageSize={dataFilter?.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataCheckPermis['shop.add_shop'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalDetail && dataCheckPermis['shop.view_shop'] &&
                    <ModalDetail modalDetail={modalDetail}
                        openModal={this.openModal} />}
                {modalEdit && dataCheckPermis['shop.change_shop'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataShops: state.shop.dataShops,
        dataShop: state.shop.dataShop,
        dataMeta: state.shop.dataMeta,
        isLoading: state.shop.isLoading,
        isResult: state.shop.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),
        getDataShop: (id) => dispatch(actions.getDataShopRedux(id)),
        editListShop: (id, data) => dispatch(actions.editListShopRedux(id, data)),
        deleteListShop: (id) => dispatch(actions.deleteListShopRedux(id)),
        setDataShop: (id) => dispatch(actions.setDataShopRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));