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
        const { setDataVariant, dataProduct } = this.props;
        setDataVariant({ product: dataProduct.id });
    }
    validationData = (data) => {
        if (!data.sku) {
            return { mess: "Không được bỏ trống 'Mã SKU' ", check: false };
        }
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên phiên bản' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { createVariant, dataVariant, getDataProduct, dataProduct, openModal } = this.props;
        const result = this.validationData(dataVariant);
        if (result.check) {
            await createVariant(dataVariant);
            await getDataProduct(dataProduct.id);
            openModal();
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataVariant, isLoading, onChangeVariant, modalCreate, openModal } = this.props;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal()} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <FormInput name={'Mã SKU'} variable={'sku'} value={dataVariant.sku}
                            important={true}
                            onChangeInput={onChangeVariant} />

                        <FormInput name={'Tên phiên bản'} variable={'name'} value={dataVariant.name}
                            important={true}
                            onChangeInput={onChangeVariant} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataProduct: state.product.dataProduct,

        isLoading: state.variant.isLoading,
        isResult: state.variant.isResult,

        dataVariant: state.variant.dataVariant,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setDataVariant: (id) => dispatch(actions.setDataVariantRedux(id)),
        createVariant: (data) => dispatch(actions.createVariantRedux(data)),
        onChangeVariant: (id, value) => dispatch(actions.onChangeVariantRedux(id, value)),
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));