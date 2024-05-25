import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Popconfirm,
    Spin, Typography, Dropdown, Image
} from 'antd';
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import ModalCreate from './modals/modalCreate';
import ModalEdit from './modals/modalEdit';
import FormSelectSingle from '@components/selects/formSelectSingle';
import { formatMoney } from '@utils/handleFuncFormat';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataFlashSaleItems } from '@datas/dataPermissionsOrigin';
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
            modalEdit: false,
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
        const { getListFlashSale, dataUserPermis, isSuperUser } = this.props;
        await getListFlashSale(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataFlashSaleItems, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataFlashSaleItem, getDataFlashSaleItem } = this.props;
        const actions = {
            setData: setDataFlashSaleItem,
            getData: getDataFlashSaleItem,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType } = this.state;
        const { deleteListFlashSaleItem, getDataFlashSale, dataFlashSale } = this.props;
        const actions = {
            deleteList: deleteListFlashSaleItem,
            getList: getDataFlashSale
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFlashSale.id, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Ảnh', dataIndex: 'product_variant', width: 90, responsive: ['sm'],
                render: (product_variant) =>
                    <>
                        {(product_variant && product_variant.media && product_variant.media.length !== 0) &&
                            <Image width={80} height={80} src={product_variant.media[0].image} className='object-cover' />
                        }
                    </>
            },
            {
                title: 'Tên ', dataIndex: 'product_variant',
                render: (product_variant) => <Typography.Text strong className='text-[#0574b8] dark:text-white'>{product_variant && product_variant.name}</Typography.Text>,
            },
            {
                title: 'Giá gốc ', dataIndex: 'product_variant', responsive: ['md'],
                render: (product_variant) => <Typography.Text >{formatMoney(product_variant && product_variant.regular_price)}</Typography.Text>,
            },
            {
                title: 'Giá Sale', dataIndex: 'discount_price', responsive: ['md'],
                render: (discount_price) => <Typography.Text >{formatMoney(discount_price)}</Typography.Text>,
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataCheckPermis['promotion.change_flashsaleitem']} className='cursor-pointer' onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },
        ];
        const { dataCheckPermis, listItemSelected, dataFilter, modalEdit, modalCreate, dropButtonType } = this.state;
        const { isLoading, dataFlashSales, dataFlashSale, getDataFlashSale } = this.props;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['promotion.delete_flashsaleitem'] },
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
                            <Button disabled={(!dataCheckPermis['promotion.delete_flashsaleitem'] === false && dataFlashSale.id) ? false : true}
                                onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                <Space className='text-white dark:text-black'>
                                    <AiOutlinePlus />
                                    Thêm mới
                                </Space>
                            </Button>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-end justify-between gap-[10px]'>
                                <div className='w-[200px] sm:w-[300px] md:w-[400px]'>
                                    <FormSelectSingle name={'Flash sale'}
                                        important={true} width={'100%'}
                                        variable={'id'} value={dataFlashSale.id}
                                        options={dataFlashSales.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                        onChangeInput={getDataFlashSale}
                                    />
                                </div>
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataCheckPermis['promotion.delete_flashsaleitem']}
                                            menu={{ items, onClick: (value) => { this.setState({ dropButtonType: parseInt(value.key) }) } }}  >
                                            <div>
                                                {dropButtonType === 1 && <span>Xóa</span>}
                                                <span> {listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                            </div>
                                        </Dropdown.Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <Divider>FLASH SALE</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataFlashSale.flash_sale_items} pagination={false}
                                    size="middle" bordered scroll={{}} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {modalCreate && dataCheckPermis['promotion.add_flashsaleitem'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
                {modalEdit && dataCheckPermis['promotion.change_flashsaleitem'] &&
                    <ModalEdit modalEdit={modalEdit}
                        openModal={this.openModal}
                        dataFilter={dataFilter} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataFlashSales: state.flash_sale.dataFlashSales,
        dataFlashSale: state.flash_sale.dataFlashSale,
        isLoading: state.flash_sale.isLoading,
        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListFlashSale: (dataFilter) => dispatch(actions.getListFlashSaleRedux(dataFilter)),
        getDataFlashSale: (id) => dispatch(actions.getDataFlashSaleRedux(id)),

        deleteListFlashSaleItem: (id) => dispatch(actions.deleteListFlashSaleItemRedux(id)),
        getDataFlashSaleItem: (id) => dispatch(actions.getDataFlashSaleItemRedux(id)),
        setDataFlashSaleItem: (id) => dispatch(actions.setDataFlashSaleItemRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));