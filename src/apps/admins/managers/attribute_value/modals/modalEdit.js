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
    handleEdit = async () => {
        let result = this.validationData(this.props.data_attribute_value);
        if (result.check) {
            let data_attribute_value = this.props.data_attribute_value;
            await this.props.edit_attribute_value(data_attribute_value.id, data_attribute_value);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("edit", false);
                await this.props.get_list_attribute_value(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_attribute_value = this.props.data_attribute_value;
        let data_attributes = this.props.data_attributes;
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

                        <FormInput name={'Giá trị'} variable={'value'} value={data_attribute_value.value}
                            important={true}
                            onChangeInput={this.props.on_change_attribute_value} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_attribute_value.description}
                            important={false}
                            onChangeInput={this.props.on_change_attribute_value} />

                        <FormSelectInput name={'Thông số'} variable={'attribute'} value={(data_attribute_value?.attribute?.id) ? (data_attribute_value?.attribute?.id) : (data_attribute_value?.attribute)}
                            important={true} width={'100%'}
                            options={data_attributes.map((item) => ({
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
        data_attributes: state.attribute.data_attributes,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_attribute_value: (dataFilter) => dispatch(actions.get_list_attribute_value_redux(dataFilter)),
        edit_attribute_value: (id, data) => dispatch(actions.edit_attribute_value_redux(id, data)),
        on_change_attribute_value: (id, value) => dispatch(actions.on_change_attribute_value_redux(id, value)),
        get_list_attribute: (dataFilter) => dispatch(actions.get_list_attribute_redux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));