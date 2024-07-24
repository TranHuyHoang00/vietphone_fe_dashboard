import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import { createVariant } from '@services/website/variantServices';
import { showNotification } from '@utils/handleFuncNotification';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataVariant: {},
        }
    }
    async componentDidMount() {
        const { dataProduct } = this.props;
        this.setState({
            dataVariant: {
                ...this.state.dataVariant,
                product: dataProduct.id
            }
        })
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state.dataVariant };
        copyState[id] = event;
        this.setState({
            dataVariant: {
                ...copyState
            }
        });
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
        const { openModal, dataVariants, setDataVariants, handleSetIndexActiveVariant, setDataVariant, setIsEditVariant } = this.props;
        const { dataVariant } = this.state;
        const result = this.validationData(dataVariant);
        if (result.check) {
            try {
                const data = await createVariant(dataVariant);
                if (data && data.data && data.data.success === 1) {
                    const newDataVariant = data.data.data;
                    let newDataVariants = [...dataVariants];
                    newDataVariants.unshift(newDataVariant);
                    await setDataVariants(newDataVariants);
                    await setDataVariant(newDataVariants[0]);
                    handleSetIndexActiveVariant(0);
                    message.success('Thành công');
                } else {
                    message.error('Lỗi');
                }
                await setIsEditVariant(false);
            } catch (error) {
                showNotification(error);
            }
            openModal();
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { isLoading, modalCreate, openModal } = this.props;
        const { dataVariant } = this.state;
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
                            onChangeInput={this.handleOnchangeInput} />

                        <FormInput name={'Tên phiên bản'} variable={'name'} value={dataVariant.name}
                            important={true}
                            onChangeInput={this.handleOnchangeInput} />
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

        dataVariants: state.variant.dataVariants,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        createVariant: (data) => dispatch(actions.createVariantRedux(data)),
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),
        setDataVariants: (data) => dispatch(actions.setDataVariantsRedux(data)),
        setDataVariant: (data) => dispatch(actions.setDataVariantRedux(data)),
        setIsEditVariant: (data) => dispatch(actions.setIsEditVariantRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));