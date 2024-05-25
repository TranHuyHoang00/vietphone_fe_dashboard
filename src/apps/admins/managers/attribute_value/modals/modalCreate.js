import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormSelectInput from '@components/selects/formSelectInput';
import ModalFooter from '@components/modal/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        this.props.getListAttribute({ page: 1, limit: 100, search: '' });
    }
    validationData = (data) => {
        if (!data.value) {
            return { mess: "Không được bỏ trống 'Giá trị' ", check: false };
        }
        if (!data.attribute) {
            return { mess: "Không được bỏ trống 'Thông số' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        let result = this.validationData(this.props.data_attribute_value);
        if (result.check) {
            await this.props.create_attribute_value(this.props.data_attribute_value);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("create", false);
                await this.props.get_list_attribute_value(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_attribute_value = this.props.data_attribute_value;
        let dataAttributes = this.props.dataAttributes;
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

                        <FormInput name={'Giá trị'} variable={'value'} value={data_attribute_value.value}
                            important={true}
                            onChangeInput={this.props.on_change_attribute_value} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_attribute_value.description}
                            important={false}
                            onChangeInput={this.props.on_change_attribute_value} />

                        <FormSelectInput name={'Thông số'} variable={'attribute'} value={data_attribute_value.attribute}
                            important={true} width={'100%'}
                            options={dataAttributes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            onChangeInput={this.props.on_change_attribute_value} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_attribute_value: state.attribute_value.data_attribute_value,
        isLoading: state.attribute_value.isLoading,
        isResult: state.attribute_value.isResult,
        dataAttributes: state.attribute.dataAttributes,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_attribute_value: (dataFilter) => dispatch(actions.get_list_attribute_value_redux(dataFilter)),
        create_attribute_value: (data) => dispatch(actions.create_attribute_value_redux(data)),
        on_change_attribute_value: (id, value) => dispatch(actions.on_change_attribute_value_redux(id, value)),
        getListAttribute: (dataFilter) => dispatch(actions.getListAttributeRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));