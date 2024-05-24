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
    handleCreate = async () => {
        let result = this.validationData(this.props.data_brand);
        if (result.check) {
            await this.props.create_brand(this.props.data_brand);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("create", false);
                await this.props.get_list_brand(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_brand = this.props.data_brand;
        let isLoading = this.props.isLoading;
        return (

            <Modal title="TẠO MỚI" open={this.props.modalCreate}
                onCancel={() => this.props.openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormImage name={'Ảnh'} variable={'image'} value={data_brand.image}
                            important={true}
                            htmlFor={'loadImageCreate'} width={200} height={100}
                            onChangeInput={this.props.on_change_brand} />

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
        create_brand: (data) => dispatch(actions.create_brand_redux(data)),
        on_change_brand: (id, value) => dispatch(actions.on_change_brand_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));