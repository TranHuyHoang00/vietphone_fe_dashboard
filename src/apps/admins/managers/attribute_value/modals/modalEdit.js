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
        const { getListAttribute } = this.props;
        getListAttribute({ page: 1, limit: 100, search: '' });
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
        const { dataAttributeValue, isResult, openModal, getListAttributeValue, editAttributeValue, dataFilter } = this.props;
        const result = this.validationData(dataAttributeValue);
        if (result.check) {
            await editAttributeValue(dataAttributeValue.id, dataAttributeValue);
            if (isResult) {
                openModal("edit", false);
                await getListAttributeValue(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataAttributeValue, isLoading, onChangeAttributeValue, modalEdit, openModal, dataAttributes } = this.props;
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

                        <FormInput name={'Giá trị'} variable={'value'} value={dataAttributeValue.value}
                            important={true}
                            onChangeInput={onChangeAttributeValue} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataAttributeValue.description}
                            important={false}
                            onChangeInput={onChangeAttributeValue} />

                        <FormSelectInput name={'Thông số'} variable={'attribute'} value={(dataAttributeValue?.attribute?.id) ? (dataAttributeValue?.attribute?.id) : (dataAttributeValue?.attribute)}
                            important={true} width={'100%'}
                            options={dataAttributes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            onChangeInput={onChangeAttributeValue} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataAttributeValue: state.attribute_value.dataAttributeValue,
        isLoading: state.attribute_value.isLoading,
        isResult: state.attribute_value.isResult,
        dataAttributes: state.attribute.dataAttributes,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListAttributeValue: (dataFilter) => dispatch(actions.getListAttributeValueRedux(dataFilter)),
        editAttributeValue: (id, data) => dispatch(actions.editAttributeValueRedux(id, data)),
        onChangeAttributeValue: (id, value) => dispatch(actions.onChangeAttributeValueRedux(id, value)),
        getListAttribute: (dataFilter) => dispatch(actions.getListAttributeRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));