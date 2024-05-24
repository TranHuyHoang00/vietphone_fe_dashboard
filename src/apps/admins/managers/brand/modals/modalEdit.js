import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormImage from '@components/inputs/formImage';
import FormSelectInput from '@components/selects/formSelectInput';
import ModalFooter from '@components/modal/modalFooter';
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
        let result = this.validationData(this.props.data_brand);
        if (result.check) {
            let data_brand = this.props.data_brand;
            if (this.state.isEditImage === false) {
                delete data_brand.image;
            }
            await this.props.edit_brand(data_brand.id, data_brand);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("edit", false);
                await this.props.get_list_brand(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = (image) => {
        this.setState({ isEditImage: true, })
        this.props.on_change_brand(image, 'image');
    }
    render() {
        let data_brand = this.props.data_brand;
        let isLoading = this.props.isLoading;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modalEdit}
                onCancel={() => this.props.openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormImage name={'Ảnh'} variable={'image'} value={data_brand.image}
                            important={true}
                            htmlFor={'loadImageEdit'} width={200} height={100}
                            onChangeImage={this.onChangeImage} />

                        <FormInput name={'Tên thương hiệu'} variable={'name'} value={data_brand.name}
                            important={true}
                            onChangeInput={this.props.on_change_brand} />

                        <FormInput name={'Icon'} variable={'icon'} value={data_brand.icon}
                            important={false}
                            onChangeInput={this.props.on_change_brand} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_brand.description}
                            important={false}
                            onChangeInput={this.props.on_change_brand} />

                        <FormSelectInput name={'Trạng thái'} variable={'is_active'} value={data_brand.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={this.props.on_change_brand} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_brand: state.brand.data_brand,
        isLoading: state.brand.isLoading,
        isResult: state.brand.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_brand: (dataFilter) => dispatch(actions.get_list_brand_redux(dataFilter)),
        edit_brand: (id, data) => dispatch(actions.edit_brand_redux(id, data)),
        on_change_brand: (id, value) => dispatch(actions.on_change_brand_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));