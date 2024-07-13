import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Typography, Card, message, Collapse, Select } from 'antd';
import ModalFooter from '@components/modals/modalFooter';
import dayjs from 'dayjs';
import { createTargetProductCategory } from '@services/target/targetProductCategoryServices';
import { showNotification } from '@utils/handleFuncNotification';
import { getListTargetShop } from '@services/target/targetShopServices';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100, search: '' },
            dataTPCs: [],
            newDataShops: [],
            listSelectedShopId: [],
        }
    }
    async componentDidMount() {
        const { getListProductCategoryTarget, getListShop, setDataTargetShop } = this.props;
        const { dataFilter } = this.state;
        await getListProductCategoryTarget(dataFilter);
        await getListShop(dataFilter);
        await setDataTargetShop({ month: this.props.dataFilter.month });
        await this.handleGetListTargetShop({ page: 1, limit: 100, month: this.props.dataFilter.month });
    }
    handleGetListTargetShop = async (dataFilter) => {
        try {
            const data = await getListTargetShop(dataFilter);
            const { dataShops } = this.props;
            if (data && data.data && data.data.success === 1) {
                const dataTargetShops = data.data.data.shop_monthly_target;
                this.getDataShops(dataShops, dataTargetShops);
            }
        } catch (error) {
            console.warn(error);
        }
    }
    handleOnchangeInput = (itemValue, itemVariable, item) => {
        const { dataTPCs } = this.state;
        const dataIndex = dataTPCs.findIndex(data => data.target_product_category === item.id);
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
            const newDataTPC = { target_product_category: item.id, name: item.name, [itemVariable]: itemValue };
            this.setState({ dataTPCs: [...dataTPCs, newDataTPC] });
        }
    }
    validationData = (data) => {
        const { listSelectedShopId } = this.state;
        if (listSelectedShopId && listSelectedShopId.length === 0) {
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
        const { dataTargetShop, createTargetShop, openModal, getListTargetShop, dataFilter
        } = this.props;
        const { dataTPCs } = this.state;
        const result = this.validationData(dataTargetShop);
        if (result.check) {
            let newDataTargetShop = { ...dataTargetShop }
            const { listSelectedShopId } = this.state;
            if (dataTPCs && dataTPCs.length !== 0) {
                const newDataTPCIds = await this.handleDataTPCs(dataTPCs);
                newDataTargetShop.target_product_category = newDataTPCIds;
            }
            const promises = listSelectedShopId.map(async shopId => {
                newDataTargetShop.shop = shopId;
                return createTargetShop(newDataTargetShop);
            });
            await Promise.all(promises);
            message.success('Thành công');
            await getListTargetShop(dataFilter);
            openModal("create", false);
        } else {
            message.error(result.mess);
        }
    }
    getValue = (itemVariable, item) => {
        const { dataTPCs } = this.state;
        const dataSelected = dataTPCs.find(data => data.target_product_category === item.id);
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
        const { onChangeTargetShop, onChangePage } = this.props;
        await onChangePage(value, 'month');
        await onChangeTargetShop(value, 'month');
        await this.handleGetListTargetShop({ page: 1, limit: 100, month: value });
    }
    handleOnChangeSelect = (value) => {
        this.setState({ listSelectedShopId: value });
    };
    render() {
        const { Text } = Typography;
        const { isLoadingTargetShop, isLoadingProductCategoryTarget, isLoadingShop,
            onChangeTargetShop, modalCreate, openModal,
            dataTargetShop, dataProductCategoryTargets, dataFilter
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
                <Spin spinning={isLoadingTargetShop || isLoadingProductCategoryTarget || isLoadingShop}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <Text italic strong>Cửa hàng<Text type="danger" strong> *</Text></Text>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} showSearch
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                onChange={(value) => this.handleOnChangeSelect(value)}
                                options={newDataShops && newDataShops.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                            />
                        </div>
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
                                    <input onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                        className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                        type="number" min="0"
                                        value={dataTargetShop?.value}
                                        onChange={(event) => onChangeTargetShop(event.target.value, 'value')} />
                                </div>
                            </div>
                            <Collapse size='small'>
                                <Collapse.Panel key={1} header="KPI SẢN PHẨM">
                                    <div className='space-y-[5px]'>
                                        {dataProductCategoryTargets && dataProductCategoryTargets.reverse().map((item, index) => {
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

        dataProductCategoryTargets: state.productCategoryTarget.dataProductCategoryTargets,
        isLoadingProductCategoryTarget: state.productCategoryTarget.isLoading,

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

        getListProductCategoryTarget: (dataFilter) => dispatch(actions.getListProductCategoryTargetRedux(dataFilter)),
        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));