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
import moment from 'moment';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { data_flash_sales } from '@datas/dataPermissionsOrigin';
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
        this.props.get_list_flash_sale(this.state.dataFilter);
        let dataPermissionsAfterCheck = await handleCheckPermission(data_flash_sales, this.props.dataUserPermissions, this.props.isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (name, value, id) => {
        this.props.set_data_flash_sale({});
        if (name === 'create') {
            this.setState({ modalCreate: value });
        }
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modalDetail: value, data_flash_sale: {} });
            } else {
                this.setState({ modalDetail: value });
                await this.props.get_flash_sale(id);
            }
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modalEdit: value, data_flash_sale: {} });
            } else {
                this.setState({ modalEdit: value });
                await this.props.get_flash_sale(id);
            }
        }
    }
    funcDropButtonHeaderOfTable = async () => {
        let listItemSelected = this.state.listItemSelected;
        if (this.state.typeItemDropButton === 1) { await this.props.delete_list_flash_sale(listItemSelected); }
        if (this.state.typeItemDropButton === 2) { await this.props.edit_list_flash_sale(listItemSelected, { is_active: false }); }
        if (this.state.typeItemDropButton === 3) { await this.props.edit_list_flash_sale(listItemSelected, { is_active: true }); }
        await this.props.get_list_flash_sale(this.state.dataFilter);
        if (this.state.typeItemDropButton === 1) { this.setState({ listItemSelected: [] }); }
    }
    onChangePage = async (value, type) => {
        let dataFilter = this.state.dataFilter;
        if (type === 'limit') { dataFilter.limit = value; }
        if (type === 'page') { dataFilter.page = value; }
        if (type === 'search') { dataFilter.search = value; dataFilter.page = 1; }
        this.setState({ dataFilter: dataFilter })
        await this.props.get_list_flash_sale(dataFilter);
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
                title: 'Ngày BĐ', dataIndex: 'start_time', responsive: ['md'],
                render: (start_time) => <Typography.Text>{moment(start_time).format('HH:mm DD/MM/YYYY ')}</Typography.Text>,
            },
            {
                title: 'Ngày KT', dataIndex: 'end_time', responsive: ['md'],
                render: (end_time) => <Typography.Text>{moment(end_time).format('HH:mm DD/MM/YYYY ')}</Typography.Text>,
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
                        <button disabled={!dataPermissionsAfterCheck['promotion.view_flashsale']} onClick={() => this.openModal('detail', true, item.id)}><AiFillEye /></button>
                        <button disabled={!dataPermissionsAfterCheck['promotion.change_flashsale']} onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },

        ];
        let dataPermissionsAfterCheck = this.state.dataPermissionsAfterCheck;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataPermissionsAfterCheck['promotion.delete_flashsale'] },
            { key: 2, label: 'Khóa', disabled: !dataPermissionsAfterCheck['promotion.change_flashsale'] },
            { key: 3, label: 'Mở', disabled: !dataPermissionsAfterCheck['promotion.change_flashsale'] },
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
                            <Button disabled={!dataPermissionsAfterCheck['promotion.add_flashsale']}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Tạo mới
                                </Space>
                            </Button>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên flash_sale!" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataPermissionsAfterCheck['promotion.delete_flashsale']}
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
                            <Divider>FLASH SALE</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_flash_sales} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={this.props.dataMeta.total * this.props.dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modalCreate && dataPermissionsAfterCheck['promotion.add_flashsale'] &&
                    <ModalCreate modalCreate={this.state.modalCreate}
                        openModal={this.openModal}
                        dataFilter={this.state.dataFilter} />}
                {this.state.modalDetail && dataPermissionsAfterCheck['promotion.view_flashsale'] &&
                    <ModalDetail modalDetail={this.state.modalDetail}
                        openModal={this.openModal} />}
                {this.state.modalEdit && dataPermissionsAfterCheck['promotion.change_flashsale'] &&
                    <ModalEdit modalEdit={this.state.modalEdit}
                        openModal={this.openModal}
                        dataFilter={this.state.dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_flash_sales: state.flash_sale.data_flash_sales,
        data_flash_sale: state.flash_sale.data_flash_sale,
        dataMeta: state.flash_sale.dataMeta,
        isLoading: state.flash_sale.isLoading,
        isResult: state.flash_sale.isResult,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_flash_sale: (dataFilter) => dispatch(actions.get_list_flash_sale_redux(dataFilter)),
        get_flash_sale: (id) => dispatch(actions.get_flash_sale_redux(id)),
        edit_list_flash_sale: (id, data) => dispatch(actions.edit_list_flash_sale_redux(id, data)),
        delete_list_flash_sale: (id) => dispatch(actions.delete_list_flash_sale_redux(id)),
        set_data_flash_sale: (id) => dispatch(actions.set_data_flash_sale_redux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));