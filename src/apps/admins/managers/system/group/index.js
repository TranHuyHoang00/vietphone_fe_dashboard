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
        }
    }
    async componentDidMount() {
        const { dataFilter } = this.state;
        const { getListGroup } = this.props;
        await getListGroup(dataFilter);
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataGroup, getDataGroup } = this.props;
        const actions = {
            setData: setDataGroup,
            getData: getDataGroup,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListGroup, editListGroup, getListGroup } = this.props;
        const actions = {
            deleteList: deleteListGroup,
            editList: editListGroup,
            getList: getListGroup
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListGroup } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListGroup(newDataFilter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'TÊN', dataIndex: 'name',
                render: (name) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{name}</Typography.Text>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <span className='cursor-pointer' onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </span>
                    </Space >
                ),
            },

        ];
        const { listItemSelected, dataFilter, dropButtonType,
            modalCreate, modalEdit } = this.state;
        const { isLoading, dataGroups, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa' },
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
                            <Button onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên quyền !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button disabled menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(value.key) }) } }}  >
                                            <div>
                                                {dropButtonType === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>PHÂN QUYỀN</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataGroups} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalEdit &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataGroups: state.group.dataGroups,
        dataGroup: state.group.dataGroup,
        dataMeta: state.group.dataMeta,
        isLoading: state.group.isLoading,
        isResult: state.group.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListGroup: (dataFilter) => dispatch(actions.getListGroupRedux(dataFilter)),
        getDataGroup: (id) => dispatch(actions.getDataGroupRedux(id)),
        editListGroup: (id, data) => dispatch(actions.editListGroupRedux(id, data)),
        deleteListGroup: (id) => dispatch(actions.deleteListGroupRedux(id)),
        setDataGroup: (id) => dispatch(actions.setDataGroupRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));