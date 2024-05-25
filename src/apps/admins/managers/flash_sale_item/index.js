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
import FormSelectInput from '@components/selects/formSelectInput';
import { format_money } from '@utils/format_money';
import { handleCheckPermission } from '@utils/handleFuncPermission';
import { data_flash_sale_items } from '@datas/dataPermissionsOrigin';
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
            dataPermissionsAfterCheck: {},
        }
    }
    async componentDidMount() {
        this.props.getListFlashSale(this.state.dataFilter);
        let dataPermissionsAfterCheck = await handleCheckPermission(data_flash_sale_items, this.props.dataUserPermissions, this.props.isSuperUser);
        this.setState({
            dataPermissionsAfterCheck: dataPermissionsAfterCheck,
        });
    }
    openModal = async (name, value, id) => {
        if (name === 'create') {
            this.setState({ modalCreate: value });
        }
        if (name === 'detail') {
            if (id === undefined) {
                this.setState({ modalDetail: value });
            } else {
                this.setState({ modalDetail: value });
                await this.props.get_flash_sale_item(id);
            }
        }
        if (name === 'edit') {
            if (id === undefined) {
                this.setState({ modalEdit: value });
            } else {
                this.setState({ modalEdit: value });
                await this.props.get_flash_sale_item(id);

            }
        }
    }
    funcDropButtonHeaderOfTable = async () => {
        let listItemSelected = this.state.listItemSelected;
        if (this.state.dropButtonType === 1) { await this.props.delete_list_flash_sale_item(listItemSelected); }
        await this.props.getDataFlashSale(this.props.data_flash_sale.id);
        if (this.state.dropButtonType === 1) { this.setState({ listItemSelected: [] }); }
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
                render: (product_variant) => <Typography.Text >{format_money(product_variant && product_variant.regular_price)}</Typography.Text>,
            },
            {
                title: 'Giá Sale', dataIndex: 'discount_price', responsive: ['md'],
                render: (discount_price) => <Typography.Text >{format_money(discount_price)}</Typography.Text>,
            },
            {
                title: 'HĐ', width: 80,
                render: (_, item) => (
                    <Space size="middle" >
                        <button disabled={!dataPermissionsAfterCheck['promotion.change_flashsaleitem']} className='cursor-pointer' onClick={() => this.openModal('edit', true, item.id)}>
                            <AiFillEdit />
                        </button>
                    </Space >
                ),
            },
        ];
        let dataPermissionsAfterCheck = this.state.dataPermissionsAfterCheck;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataPermissionsAfterCheck['promotion.delete_flashsaleitem'] },
        ];
        const listItemSelected = this.state.listItemSelected;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        let dropButtonType = this.state.dropButtonType;
        let data_flash_sale = this.props.data_flash_sale;
        return (
            <>
                <Spin size='large' spinning={this.props.isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <Button disabled={(!dataPermissionsAfterCheck['promotion.delete_flashsaleitem'] === false && this.props.data_flash_sale.id) ? false : true}
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
                                    <FormSelectInput name={'Flash sale'}
                                        important={true} width={'100%'}
                                        variable={'id'} value={this.props.data_flash_sale.id}
                                        options={this.props.data_flash_sales.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                        onChangeInput={this.props.getDataFlashSale}
                                    />
                                </div>
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataPermissionsAfterCheck['promotion.delete_flashsaleitem']}
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
                                    columns={columns} dataSource={data_flash_sale && data_flash_sale.flash_sale_items} pagination={false}
                                    size="middle" bordered scroll={{}} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {this.state.modalCreate && dataPermissionsAfterCheck['promotion.add_flashsaleitem'] &&
                    <ModalCreate modalCreate={this.state.modalCreate}
                        openModal={this.openModal}
                        dataFilter={this.state.dataFilter} />}
                {this.state.modalEdit && dataPermissionsAfterCheck['promotion.change_flashsaleitem'] &&
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
        isLoading: state.flash_sale.isLoading,

        dataUserPermissions: state.user.dataUserPermissions,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListFlashSale: (dataFilter) => dispatch(actions.getListFlashSaleRedux(dataFilter)),
        getDataFlashSale: (id) => dispatch(actions.getDataFlashSaleRedux(id)),
        delete_list_flash_sale_item: (id) => dispatch(actions.delete_list_flash_sale_item_redux(id)),
        get_flash_sale_item: (id) => dispatch(actions.get_flash_sale_item_redux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));