import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, Typography, message } from 'antd';
import ModalFooter from '@components/modals/modalFooter';
import dayjs from 'dayjs';
import FormInput from '@components/inputs/formInput';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: process.env.REACT_APP_API_LIMIT },
        }
    }
    async componentDidMount() {
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
    handleEdit = async () => {
        const { dataTargetShop, editTargetShop, openModal, getListTargetShop, dataFilter } = this.props;
        const result = this.validationData(dataTargetShop);
        if (result.check) {
            let newDataTargetShop = { ...dataTargetShop };
            if (newDataTargetShop?.shop?.id) { delete newDataTargetShop.shop; }
            await editTargetShop(newDataTargetShop.id, newDataTargetShop);
            await getListTargetShop(dataFilter);
            openModal("edit", false);
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { Text } = Typography;
        const { isLoadingTargetShop, onChangeTargetShop, modalEdit, openModal, dataTargetShop } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={400}
                maskClosable={!isLoadingTargetShop}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoadingTargetShop} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoadingTargetShop}>
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
        editTargetShop: (id, data) => dispatch(actions.editTargetShopRedux(id, data)),
        onChangeTargetShop: (id, value) => dispatch(actions.onChangeTargetShopRedux(id, value)),
        setDataTargetShop: (data) => dispatch(actions.setDataTargetShopRedux(data)),

        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));