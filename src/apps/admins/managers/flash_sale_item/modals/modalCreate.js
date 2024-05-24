import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Modal, Input, Table, Divider, Popconfirm,
    Spin, Pagination, Typography, Dropdown,
} from 'antd';
import ModalFooter from '@components/modal/modalFooter';
import FormSelectPage from '@components/selects/formSelectPage';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeItemDropButton: 1,
            listItemSelected: [],
            dataFilter: {
                page: 1,
                limit: 5,
                search: ''
            },
        }
    }
    async componentDidMount() {
        this.props.get_list_variant(this.state.dataFilter);
    }
    funcDropButtonHeaderOfTable = async () => {
        let listItemSelected = this.state.listItemSelected;
        let data_flash_sale = this.props.data_flash_sale;
        if (this.state.typeItemDropButton === 1) {
            if (data_flash_sale.id) {
                await this.props.create_list_flash_sale_item(data_flash_sale.id, listItemSelected);
            }
        }
        if (this.props.isResult) {
            await this.props.get_flash_sale(data_flash_sale.id);
            this.props.openModal("create", false);
            if (this.state.typeItemDropButton === 1) { this.setState({ listItemSelected: [] }); }
        }
    }
    onChangePage = async (value, type) => {
        let dataFilter = this.state.dataFilter;
        if (type === 'limit') { dataFilter.limit = value; }
        if (type === 'page') { dataFilter.page = value; }
        if (type === 'search') { dataFilter.search = value; dataFilter.page = 1; }
        this.setState({ dataFilter: dataFilter })
        await this.props.get_list_variant(dataFilter);
    }
    render() {
        let isLoading = this.props.isLoading;
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Tên sản phẩm', dataIndex: 'name',
                render: (name) => <Typography.Text className='text-[#0574b8] dark:text-white'>{name}</Typography.Text>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
        ];
        const items = [
            { key: 1, label: 'Thêm' },
        ];
        const listItemSelected = this.state.listItemSelected;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        let typeItemDropButton = this.state.typeItemDropButton;
        return (

            <Modal title="THÊM MỚI" open={this.props.modalCreate}
                onCancel={() => this.props.openModal("create", false)} width={900}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.funcDropButtonHeaderOfTable} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên sản phẩm !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={this.state.dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button menu={{ items, onClick: (value) => { this.setState({ typeItemDropButton: parseInt(value.key) }) } }}  >
                                            <div>
                                                {typeItemDropButton === 1 && <span>Thêm</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>SẢN PHẨM</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={this.props.data_variants} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={this.state.dataFilter.page}
                                    showQuickJumper total={this.props.dataMeta.total * this.props.dataMeta.limit} pageSize={this.state.dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_variants: state.variant.data_variants,
        dataMeta: state.variant.dataMeta,
        isLoading: state.variant.isLoading,
        data_flash_sale: state.flash_sale.data_flash_sale,
        isResult: state.flash_sale_item.isResult,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_flash_sale: (id) => dispatch(actions.get_flash_sale_redux(id)),
        get_list_variant: (dataFilter) => dispatch(actions.get_list_variant_redux(dataFilter)),
        create_list_flash_sale_item: (id, list_it) => dispatch(actions.create_list_flash_sale_item_redux(id, list_it)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));