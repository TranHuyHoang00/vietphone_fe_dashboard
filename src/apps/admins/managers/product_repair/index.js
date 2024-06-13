import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import {
    Table, Space, Divider, Button, Input, Popconfirm, Dropdown,
    Spin, Pagination, Typography, Tag, Image
} from 'antd';
import { AiOutlineMenu, AiOutlinePlus, AiFillTool } from "react-icons/ai";
import FormSelectPage from '@components/selects/formSelectPage';
import DrawerFilter from './drawers/drawerFilter';
import { handleCheckPermis } from '@utils/handleFuncPermission';
import { dataProducts } from '@datas/dataPermissionsOrigin';
import { handleOnChangePage } from '@utils/handleFuncPage';
import { handleFuncDropButtonHeaderOfTable } from '@utils/handleFuncDropButton';
import { handleOpenModal } from '@utils/handleFuncModal';
import ModalCreate from './modals/modalCreate';
import DrawerEditBatch from '../product/drawers/drawerEditBatch';
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
            dataFilterProductRepair: {},

            dataCheckPermis: {},
        }
    }
    async componentDidMount() {
        const { getListProduct, dataUserPermis, isSuperUser, dataFilterProductRepair } = this.props;
        getListProduct(dataFilterProductRepair);
        const dataCheckPermis = await handleCheckPermis(dataProducts, dataUserPermis, isSuperUser);
        this.setState({
            dataCheckPermis: dataCheckPermis,
            dataFilterProductRepair: dataFilterProductRepair,
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
        const { deleteListProduct, editListProduct, getListProduct, dataFilterProductRepair } = this.props;
        const actions = {
            deleteList: deleteListProduct,
            editList: editListProduct,
            getList: getListProduct
        };
        const newListItemSelected = await handleFuncDropButtonHeaderOfTable(dropButtonType, listItemSelected, dataFilterProductRepair, actions);
        this.setState({ listItemSelected: newListItemSelected });
    }
    onChangePage = async (pageValue, pageType,) => {
        const { dataFilterProductRepair } = this.state;
        const { getListProduct, setDataFilterProductRepair } = this.props;
        const newDataFilter = await handleOnChangePage(pageValue, pageType, dataFilterProductRepair);
        this.setState({ dataFilterProductRepair: newDataFilter });
        await getListProduct(newDataFilter);
        setDataFilterProductRepair(newDataFilter);
    }
    onChangeSearch = (value) => {
        this.setState(prevState => ({
            dataFilterProductRepair: {
                ...prevState.dataFilterProductRepair,
                search: value,
            }
        }));
    }
    setDataFilterState = (dataFilterProductRepair) => {
        this.setState({ dataFilterProductRepair: dataFilterProductRepair });
    }
    render() {
        const columns = [
            {
                title: 'ID', dataIndex: 'id', width: 60, responsive: ['sm'],
                sorter: (a, b) => a.id - b.id,
            },
            {
                title: 'Ảnh', dataIndex: 'media', width: 90, responsive: ['sm'],
                render: (media) =>
                    <>
                        {(media && media.length !== 0) && <Image width={80} height={80} src={media[0].image} className='object-cover' />}
                    </>
            },
            {
                title: 'Tên sản phẩm', dataIndex: 'name',
                render: (name, item) =>
                    <span className='hover:underline' onClick={() => this.props.history.push(`/admin/manager/product/edit/${item.id}`, { address: 'product' })}>
                        <Typography.Text className='text-[#0574b8] dark:text-white cursor-pointer'>{name}</Typography.Text>
                    </span>,
                sorter: (a, b) => a.name.localeCompare(b.name),
            },
            {
                title: 'Thông tin', dataIndex: 'product_brand', responsive: ['lg'],
                render: (product_brand, item) =>
                    <div className='space-y-[5px]'>
                        {(product_brand && product_brand.name) &&
                            <div className='flex items-center flex-wrap gap-[5px]'>
                                <span>Hãng :</span>
                                <Tag key={index} color='green'>{product_brand && product_brand.name}</Tag>
                            </div>
                        }
                        {item && item.tags && item.tags.length !== 0 &&
                            <div className='flex items-center flex-wrap  gap-[5px]'>
                                <span>Tag :</span>
                                {item.tags && item.tags.map((tag, index) => {
                                    return (<Tag key={index} color='orange'>{tag.name}</Tag>)
                                })}
                            </div>
                        }
                        {item && item.categories && item.categories.length !== 0 &&
                            <div className='flex items-center flex-wrap  gap-[5px]'>
                                <span>Danh mục :</span>
                                {item.categories && item.categories.map((category, index) => {
                                    return (<Tag key={index} color='blue'>{category.name}</Tag>)
                                })}
                            </div>
                        }
                    </div>,
            },
            {
                title: 'Dịch vụ', dataIndex: 'repair_time', responsive: ['lg'],
                render: (repair_time, item) =>
                    <div className='space-y-[5px]'>
                        {(repair_time && repair_time.value) &&
                            <div>
                                <p>Sửa chữa :</p>
                                <Tag key={index} color='green'>{repair_time && repair_time.value}</Tag>
                            </div>
                        }
                        {(item.promotion_info && item.promotion_info.name) &&
                            <div>
                                <p>Khuyến mãi :</p>
                                <Tag key={index} color='green'>{item.promotion_info && item.promotion_info.name}</Tag>
                            </div>
                        }
                    </div>,
            },
            {
                title: 'Status', dataIndex: 'is_active', responsive: ['lg'], width: 140,
                render: (is_active, item) =>
                    <div className='space-y-[5px]'>
                        <div className='flex items-center justify-between'>
                            <span>Trạng thái :</span>
                            {is_active ? <Tag color='green'>Mở</Tag> : <Tag color='red'>Khóa</Tag>}
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Website : </span>
                            {item.has_page ? <Tag color='green'>Yes</Tag> : <Tag color='red'>No</Tag>}
                        </div>
                        <div className='flex items-center justify-between'>
                            <span>Nguồn :</span>
                            <Tag color='blue'>{item.source}</Tag>
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
        const { isLoading, dataProducts, dataMeta, dataFilterProductRepair } = this.props;
        const onChangeSelectedRow = (dataNew) => {
            this.setState({ listItemSelected: dataNew })
        };
        const rowSelection = { listItemSelected, onChange: onChangeSelectedRow };
        return (
            <>
                <Spin size='large' spinning={isLoading}>
                    <div className="mx-[10px] space-y-[10px]">
                        <div className='flex items-center justify-between gap-[10px]'>
                            <div className='flex flex-wrap items-center gap-[10px]'>
                                <Button disabled={!dataCheckPermis['product.add_product']}
                                    onClick={() => this.openModal("create", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlinePlus />
                                        Tạo mới
                                    </Space>
                                </Button>
                                <Button disabled={!dataCheckPermis['product.view_product']}
                                    onClick={() => this.openDrawer("filter", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiOutlineMenu />
                                        Bộ lọc
                                    </Space>
                                </Button>
                                <Button disabled={(!dataCheckPermis['product.view_product'] === false && (listItemSelected && listItemSelected.length > 0)) ? false : true}
                                    onClick={() => this.openDrawer("edit", true)} className='bg-[#0e97ff] dark:bg-white'>
                                    <Space className='text-white dark:text-black'>
                                        <AiFillTool />
                                        Sửa hàng loạt
                                        <span>{listItemSelected && listItemSelected.length === 0 ? '' : `(${listItemSelected.length})`}</span>
                                    </Space>
                                </Button>
                            </div>
                            <div><Input.Search
                                value={this.state.dataFilterProductRepair.search}
                                onChange={(event) => this.onChangeSearch(event.target.value)}
                                onSearch={(value) => this.onChangePage(value, 'search')} placeholder="Tên sản phẩm !" /></div>
                        </div>
                        <div className='bg-white dark:bg-[#001529] p-[10px] rounded-[10px] shadow-md'>
                            <div className='flex items-center justify-between gap-[10px]'>
                                <FormSelectPage limit={dataFilterProductRepair.limit} onChangePage={this.onChangePage} />
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
                            <Divider>SỬA CHỮA</Divider>
                            <div className='space-y-[20px]'>
                                <Table rowSelection={rowSelection} rowKey="id"
                                    columns={columns} dataSource={dataProducts} pagination={false}
                                    size="middle" bordered scroll={{}} />
                                <Pagination responsive current={dataFilterProductRepair.page}
                                    showQuickJumper total={dataMeta.total * dataMeta.limit} pageSize={dataFilterProductRepair.limit}
                                    onChange={(value) => this.onChangePage(value, 'page')} />
                            </div>
                        </div>
                    </div >
                </Spin>
                {drawerFilter && dataCheckPermis['product.view_product'] &&
                    <DrawerFilter drawerFilter={drawerFilter}
                        openDrawer={this.openDrawer} dataFilterProductRepair={dataFilterProductRepair}
                        onChangePage={this.onChangePage} />
                }
                {drawerEditBatch && dataCheckPermis['product.view_product'] &&
                    <DrawerEditBatch drawerEditBatch={drawerEditBatch}
                        openDrawer={this.openDrawer} dataFilter={dataFilterProductRepair}
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
        dataFilterProductRepair: state.product.dataFilterProductRepair,
        dataUserPermis: state.user.dataUserPermis,
        isSuperUser: state.user.isSuperUser,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListProduct: (dataFilterProductRepair) => dispatch(actions.getListProductRedux(dataFilterProductRepair)),
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),
        editListProduct: (id, data) => dispatch(actions.editListProductRedux(id, data)),
        deleteListProduct: (id) => dispatch(actions.deleteListProductRedux(id)),
        setDataProduct: (id) => dispatch(actions.setDataProductRedux(id)),
        setDataFilterProductRepair: (data) => dispatch(actions.setDataFilterProductRepairRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));