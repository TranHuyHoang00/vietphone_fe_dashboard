import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Input, Table, Divider, Spin, Pagination, Typography, } from 'antd';
import ModalFooter from '@components/modal/modalFooter';
import FormSelectPage from '@components/selects/formSelectPage';
import { handleOnChangePage } from '@utils/handleFuncPage';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropButtonType: 1,
            listItemSelected: [],
            dataFilter: {
                page: 1,
                limit: 5,
                search: ''
            },
        }
    }
    async componentDidMount() {
        const { getListVariant } = this.props;
        const { dataFilter } = this.state;
        getListVariant(dataFilter);
    }
    handleCreate = async () => {
        const { dataFlashSale, createListFlashSaleItem, getDataFlashSale, openModal } = this.props;
        const { listItemSelected } = this.state;
        await createListFlashSaleItem(dataFlashSale.id, listItemSelected);
        await getDataFlashSale(dataFlashSale.id);
        openModal("create", false);
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListVariant } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);
        this.setState({ dataFilter: newDataFilter });
        await getListVariant(newDataFilter);
    }
    render() {
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
        const { isLoading, modalCreate, openModal, dataMeta, dataVariants } = this.props;
        const { listItemSelected, dataFilter } = this.state;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (

            <Modal title="THÊM MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={900}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <div><Input.Search onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên sản phẩm !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                            </div>
                            <Divider>SẢN PHẨM</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataVariants} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
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
        dataVariants: state.variant.dataVariants,
        dataMeta: state.variant.dataMeta,
        isLoading: state.variant.isLoading,
        dataFlashSale: state.flash_sale.dataFlashSale,
        isResult: state.flash_sale_item.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDataFlashSale: (id) => dispatch(actions.getDataFlashSaleRedux(id)),
        getListVariant: (dataFilter) => dispatch(actions.getListVariantRedux(dataFilter)),
        createListFlashSaleItem: (id, data) => dispatch(actions.createListFlashSaleItemRedux(id, data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));