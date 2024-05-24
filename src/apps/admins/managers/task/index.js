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
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { data_tasks } from '@datas/dataPermissionsOrigin';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeItemDropButton: 1,
            listItemSelected: [],
            modalDetail: false,
            dataFilter: {
                page: 1,
                limit: 5,
                search: ''
            },
            dataPermissionsAfterCheck: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_task(this.state.dataFilter);
        let dataPermissionsAfterCheck = await handleCheckPermission(data_tasks, this.props.dataUserPermissions, this.props.isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (name, value, id) => {
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modalDetail: value, data_task: {} });
            } else {
                this.setState({ modalDetail: value });
                await this.props.get_task(id);
            }
        }
    }
    funcDropButtonHeaderOfTable = async () => {
        let listItemSelected = this.state.listItemSelected;
        if (this.state.typeItemDropButton === 1) { await this.props.delete_list_task(listItemSelected); }
        await this.props.get_list_task(this.state.dataFilter);
        if (this.state.typeItemDropButton === 1) { this.setState({ listItemSelected: [] }); }
    }
    onChangePage = async (value, type) => {
        let dataFilter = this.state.dataFilter;
        if (type === 'limit') { dataFilter.limit = value; }
        if (type === 'page') { dataFilter.page = value; }
        if (type === 'search') { dataFilter.search = value; dataFilter.page = 1; }
        this.setState({ dataFilter: dataFilter })
        await this.props.get_list_task(dataFilter);
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
                        <button disabled={!dataPermissionsAfterCheck['task.change_task']} onClick={() => this.openModal('detail', true, item.task_id)}><AiFillEye /></button>
                    </Space >
                ),
            },

        ];
        let dataPermissionsAfterCheck = this.state.dataPermissionsAfterCheck;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataPermissionsAfterCheck['task.delete_task'] },
        ];
        const listItemSelected = this.state.listItemSelected;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        let dataFilter = this.state.dataFilter;
        let typeItemDropButton = this.state.typeItemDropButton;
        return (
            <>
                <Spin size='large' spinning={this.props.isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataPermissionsAfterCheck['task.delete_task']}
                                            menu={{ items, onClick: (value) => { this.setState({ typeItemDropButton: parseInt(parseInt(value.key)) }) } }}  >
                                            <div>
                                                {typeItemDropButton === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>LỊCH SỬ</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_tasks} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={this.props.dataMeta.total * this.props.dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modalDetail && dataPermissionsAfterCheck['task.view_task'] &&
                    <ModalDetail modalDetail={this.state.modalDetail}
                        openModal={this.openModal} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_tasks: state.task.data_tasks,
        data_task: state.task.data_task,
        dataMeta: state.task.dataMeta,
        isLoading: state.task.isLoading,
        isResult: state.task.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_task: (dataFilter) => dispatch(actions.get_list_task_redux(dataFilter)),
        get_task: (id) => dispatch(actions.get_task_redux(id)),
        edit_list_task: (id, data) => dispatch(actions.edit_list_task_redux(id, data)),
        delete_list_task: (id) => dispatch(actions.delete_list_task_redux(id)),
        set_data_task: (id) => dispatch(actions.set_data_task_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));