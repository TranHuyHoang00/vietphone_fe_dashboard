import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm, Input,
    Spin, Pagination, Typography, Dropdown, Tag, Image
} from 'antd';
import { AiOutlinePlus } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalCreate from './modals/modalCreate';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataPosts } from '@datas/dataPermissionsOrigin';
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
        const { getListPost, dataUserPermis, isSuperUser } = this.props;
        await getListPost(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataPosts, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
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
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListPost, editListPost, getListPost } = this.props;
        const actions = {
            deleteList: deleteListPost,
            editList: editListPost,
            getList: getListPost
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
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
                render: (title, item) =>
                    <span className='hover:underline' onClick={() => this.props.history.push(`/admin/manager/post/edit/${item.id}`)}>
                        <Typography.Text className='text-[#0574b8] dark:text-white cursor-pointer'>{title}</Typography.Text>
                    </span>,
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
                title: 'Ảnh', dataIndex: 'image', responsive: ['md'], width: 100,
                render: (image) => <>{image && <Image src={image} height={50} width={100} className='object-cover' />}</>
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

        ];
        const { dataCheckPermis, listItemSelected, dataFilter, dropButtonType,
            modalCreate } = this.state;
        const { isLoading, dataPosts, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['post.delete_post'] },
            { key: 2, label: 'Khóa', disabled: !dataCheckPermis['post.change_post'] },
            { key: 3, label: 'Mở', disabled: !dataCheckPermis['post.change_post'] },
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
                            <Button disabled={!dataCheckPermis['post.add_post']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tiêu đề !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataCheckPermis['post.delete_post']}
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
                {modalCreate && dataCheckPermis['post.add_post'] &&
                    <ModalCreate modalCreate={modalCreate}
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

        dataUserPermis: state.user.dataUserPermis,
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