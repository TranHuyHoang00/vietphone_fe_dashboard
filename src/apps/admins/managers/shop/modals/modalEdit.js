import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormImage from '@components/inputs/formImage';
import ModalFooter from '@components/modals/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditImage: false,
        }
    }
    async componentDidMount() {
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên cửa hàng' ", check: false };
        }
        if (!data.address) {
            return { mess: "Không được bỏ trống 'Địa chỉ' ", check: false };
        }
        if (!data.google_map_url) {
            return { mess: "Không được bỏ trống 'Google map' ", check: false };
        }
        if (!data.ward) {
            return { mess: "Không được bỏ trống 'Ward' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataShop, isResult, openModal, getListShop, editShop, dataFilter } = this.props;
        const { isEditImage } = this.state;
        const result = this.validationData(dataShop);
        let newDataShop = { ...dataShop };
        if (result.check) {
            if (isEditImage === false) { delete newDataShop.image; }
            if (newDataShop?.ward?.id) { delete newDataShop.ward; }
            await editShop(newDataShop.id, newDataShop);
            if (isResult) {
                await getListShop(dataFilter);
                openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = (image) => {
        const { onChangeShop } = this.props;
        this.setState({ isEditImage: true, })
        onChangeShop(image, 'image');
    }
    render() {
        const { dataShop, isLoading, onChangeShop, modalEdit, openModal } = this.props;
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

                        <FormImage name={'Ảnh'} variable={'image'} value={dataShop.image}
                            important={true}
                            htmlFor={'loadImageEdit'} width={100} height={100}
                            onChangeImage={this.onChangeImage} />

                        <FormInput name={'Tên cửa hàng'} variable={'name'} value={dataShop.name}
                            important={true}
                            onChangeInput={onChangeShop} />

                        <FormInput name={'Địa chỉ'} variable={'address'} value={dataShop.address}
                            important={true}
                            onChangeInput={onChangeShop} />

                        <FormInput name={'Ward'} variable={'ward'} value={dataShop?.ward?.id}
                            important={true}
                            onChangeInput={onChangeShop} />
                        <FormTextare name={'Google Map'} variable={'google_map_url'} value={dataShop.google_map_url}
                            important={true}
                            onChangeInput={onChangeShop} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataShop.description}
                            important={false}
                            onChangeInput={onChangeShop} />


                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataShop: state.shop.dataShop,
        isLoading: state.shop.isLoading,
        isResult: state.shop.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListShop: (dataFilter) => dispatch(actions.getListShopRedux(dataFilter)),
        editShop: (id, data) => dispatch(actions.editShopRedux(id, data)),
        onChangeShop: (id, value) => dispatch(actions.onChangeShopRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));