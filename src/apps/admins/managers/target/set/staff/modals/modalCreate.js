import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Typography, Card, message, Collapse } from 'antd';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modals/modalFooter';
import dayjs from 'dayjs';
import { createTargetProductCategory } from '@services/target/targetProductCategoryServices';
import { showNotification } from '@utils/handleFuncNotification';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100, search: '' },
            dataTargetShop: { month: dayjs().startOf('month').format("YYYY-MM-DD") },
            dataTPCs: [],
            newDataShops: [],
        }
    }
    async componentDidMount() {
        const { getListProductCategory, getListShop, setDataTargetShop, dataTargetShops } = this.props;
        const { dataFilter, dataTargetShop } = this.state;
        await getListProductCategory(dataFilter);
        await getListShop(dataFilter);
        await setDataTargetShop(dataTargetShop);
        this.getDataShops(this.props.dataShops, dataTargetShops);
    }
    handleOnchangeInput = (itemValue, itemVariable, item) => {
        const { dataTPCs } = this.state;
        const dataIndex = dataTPCs.findIndex(data => data.product_category === item.id);
        if (dataIndex !== -1) {
            const updatedDataTPCs = dataTPCs.map((data, index) => {
                if (index === dataIndex) {
                    return {
                        ...data,
                        [itemVariable]: itemValue
                    };
                }
                return data;
            });
            this.setState({ dataTPCs: updatedDataTPCs });
        } else {
            const newDataTPC = { product_category: item.id, name: item.name, [itemVariable]: itemValue };
            this.setState({ dataTPCs: [...dataTPCs, newDataTPC] });
        }
    }
    validationData = (data) => {
        if (!data.shop) {
            return { mess: "Không được bỏ trống 'Cửa hàng' ", check: false };
        }
        if (!data.month) {
            return { mess: "Không được bỏ trống 'Thời gian' ", check: false };
        }
        if (!data.value) {
            return { mess: "Không được bỏ trống 'Target' ", check: false };
        }
        return { check: true };
    }
    handleCreateTPC = async (item) => {
        try {
            const data = await createTargetProductCategory(item);
            if (data && data.data && data.data.success === 1) {
                return data.data.data.id;
            }
        } catch (error) {
            showNotification(error);
        }
    }
    handleDataTPCs = async (dataTPCs) => {
        let newDataTPCs = [];
        for (const item of dataTPCs) {
            const newTPCId = await this.handleCreateTPC(item);
            if (newTPCId) { newDataTPCs.push(newTPCId); }
        }
        return newDataTPCs;
    }
    handleCreate = async () => {
        const { dataTargetShop, createTargetShop, isResultShop, openModal, getListTargetShop, dataFilter
        } = this.props;
        const { dataTPCs } = this.state;
        const result = this.validationData(dataTargetShop);
        if (result.check) {
            let newDataTargetShop = { ...dataTargetShop }
            if (dataTPCs && dataTPCs.length !== 0) {
                const newDataTPCIds = await this.handleDataTPCs(dataTPCs);
                newDataTargetShop.target_product_category = newDataTPCIds;
            }
            await createTargetShop(newDataTargetShop);
            if (isResultShop) {
                await getListTargetShop(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    getValue = (itemVariable, item) => {
        const { dataTPCs } = this.state;
        const dataSelected = dataTPCs.find(data => data.product_category === item.id);
        switch (itemVariable) {
            case 'value':
                return dataSelected?.value;
            case 'quantity':
                return dataSelected?.quantity;
            default:
                break;
        }
    }
    getDataShops = (dataShops, dataTargetShops) => {
        let targetShopIds = dataTargetShops.map(item => item?.shop?.id);
        const newDataShops = dataShops.filter(shop => !targetShopIds.includes(shop?.id));
        this.setState({ newDataShops: newDataShops })
    }
    onChangeTime = async (value) => {
        const { onChangeTargetShop, onChangePage, dataShops } = this.props;
        await onChangePage(value, 'month');
        await onChangeTargetShop(value, 'month');
        this.getDataShops(dataShops, this.props.dataTargetShops);
    }
    render() {
        const { Text } = Typography;
        const { isLoadingTargetShop, isLoadingProductCategory, isLoadingShop,
            onChangeTargetShop, modalCreate, openModal,
            dataTargetShop, dataProductCategorys, dataFilter
        } = this.props;
        const { newDataShops } = this.state;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={500}
                maskClosable={!isLoadingTargetShop}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoadingTargetShop} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoadingTargetShop || isLoadingProductCategory || isLoadingShop}>
                    <div className="space-y-[10px]">
                        <FormSelectSingle name={'Cửa hàng'} variable={'shop'} value={dataTargetShop?.shop}
                            important={true} width={'100%'}
                            options={newDataShops && newDataShops.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            onChangeInput={onChangeTargetShop} />
                        <div className='space-y-[10px]'>
                            <div className='flex items-center justify-center space-x-[5px]'>
                                <div className='space-y-[3px]'>
                                    <Text italic strong>
                                        Thời gian
                                        <Text type="danger" strong> *</Text>
                                    </Text>
                                    <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                        type="month" value={dayjs(dataFilter?.month).format('YYYY-MM')}
                                        onChange={(event) => this.onChangeTime(dayjs(event.target.value).startOf('month').format('YYYY-MM-DD'))} />
                                </div>
                                <div className='space-y-[3px]'>
                                    <Text italic strong>
                                        Target
                                        <Text type="danger" strong> *</Text>
                                    </Text>
                                    <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                        type="number" min="0"
                                        value={dataTargetShop?.value}
                                        onChange={(event) => onChangeTargetShop(event.target.value, 'value')} />
                                </div>
                            </div>
                            <Collapse size='small'>
                                <Collapse.Panel key={1} header="KPI SẢN PHẨM">
                                    <div className='space-y-[5px]'>
                                        {dataProductCategorys && dataProductCategorys.reverse().map((item, index) => {
                                            return (
                                                <Card key={item.id} title={`${item.name}`} size='small'>
                                                    <div className='flex items-center justify-center space-x-[5px]'>
                                                        <div className='space-y-[3px]'>
                                                            <Text italic strong>Doanh thu</Text>
                                                            <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                                                type="number" min="0"
                                                                value={this.getValue('value', item)}
                                                                onChange={(event) => this.handleOnchangeInput(event.target.value, 'value', item)} />
                                                        </div>
                                                        <div className='space-y-[3px]'>
                                                            <Text italic strong>Số lượng</Text>
                                                            <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                                                type="number" min="0"
                                                                value={this.getValue('quantity', item)}
                                                                onChange={(event) => this.handleOnchangeInput(event.target.value, 'quantity', item)} />
                                                        </div>
                                                    </div>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </Collapse.Panel>
                            </Collapse>
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTargetShop: state.targetShop.dataTargetShop,
        dataTargetShops: state.targetShop.dataTargetShops,

        isLoadingTargetShop: state.targetShop.isLoading,
        isResultTargetShop: state.targetShop.isResult,

        dataProductCategorys: state.productCategory.dataProductCategorys,
        isLoadingProductCategory: state.productCategory.isLoading,
        isResultProductCategory: state.productCategory.isResult,

        dataShops: state.shop.dataShops,
        isLoadingShop: state.shop.isLoading,
        isResultShop: state.shop.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTargetShop: (dataFilter) => dispatch(actions.getListTargetShopRedux(dataFilter)),
        createTargetShop: (data) => dispatch(actions.createTargetShopRedux(data)),
        onChangeTargetShop: (id, value) => dispatch(actions.onChangeTargetShopRedux(id, value)),
        setDataTargetShop: (data) => dispatch(actions.setDataTargetShopRedux(data)),

        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),
        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));