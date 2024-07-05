import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validationData = () => {
        return { check: true };
    }
    handleEdit = async () => {
        const { dataFlashSaleItem, dataFlashSale, isResult, openModal, getDataFlashSale, editFlashSaleItem } = this.props;
        const result = this.validationData(dataFlashSaleItem);
        if (result.check) {
            await editFlashSaleItem(dataFlashSaleItem.id, dataFlashSaleItem);
            if (isResult) {
                await getDataFlashSale(dataFlashSale.id);
                openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataFlashSaleItem, isLoading, openModal, modalEdit, onChangeFlashSaleItem } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <FormInput name={'Giá khuyến mãi'} variable={'discount_price'} value={dataFlashSaleItem.discount_price}
                            important={true}
                            onChangeInput={onChangeFlashSaleItem} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataFlashSaleItem: state.flashSaleItem.dataFlashSaleItem,
        isLoading: state.flashSaleItem.isLoading,
        isResult: state.flashSaleItem.isResult,
        dataFlashSale: state.flashSale.dataFlashSale,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        editFlashSaleItem: (id, data) => dispatch(actions.editFlashSaleItemRedux(id, data)),
        onChangeFlashSaleItem: (id, value) => dispatch(actions.onChangeFlashSaleItemRedux(id, value)),
        getDataFlashSale: (id) => dispatch(actions.getDataFlashSaleRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));