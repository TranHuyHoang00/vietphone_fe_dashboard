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
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { dataCategorys } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeItemDropButton: 1,
            listItemSelected: [],
            modalDetail: false,
            modalCreate: false,
            modalEdit: false,
            dataFilter: {
                page: 1,
                limit: 5,
                search: ''
            },
            dataPermissionsAfterCheck: {},
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListCategory, dataUserPermissions, isSuperUser } = this.props;
        await getListCategory(dataFilter);
        const dataPermissionsAfterCheck = await handleCheckPermission(dataCategorys, dataUserPermissions, isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataCategory, getDataCategory } = this.props;
        const actions = {
            setData: setDataCategory,
            getData: getDataCategory,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, typeItemDropButton, dataFilter } = this.state;
        const { deleteListCategory, editListCategory, getListCategory } = this.props;
        const actions = {
            deleteList: deleteListCategory,
            editList: editListCategory,
            getList: getListCategory
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(typeItemDropButton, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListCategory } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListCategory(newDataFilter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Tên', dataIndex: 'name',
                render: (name) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{name}</Typography.Text>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Icon', dataIndex: 'icon', responsive: ['lg'],
            },
            {
                title: 'Ảnh', dataIndex: 'image', responsive: ['xl'], width: 60,
                render: (image) => <Image src={image} height={50} width={50} className='object-cover' />
            },
            {
                title: 'Status', dataIndex: 'is_active', width: 70, responsive: ['md'],
                render: (is_active) =>
                    <div className='flex items-center justify-start'>
                        {is_active ?
                            <Tag color='green'>Mở</Tag>
                            :
                            <Tag color='red'>Khóa</Tag>
                        }
                    </div>
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataPermissionsAfterCheck['product.view_category']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                        <button disabled={!dataPermissionsAfterCheck['product.change_category']} onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        const { dataPermissionsAfterCheck, listItemSelected, dataFilter, typeItemDropButton,
            modalCreate, modalDetail, modalEdit } = this.state;
        const { isLoading, dataCategorys, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataPermissionsAfterCheck['product.delete_category'] },
            { key: 2, label: 'Khóa', disabled: !dataPermissionsAfterCheck['product.change_category'] },
            { key: 3, label: 'Mở', disabled: !dataPermissionsAfterCheck['product.change_category'] },
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
                            <Button disabled={!dataPermissionsAfterCheck['product.add_category']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên danh mục !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataPermissionsAfterCheck['product.delete_category']}
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
                            <Divider>DANH MỤC</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataCategorys} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataPermissionsAfterCheck['product.add_category'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalDetail && dataPermissionsAfterCheck['product.view_category'] &&
                    <ModalDetail modalDetail={modalDetail}
                        openModal={this.openModal} />}
                {modalEdit && dataPermissionsAfterCheck['product.change_category'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataCategorys: state.category.dataCategorys,
        dataCategory: state.category.dataCategory,
        dataMeta: state.category.dataMeta,
        isLoading: state.category.isLoading,
        isResult: state.category.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListCategory: (dataFilter) => dispatch(actions.getListCategoryRedux(dataFilter)),
        getDataCategory: (id) => dispatch(actions.getDataCategoryRedux(id)),
        editListCategory: (id, data) => dispatch(actions.editListCategoryRedux(id, data)),
        deleteListCategory: (id) => dispatch(actions.deleteListCategoryRedux(id)),
        setDataCategory: (id) => dispatch(actions.setDataCategoryRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));