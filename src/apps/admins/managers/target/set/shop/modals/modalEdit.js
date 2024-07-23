import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Typography, Card, message, Collapse } from 'antd';
import ModalFooter from '@components/modals/modalFooter';
import dayjs from 'dayjs';
import { createTargetProductCategory, editTargetProductCategory } from '@services/target/targetProductCategoryServices';
import { showNotification } from '@utils/handleFuncNotification';
import FormInput from '@components/inputs/formInput';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: process.env.REACT_APP_API_LIMIT },
            dataPCs: [],
        }
    }
    async componentDidMount() {
        const { getListProductCategoryTarget, dataTargetShop } = this.props;
        const { dataFilter } = this.state;
        await getListProductCategoryTarget(dataFilter);
        this.handleDataProductCategorys(dataTargetShop, this.props.dataProductCategoryTargets);
    }
    handleDataProductCategorys = (dataTargetShop, dataProductCategoryTargets) => {
        const dataTPCs = dataTargetShop?.target_product_category;
        const dataPCs = dataProductCategoryTargets.map(category => {
            const targetProduct = dataTPCs.find(product => product.target_product_category.id === category.id);
            return {
                ...category,
                data: targetProduct ? { id: targetProduct.id, quantity: targetProduct.quantity, value: targetProduct.value } : null
            };
        });
        this.setState({ dataPCs: dataPCs });
    }
    handleOnchangeInput = (itemValue, itemVariable, item) => {
        const { dataPCs } = this.state;
        const newDataPcs = [...dataPCs];
        newDataPcs.forEach(pc => {
            if (pc.id === item.id) {
                if (pc.data === null) {
                    pc.data = { target_product_category: item.id };
                    if (itemVariable === 'quantity') {
                        pc.data.quantity = itemValue;
                    } else if (itemVariable === 'value') {
                        pc.data.value = itemValue;
                    }
                } else {
                    pc.data[itemVariable] = itemValue;
                }
            }
        });
        this.setState({ dataPCs: newDataPcs });
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
    handleEditTPC = async (item) => {
        try {
            await editTargetProductCategory(item.id, item);
        } catch (error) {
            showNotification(error);
        }
    }
    handleDataPCs = async (dataPCs) => {
        const newDataTPCs = await Promise.all(
            dataPCs
                .filter(item => item?.data)
                .map(async item => {
                    const quantity = item.data.quantity;
                    const value = item.data.value;
                    // eslint-disable-next-line
                    if ((quantity == "" || quantity == 0) && (value == "0.00" || value == "0" || value == "")) {
                        return null;
                    }
                    if (item.data.id) {
                        await this.handleEditTPC(item.data);
                        return item.data.id;
                    } else {
                        const newTPCId = await this.handleCreateTPC(item.data);
                        return newTPCId || null;
                    }
                })
        );
        return newDataTPCs.filter(id => id !== null);
    }
    handleEdit = async () => {
        const { dataTargetShop, editTargetShop, openModal, getListTargetShop, dataFilter } = this.props;
        const { dataPCs } = this.state;
        const result = this.validationData(dataTargetShop);
        if (result.check) {
            let newDataTargetShop = { ...dataTargetShop }
            const newDataTPCIds = await this.handleDataPCs(dataPCs);
            newDataTargetShop.target_product_category = newDataTPCIds;
            if (newDataTargetShop?.shop?.id) {
                newDataTargetShop.shop = newDataTargetShop.shop?.id
            }
            await editTargetShop(newDataTargetShop.id, newDataTargetShop);
            await getListTargetShop(dataFilter);
            openModal("edit", false);
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { Text } = Typography;
        const { isLoadingTargetShop, isLoadingProductCategoryTarget,
            onChangeTargetShop, modalEdit, openModal, dataTargetShop } = this.props;
        const { dataPCs } = this.state;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={400}
                maskClosable={!isLoadingTargetShop}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoadingTargetShop} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoadingTargetShop || isLoadingProductCategoryTarget}>
                    <div className="space-y-[10px]">
                        <FormInput name={'Tên cửa hàng'} variable={'name'}
                            value={dataTargetShop?.shop?.name}
                            important={true} disabled={true} onChangeInput={onChangeTargetShop} />

                        <div className='space-y-[10px]'>
                            <div className='flex items-center justify-center space-x-[5px]'>
                                <div className='space-y-[3px]'>
                                    <Text italic strong>Thời gian<Text type="danger" strong> *</Text></Text>
                                    <input disabled className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                        type="month" value={dayjs(dataTargetShop?.month).format('YYYY-MM')} />
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
                                        {dataPCs && dataPCs.reverse().map((item, index) => {
                                            return (
                                                <Card key={item.id} title={`${item.name}`} size='small'>
                                                    <div className='flex items-center justify-center space-x-[5px]'>
                                                        <div className='space-y-[3px]'>
                                                            <Text italic strong>Doanh thu</Text>
                                                            <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                                                type="number" min="0"
                                                                value={item?.data?.value}
                                                                onChange={(event) => this.handleOnchangeInput(event.target.value, 'value', item)} />
                                                        </div>
                                                        <div className='space-y-[3px]'>
                                                            <Text italic strong>Số lượng</Text>
                                                            <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                                                type="number" min="0"
                                                                value={item?.data?.quantity}
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
        isResultProductCategoryTarget: state.productCategoryTarget.isResult,

        dataShops: state.shop.dataShops,
        isLoadingShop: state.shop.isLoading,
        isResultShop: state.shop.isResult,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTargetShop: (dataFilter) => dispatch(actions.getListTargetShopRedux(dataFilter)),
        editTargetShop: (id, data) => dispatch(actions.editTargetShopRedux(id, data)),
        onChangeTargetShop: (id, value) => dispatch(actions.onChangeTargetShopRedux(id, value)),
        setDataTargetShop: (data) => dispatch(actions.setDataTargetShopRedux(data)),

        getListProductCategoryTarget: (dataFilter) => dispatch(actions.getListProductCategoryTargetRedux(dataFilter)),
        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));