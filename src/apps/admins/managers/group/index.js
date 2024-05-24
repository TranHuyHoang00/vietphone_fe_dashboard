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
        }
    }
    async componentDidMount() {
        this.props.get_list_group(this.state.dataFilter);
    }
    openModal = async (name, value, id) => {
        this.props.set_data_group({});
        if (name === 'create') {
            this.setState({ modalCreate: value });
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modalEdit: value, data_group: {} });
            } else {
                this.setState({ modalEdit: value });
                await this.props.get_group(id);
            }
        }
    }
    funcDropButtonHeaderOfTable = async () => {
        let listItemSelected = this.state.listItemSelected;
        if (this.state.typeItemDropButton === 1) { await this.props.delete_list_group(listItemSelected); }
        await this.props.get_list_group(this.state.dataFilter);
        if (this.state.typeItemDropButton === 1) { this.setState({ listItemSelected: [] }); }
    }
    onChangePage = async (value, type) => {
        let dataFilter = this.state.dataFilter;
        if (type === 'limit') { dataFilter.limit = value; }
        if (type === 'page') { dataFilter.page = value; }
        if (type === 'search') { dataFilter.search = value; dataFilter.page = 1; }
        this.setState({ dataFilter: dataFilter })
        await this.props.get_list_group(dataFilter);
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
        const items = [
            { key: 1, label: 'Xóa' },
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
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên quyền !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button disabled menu={{ items, onClick: (value) => { this.setState({ typeItemDropButton: parseInt(value.key) }) } }}  >
                                            <div>
                                                {typeItemDropButton === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>PHÂN QUYỀN</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_groups} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={this.props.dataMeta.total * this.props.dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modalCreate &&
                    <ModalCreate modalCreate={this.state.modalCreate}
                        openModal={this.openModal}
                        dataFilter={this.state.dataFilter} />}
                {this.state.modalEdit &&
                    <ModalEdit modalEdit={this.state.modalEdit}
                        openModal={this.openModal}
                        dataFilter={this.state.dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_groups: state.group.data_groups,
        data_group: state.group.data_group,
        dataMeta: state.group.dataMeta,
        isLoading: state.group.isLoading,
        isResult: state.group.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_group: (dataFilter) => dispatch(actions.get_list_group_redux(dataFilter)),
        get_group: (id) => dispatch(actions.get_group_redux(id)),
        edit_list_group: (id, data) => dispatch(actions.edit_list_group_redux(id, data)),
        delete_list_group: (id) => dispatch(actions.delete_list_group_redux(id)),
        set_data_group: (id) => dispatch(actions.set_data_group_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));