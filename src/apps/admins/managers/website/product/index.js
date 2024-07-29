import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Input, Popconfirm, Dropdown,
    Spin, Pagination, Typography, Tag, Image
} from 'antd';
import { AiFillFilter, AiOutlinePlus, AiFillTool } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import DrawerFilter from './drawers/drawerFilter';
import DrawerEditBatch from './drawers/drawerEditBatch';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataProducts } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
import ModalCreate from './modals/modalCreate';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropButtonType: 1,
            listItemSelected: [],
            modalDetail: false,
            modalCreate: false,
            modalEdit: false,
            drawerFilter: false,
            drawerEditBatch: false,

            dataFilter: {},
            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        const { getListProduct, dataFilter, dataUserPermis, isSuperUser } = this.props;
        getListProduct(dataFilter);
        const dataCheckPermis = await handleCheckPermis(dataProducts, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
            dataFilter: dataFilter,
        });
    }
    openModal = async (modalName, modalValue, itemId,) => {
        const { setDataProduct, getDataProduct } = this.props;
        const actions = {
            setData: setDataProduct,
            getData: getDataProduct,
        };
        const newStateModal = await handleOpenModal(modalName, modalValue, itemId, actions);
        this.setState(newStateModal);
    }
    openDrawer = async (drawerName, drawerValue) => {
        switch (drawerName) {
            case 'filter':
                this.setState({ drawerFilter: drawerValue });
                break;
            case 'edit':
                this.setState({ drawerEditBatch: drawerValue });
                break;
            default:
                return;
        }
    }
    funcDropButtonHeaderOfTable = async () => {
        const { listItemSelected, dropButtonType } = this.state;
        const { deleteListProduct, editListProduct, getListProduct, dataFilter } = this.props;
        const actions = {
            deleteList: deleteListProduct,
            editList: editListProduct,
            getList: getListProduct
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilter, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilter } = this.state;
        const { getListProduct, setDataFilterProduct } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilter);

        this.setState({ dataFilter: newDataFilter });
        await getListProduct(newDataFilter);
        setDataFilterProduct(newDataFilter);

        // console.log('dataFilter', dataFilter);
        // console.log('newDataFilter', newDataFilter);
        // const result = await compareObjects(newDataFilter, dataFilter);
        // if (!result) {
        //     await getListProduct(newDataFilter);
        //     this.setState({ dataFilter: newDataFilter });

        // }
    }
    onChangeSearch = (value) => {
        this.setState(prevState => ({
            dataFilter: {
                ...prevState.dataFilter,
                search: value,
            }
        }));
    }
    setDataFilterState = (dataFilter) => {
        this.setState({ dataFilter: dataFilter });
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'ẢNH', dataIndex: 'media', width: 90, responsive: ['sm'],
                render: (media) =>
                    <>
                        {(media && media.length !== 0) && <Image width={80} height={80} src={media?.[0]?.image} className='object-cover' />}
                    </>
            },
            {
                title: 'TÊN', dataIndex: 'name',
                render: (name, item) =>
                    <span className='hover:underline' onClick={() => this.props.history.push(`/admin/manager/website/product/edit/${item.id}`, { address: 'product' })}>
                        <Typography.Text className='text-[#0574b8] dark:text-white cursor-pointer'>{name}</Typography.Text>
                    </span>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'THÔNG TIN', dataIndex: 'product_brand', responsive: ['lg'],
                render: (product_brand, item) =>
                    <div className='space-y-[5px]'>
                        {(product_brand && product_brand.name) &&
                            <div className='flex items-center flex-wrap gap-[5px]'>
                                <span>Hãng :</span>
                                <Tag key={index} color='green'>{product_brand?.name}</Tag>
                            </div>
                        }
                        {item && item.tags && item.tags.length !== 0 &&
                            <div className='flex items-center flex-wrap  gap-[5px]'>
                                <span>Tag :</span>
                                {item.tags && item.tags.map((tag, index) => {
                                    return (<Tag key={index} color='orange'>{tag?.name}</Tag>)
                                })}
                            </div>
                        }
                        {item && item.categories && item.categories.length !== 0 &&
                            <div className='flex items-center flex-wrap  gap-[5px]'>
                                <span>Danh mục :</span>
                                {item.categories && item.categories.map((category, index) => {
                                    return (<Tag key={index} color='blue'>{category?.name}</Tag>)
                                })}
                            </div>
                        }
                    </div>,
            },
            {
                title: 'DỊCH VỤ', dataIndex: 'repair_time', responsive: ['lg'],
                render: (repair_time, item) =>
                    <div className='space-y-[5px]'>
                        {(repair_time && repair_time.value) &&
                            <div>
                                <p>Sửa chữa :</p>
                                <Tag key={index} color='green'>{repair_time?.value}</Tag>
                            </div>
                        }
                        {(item.promotion_info && item.promotion_info.name) &&
                            <div>
                                <p>Khuyến mãi :</p>
                                <Tag key={index} color='green'>{item.promotion_info?.description}</Tag>
                            </div>
                        }
                    </div>,
            },
            {
                title: 'STATUS', dataIndex: 'is_active', responsive: ['lg'], width: 140,
                render: (is_active, item) =>
                    <div className='space-y-[5px]'>
                        <div className='flex items-center justify-between'>
                            <span>Trạng thái :</span>
                            {is_active ? <Tag color='green'>Mở</Tag> : <Tag color='red'>Khóa</Tag>}
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Website : </span>
                            {item.has_page ? <Tag color='green'>Có</Tag> : <Tag color='red'>Chưa</Tag>}
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Nguồn :</span>
                            <Tag color='blue'>{item?.source}</Tag>
                        </div>
                    </div>,
            },
        ];
        const { dataCheckPermis, listItemSelected, drawerFilter, dropButtonType, modalCreate, drawerEditBatch } = this.state;
        const items = [
            { key: 1, label: 'Xóa', disabled: !dataCheckPermis['product.delete_product'] },
            { key: 2, label: 'Khóa', disabled: !dataCheckPermis['product.change_product'] },
            { key: 3, label: 'Mở', disabled: !dataCheckPermis['product.change_product'] },
        ];
        const { isLoading, dataProducts, dataMeta, dataFilter } = this.props;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between flex-wrap gap-[10px]'>
                            <div className='flex flex-wrap items-center gap-[10px]'>
                                <Button disabled={!dataCheckPermis['product.add_product']}
                                    onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlinePlus />
                                        Tạo
                                    </Space>
                                </Button>
                                <Button disabled={!dataCheckPermis['product.view_product']}
                                    onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiFillFilter />
                                        Lọc
                                    </Space>
                                </Button>
                                <Button disabled={(!dataCheckPermis['product.view_product'] === false && (listItemSelected && listItemSelected.length > 0)) ? false : true}
                                    onClick={() => this.openDrawer("edit", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiFillTool />
                                        Sửa
                                        <span>{listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                    </Space>
                                </Button>
                            </div>
                            <div>
                                <Input.Search
                                    value={this.state.dataFilter.search}
                                    onChange={(event) => this.onChangeSearch(event.target.value)}
                                    onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên sản phẩm !" />
                            </div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[5px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilter.limit} onChangePage={this.onChangePage} />
                                <div>
                                    <Popconfirm disabled={(listItemSelected && listItemSelected.length === 0 ? true : false)}
                                        title={`Thực hiện tác vụ với ${listItemSelected && listItemSelected.length} dòng này?`}
                                        placement="bottomLeft" okType='default' onConfirm={() => this.funcDropButtonHeaderOfTable()}>
                                        <Dropdown.Button
                                            disabled={!dataCheckPermis['product.delete_product']}
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
                            <Divider>SẢN PHẨM</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataProducts} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilter.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilter.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {drawerFilter && dataCheckPermis['product.view_product'] &&
                    <DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        onChangePage={this.onChangePage} />
                }
                {drawerEditBatch && dataCheckPermis['product.view_product'] &&
                    <DrawerEditBatch drawerEditBatch={drawerEditBatch}
                        openDrawer={this.openDrawer} dataFilter={dataFilter}
                        listItemSelected={listItemSelected}
                        onChangePage={this.onChangePage} />
                }
                {modalCreate && dataCheckPermis['product.add_product'] &&
                    <ModalCreate modalCreate={modalCreate}
                        openModal={this.openModal} setDataFilterState={this.setDataFilterState} />}
            </>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataProducts: state.product.dataProducts,
        dataProduct: state.product.dataProduct,
        dataMeta: state.product.dataMeta,
        isLoading: state.product.isLoading,
        isResult: state.product.isResult,
        dataFilter: state.product.dataFilter,
        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListProduct: (dataFilter) => dispatch(actions.getListProductRedux(dataFilter)),
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),
        editListProduct: (id, data) => dispatch(actions.editListProductRedux(id, data)),
        deleteListProduct: (id) => dispatch(actions.deleteListProductRedux(id)),
        setDataProduct: (id) => dispatch(actions.setDataProductRedux(id)),
        setDataFilterProduct: (data) => dispatch(actions.setDataFilterProductRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));