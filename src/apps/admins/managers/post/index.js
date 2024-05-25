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
import { dataPosts } from '@datas/dataPermissionsOrigin';
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
        const { getListPost, dataUserPermissions, isSuperUser } = this.props;
        await getListPost(dataFilter);
        const dataPermissionsAfterCheck = await handleCheckPermission(dataPosts, dataUserPermissions, isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataPost, getDataPost } = this.props;
        const actions = {
            setData: setDataPost,
            getData: getDataPost,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, typeItemDropButton, dataFilter } = this.state;
        const { deleteListPost, editListPost, getListPost } = this.props;
        const actions = {
            deleteList: deleteListPost,
            editList: editListPost,
            getList: getListPost
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(typeItemDropButton, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListPost } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListPost(newDataFilter);
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
                title: 'Slug', dataIndex: 'slug', responsive: ['md'],
                sorter: (a, b) => a.slug.localeCompare(b.slug),
            },
            {
                title: 'Loại bài viết', dataIndex: 'category', responsive: ['sm'],
                render: (category) => <Typography.Text >{category.title}</Typography.Text>,
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataPermissionsAfterCheck['post.change_post']} className='cursor-pointer' onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        const { dataPermissionsAfterCheck, listItemSelected, dataFilter, typeItemDropButton,
            modalCreate, modalEdit } = this.state;
        const { isLoading, dataPosts, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataPermissionsAfterCheck['post.delete_post'] },
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
                            <Button disabled={!dataPermissionsAfterCheck['post.add_post']}
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
                                        <Dropdown.Button
                                            disabled={!dataPermissionsAfterCheck['post.delete_post']}
                                            menu={{ items, onClick: (value) => { this.setState({ typeItemDropButton: parseInt(value.key) }) } }}  >
                                            <div>
                                                {typeItemDropButton === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>BÀI VIẾT</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataPosts} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataPermissionsAfterCheck['post.add_post'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalEdit && dataPermissionsAfterCheck['post.change_post'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataPosts: state.post.dataPosts,
        dataPost: state.post.dataPost,
        dataMeta: state.post.dataMeta,
        isLoading: state.post.isLoading,
        isResult: state.post.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListPost: (dataFilter) => dispatch(actions.getListPostRedux(dataFilter)),
        getDataPost: (id) => dispatch(actions.getDataPostRedux(id)),
        editListPost: (id, data) => dispatch(actions.editListPostRedux(id, data)),
        deleteListPost: (id) => dispatch(actions.deleteListPostRedux(id)),
        setDataPost: (id) => dispatch(actions.setDataPostRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));