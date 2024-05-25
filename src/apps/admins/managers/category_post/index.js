import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown
} from 'antd';
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import ModalEdit from './modals/modalEdit';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { dataCategoryPosts } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeItemDropButton: 1,
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
        const { getListCategoryPost, dataUserPermissions, isSuperUser } = this.props;
        await getListCategoryPost(dataFilter);
        const dataPermissionsAfterCheck = await handleCheckPermission(dataCategoryPosts, dataUserPermissions, isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataCategoryPost, getDataCategoryPost } = this.props;
        const actions = {
            setData: setDataCategoryPost,
            getData: getDataCategoryPost,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, typeItemDropButton, dataFilter } = this.state;
        const { deleteListCategoryPost, editListCategoryPost, getListCategoryPost } = this.props;
        const actions = {
            deleteList: deleteListCategoryPost,
            editList: editListCategoryPost,
            getList: getListCategoryPost
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(typeItemDropButton, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListCategoryPost } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListCategoryPost(newDataFilter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Tiêu đề', dataIndex: 'title',
                render: (title) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{title}</Typography.Text>,
                sorter: (a, b) => a.title.localeCompare(b.title),
            },
            {
                title: 'Slug', dataIndex: 'slug',
                sorter: (a, b) => a.slug.localeCompare(b.slug),
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataPermissionsAfterCheck['post.add_category']} onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        const { dataPermissionsAfterCheck, listItemSelected, dataFilter, typeItemDropButton,
            modalCreate, modalEdit } = this.state;
        const { isLoading, dataCategoryPosts, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataPermissionsAfterCheck['post.delete_category'] },
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
                            <Button disabled={!dataPermissionsAfterCheck['post.add_category']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tiêu đề !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button disabled={!dataPermissionsAfterCheck['post.delete_category']}
                                            menu={{ items, onClick: (value) => { this.setState({ typeItemDropButton: parseInt(value.key) }) } }}  >
                                            <div>
                                                {typeItemDropButton === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>LOẠI BÀI VIẾT</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataCategoryPosts} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataPermissionsAfterCheck['post.add_category'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalEdit && dataPermissionsAfterCheck['post.change_category'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataCategoryPosts: state.category_post.dataCategoryPosts,
        dataCategoryPost: state.category_post.dataCategoryPost,
        dataMeta: state.category_post.dataMeta,
        isLoading: state.category_post.isLoading,
        isResult: state.category_post.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListCategoryPost: (dataFilter) => dispatch(actions.getListCategoryPostRedux(dataFilter)),
        getDataCategoryPost: (id) => dispatch(actions.getDataCategoryPostRedux(id)),
        editListCategoryPost: (id, data) => dispatch(actions.editListCategoryPostRedux(id, data)),
        deleteListCategoryPost: (id) => dispatch(actions.deleteListCategoryPostRedux(id)),
        setDataCategoryPost: (id) => dispatch(actions.setDataCategoryPostRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));