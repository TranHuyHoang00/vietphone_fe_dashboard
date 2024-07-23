import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormImage from '@components/inputs/formImage';
import FormSelectSingle from '@components/selects/formSelectSingle';
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
            return { mess: "Không được bỏ trống 'Tên thương hiệu' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataBrand, isResult, openModal, getListBrand, editBrand, dataFilter } = this.props;
        const { isEditImage } = this.state;
        const result = this.validationData(dataBrand);
        let newDataBrand = { ...dataBrand };
        if (result.check) {
            if (isEditImage === false) { delete newDataBrand.image; }
            await editBrand(newDataBrand.id, newDataBrand);
            if (isResult) {
                await getListBrand(dataFilter);
                openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = (image) => {
        const { onChangeBrand } = this.props;
        this.setState({ isEditImage: true, })
        onChangeBrand(image, 'image');
    }
    render() {
        const { dataBrand, isLoading, onChangeBrand, modalEdit, openModal } = this.props;
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

                        <FormImage name={'Ảnh'} variable={'image'} value={dataBrand?.image}
                            important={true}
                            htmlFor={'loadImageEdit'} width={240} height={80}
                            onChangeImage={this.onChangeImage} />

                        <FormInput name={'Tên thương hiệu'} variable={'name'} value={dataBrand?.name}
                            important={true}
                            onChangeInput={onChangeBrand} />

                        <FormInput name={'Icon'} variable={'icon'} value={dataBrand?.icon}
                            important={false}
                            onChangeInput={onChangeBrand} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataBrand?.description}
                            important={false}
                            onChangeInput={onChangeBrand} />

                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataBrand?.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={onChangeBrand} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataBrand: state.brand.dataBrand,
        isLoading: state.brand.isLoading,
        isResult: state.brand.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListBrand: (dataFilter) => dispatch(actions.getListBrandRedux(dataFilter)),
        editBrand: (id, data) => dispatch(actions.editBrandRedux(id, data)),
        onChangeBrand: (id, value) => dispatch(actions.onChangeBrandRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));