import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown, Tag
} from 'antd';
import { AiFillEdit, AiFillEye, AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import ModalDetail from './modals/modalDetail';
import ModalEdit from './modals/modalEdit';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataProductCategorys } from '@datas/dataPermissionsOrigin';
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
        const { getListProductCategory, dataUserPermis, isSuperUser } = this.props;
        await getListProductCategory(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataProductCategorys, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataProductCategory, getDataProductCategory } = this.props;
        const actions = {
            setData: setDataProductCategory,
            getData: getDataProductCategory,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListProductCategory, editListProductCategory, getListProductCategory } = this.props;
        const actions = {
            deleteList: deleteListProductCategory,
            editList: editListProductCategory,
            getList: getListProductCategory
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListProductCategory } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListProductCategory(newDataFilter);
    }
    render() {
        const { Text } = Typography;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'CODE', dataIndex: 'code', responsive: ['md'],
                sorter: (a, b) => a.code.localeCompare(b.code),
            },
            {
                title: 'TÊN', dataIndex: 'name',
                render: (name) => {
                    return { children: <Text strong className='text-[#0574b8] dark:text-white'>{name}</Text> }
                },
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'STATUS', dataIndex: 'is_active', width: 70, responsive: ['md'],
                render: (is_active) => <>{is_active ? <Tag color='green'>Mở</Tag> : <Tag color='red'>Khóa</Tag>}</>
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataCheckPermis['product.view_sapoproductcategory']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                        <button disabled={!dataCheckPermis['product.change_sapoproductcategory']} onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },
        ];
        const { dataCheckPermis, listItemSelected, dataFilter, dropButtonType,
            modalCreate, modalDetail, modalEdit } = this.state;
        const { isLoading, dataProductCategorys, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['product.delete_sapoproductcategory'] },
            { key: 2, label: 'Khóa', disabled: !dataCheckPermis['product.change_sapoproductcategory'] },
            { key: 3, label: 'Mở', disabled: !dataCheckPermis['product.change_sapoproductcategory'] },
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
                                disabled={!dataCheckPermis['product.add_sapoproductcategory']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên loại danh mục !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm
                                        disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataCheckPermis['product.delete_sapoproductcategory']}
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
                            <Divider>LOẠI SẢN PHẨM - SAPO</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataProductCategorys} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataCheckPermis['product.add_sapoproductcategory'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalDetail && dataCheckPermis['product.view_sapoproductcategory'] &&
                    <ModalDetail modalDetail={modalDetail}
                        openModal={this.openModal} />}
                {modalEdit && dataCheckPermis['product.change_sapoproductcategory'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataProductCategorys: state.productCategory.dataProductCategorys,
        dataProductCategory: state.productCategory.dataProductCategory,
        dataMeta: state.productCategory.dataMeta,
        isLoading: state.productCategory.isLoading,
        isResult: state.productCategory.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),
        getDataProductCategory: (id) => dispatch(actions.getDataProductCategoryRedux(id)),
        editListProductCategory: (id, data) => dispatch(actions.editListProductCategoryRedux(id, data)),
        deleteListProductCategory: (id) => dispatch(actions.deleteListProductCategoryRedux(id)),
        setDataProductCategory: (id) => dispatch(actions.setDataProductCategoryRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));