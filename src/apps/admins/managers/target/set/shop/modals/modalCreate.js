import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Typography, message, Select } from 'antd';
import ModalFooter from '@components/modals/modalFooter';
import dayjs from 'dayjs';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: process.env.REACT_APP_API_LIMIT },
            newDataShops: [],
            selectedShopIds: [],
        }
    }
    async componentDidMount() {
        const { getListShop, setDataTargetShop } = this.props;
        const { dataFilter } = this.state;
        await getListShop(dataFilter);
        await setDataTargetShop({ month: this.props.dataFilter.month });
        await this.getDataShopRemainings(this.props.dataShops, this.props.dataTargetShops);
    }
    getDataShopRemainings = async (dataShops, dataTargetShops) => {
        const targetShopIds = dataTargetShops.map(item => item?.shop?.id);
        const newDataShops = dataShops.filter(shop => !targetShopIds.includes(shop?.id));
        this.setState({ newDataShops: newDataShops })
    }
    validationData = (data) => {
        const { selectedShopIds } = this.state;
        if (selectedShopIds && selectedShopIds.length === 0) {
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
    handleCreate = async () => {
        const { dataTargetShop, createTargetShop, openModal, getListTargetShop, dataFilter } = this.props;
        const result = this.validationData(dataTargetShop);
        if (result.check) {
            let newDataTargetShop = { ...dataTargetShop }
            const { selectedShopIds } = this.state;
            const promises = selectedShopIds.map(async shopId => {
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
    onChangeTime = async (value) => {
        const { onChangeTargetShop, onChangePage } = this.props;
        await onChangePage(value, 'month');
        await onChangeTargetShop(value, 'month');
        await this.getDataShopRemainings(this.props.dataShops, this.props.dataTargetShops);
    }
    render() {
        const { Text } = Typography;
        const { isLoadingTargetShop, isLoadingShop, onChangeTargetShop, modalCreate, openModal, dataTargetShop, dataFilter } = this.props;
        const { newDataShops, selectedShopIds } = this.state;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={500}
                maskClosable={!isLoadingTargetShop}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoadingTargetShop} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoadingTargetShop || isLoadingShop}>
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <Text italic strong>Cửa hàng<Text type="danger" strong> *</Text></Text>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} showSearch
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                onChange={(value) => this.setState({ selectedShopIds: value })}
                                value={selectedShopIds}
                                options={newDataShops && newDataShops.map((item) => ({
                                    label: item?.name,
                                    value: item?.id,
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
                                        value={dataTargetShop?.value || ''}
                                        onChange={(event) => onChangeTargetShop(event.target.value, 'value')} />
                                </div>
                            </div>
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

        dataShops: state.shop.dataShops,
        isLoadingShop: state.shop.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTargetShop: (dataFilter) => dispatch(actions.getListTargetShopRedux(dataFilter)),
        createTargetShop: (data) => dispatch(actions.createTargetShopRedux(data)),
        onChangeTargetShop: (id, value) => dispatch(actions.onChangeTargetShopRedux(id, value)),
        setDataTargetShop: (data) => dispatch(actions.setDataTargetShopRedux(data)),

        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));