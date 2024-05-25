import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown, Tag
} from 'antd';
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import ModalEdit from './modals/modalEdit';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { dataVariantAttributeGroups } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropButtonType: 1,
            listItemSelected: [],
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
        const { getListVariantAttributeGroup, dataUserPermissions, isSuperUser } = this.props;
        await getListVariantAttributeGroup(dataFilter);
        const dataPermissionsAfterCheck = await handleCheckPermission(dataVariantAttributeGroups, dataUserPermissions, isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataVariantAttributeGroup, getDataVariantAttributeGroup } = this.props;
        const actions = {
            setData: setDataVariantAttributeGroup,
            getData: getDataVariantAttributeGroup,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListVariantAttributeGroup, editListVariantAttributeGroup, getListVariantAttributeGroup } = this.props;
        const actions = {
            deleteList: deleteListVariantAttributeGroup,
            editList: editListVariantAttributeGroup,
            getList: getListVariantAttributeGroup
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListVariantAttributeGroup } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListVariantAttributeGroup(newDataFilter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Tên TS-SP', dataIndex: 'name',
                render: (name) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{name}</Typography.Text>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Thông số', dataIndex: 'attribute', responsive: ['md'],
                render: (attribute) =>
                    <>
                        {(attribute && attribute.length !== 0) ?
                            <>
                                {attribute && attribute.map((item, index) => {
                                    return (
                                        <Tag key={item.id} color='blue'>{item.name}</Tag>
                                    )
                                })}
                            </>
                            :
                            <span></span>
                        }
                    </>
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataPermissionsAfterCheck['product.change_variantattributegroup']} className='cursor-pointer' onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        const { dataPermissionsAfterCheck, listItemSelected, dataFilter, dropButtonType,
            modalCreate, modalEdit } = this.state;
        const { isLoading, dataVariantAttributeGroups, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataPermissionsAfterCheck['product.delete_variantattributegroup'] },
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
                            <Button disabled={!dataPermissionsAfterCheck['product.add_variantattributegroup']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên TS-SP!" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataPermissionsAfterCheck['product.delete_variantattributegroup']}
                                            menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(value.key) }) } }}  >
                                            <div>
                                                {dropButtonType === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>LOẠI TS-SP</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataVariantAttributeGroups} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataPermissionsAfterCheck['product.add_variantattributegroup'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalEdit && dataPermissionsAfterCheck['product.change_variantattributegroup'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataVariantAttributeGroups: state.variant_attribute_group.dataVariantAttributeGroups,
        dataVariantAttributeGroup: state.variant_attribute_group.dataVariantAttributeGroup,
        dataMeta: state.variant_attribute_group.dataMeta,
        isLoading: state.variant_attribute_group.isLoading,
        isResult: state.variant_attribute_group.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListVariantAttributeGroup: (dataFilter) => dispatch(actions.getListVariantAttributeGroupRedux(dataFilter)),
        getDataVariantAttributeGroup: (id) => dispatch(actions.getDataVariantAttributeGroupRedux(id)),
        editListVariantAttributeGroup: (id, data) => dispatch(actions.editListVariantAttributeGroupRedux(id, data)),
        deleteListVariantAttributeGroup: (id) => dispatch(actions.deleteListVariantAttributeGroupRedux(id)),
        setDataVariantAttributeGroup: (id) => dispatch(actions.setDataVariantAttributeGroupRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));