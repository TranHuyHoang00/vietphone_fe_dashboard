import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormImage from '@components/inputs/formImage';
import ModalFooter from '@components/modals/modalFooter';
import FormSelectSingle from '@components/selects/formSelectSingle';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    handleCreate = async () => {
        const { dataShop, isResult, openModal, getListShop, createShop, dataFilter } = this.props;
        const result = this.validationData(dataShop);
        if (result.check) {
            await createShop(dataShop);
            if (isResult) {
                await getListShop(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataShop, isLoading, onChangeShop, modalCreate, openModal, } = this.props;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormImage name={'Ảnh'} variable={'image'} value={dataShop?.image}
                            important={true}
                            htmlFor={'loadImageCreate'} width={100} height={100}
                            onChangeInput={onChangeShop} />

                        <FormInput name={'Tên cửa hàng'} variable={'name'} value={dataShop?.name}
                            important={true}
                            onChangeInput={onChangeShop} />

                        <FormInput name={'Địa chỉ'} variable={'address'} value={dataShop?.address}
                            important={true}
                            onChangeInput={onChangeShop} />

                        <FormInput name={'Ward'} variable={'ward'} value={dataShop?.ward}
                            important={true}
                            onChangeInput={onChangeShop} />
                        <FormTextare name={'Google Map'} variable={'google_map_url'} value={dataShop?.google_map_url}
                            important={true}
                            onChangeInput={onChangeShop} />

                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataShop?.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={onChangeShop} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataShop?.description}
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
        createShop: (data) => dispatch(actions.createShopRedux(data)),
        onChangeShop: (id, value) => dispatch(actions.onChangeShopRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));