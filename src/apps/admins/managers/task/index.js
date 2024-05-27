import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Popconfirm,
    Spin, Pagination, Typography, Dropdown
} from 'antd';
import { AiFillEye } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import ModalDetail from './modals/modalDetail';
import moment from 'moment';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataTasks } from '@datas/dataPermissionsOrigin';
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
        const { getListTask, dataUserPermis, isSuperUser } = this.props;
        await getListTask(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataTasks, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataTask, getDataTask } = this.props;
        const actions = {
            setData: setDataTask,
            getData: getDataTask,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType, dataFilter } = this.state;
        const { deleteListTask, editListTask, getListTask } = this.props;
        const actions = {
            deleteList: deleteListTask,
            editList: editListTask,
            getList: getListTask
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListTask } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListTask(newDataFilter);
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'task_id', responsive: ['sm'],
                sorter: (a, b) => a.task_id - b.task_id,
            },
            {
                title: 'Task_name', dataIndex: 'task_name',
                render: (task_name) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{task_name}</Typography.Text>,
                sorter: (a, b) => a.task_name.localeCompare(b.task_name),
            },
            {
                title: 'Ngày tạo', dataIndex: 'date_done', responsive: ['lg'],
                render: (date_done) => <Typography.Text>{moment(date_done).format('HH:mm DD/MM/YYYY ')}</Typography.Text>,
                sorter: (a, b) => a.date_done - b.date_done,
            },
            {
                title: 'Trạng thái', dataIndex: 'status', responsive: ['md'],
                sorter: (a, b) => a.status.localeCompare(b.status),
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataCheckPermis['task.change_task']} onClick={() => this.openModal('detail', true, item.task_id)}><AiFillEye /></button>
                    </Space >
                ),
            },

        ];
        const { dataCheckPermis, listItemSelected, dataFilter, dropButtonType, modalDetail } = this.state;
        const { isLoading, dataTasks, dataMeta } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['task.delete_task'] },
        ];
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataCheckPermis['task.delete_task']}
                                            menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(parseInt(value.key)) }) } }}  >
                                            <div>
                                                {dropButtonType === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>LỊCH SỬ</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataTasks} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalDetail && dataCheckPermis['task.view_task'] &&
                    <ModalDetail modalDetail={modalDetail} openModal={this.openModal} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTasks: state.task.dataTasks,
        dataTask: state.task.dataTask,
        dataMeta: state.task.dataMeta,
        isLoading: state.task.isLoading,
        isResult: state.task.isResult,

        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTask: (dataFilter) => dispatch(actions.getListTaskRedux(dataFilter)),
        getDataTask: (id) => dispatch(actions.getDataTaskRedux(id)),
        editListRask: (id, data) => dispatch(actions.editListRaskRedux(id, data)),
        deleteListTask: (id) => dispatch(actions.deleteListTaskRedux(id)),
        setDataTask: (id) => dispatch(actions.setDataTaskRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));