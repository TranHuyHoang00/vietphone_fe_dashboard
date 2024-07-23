import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modals/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListGroupAttribute } = this.props;
        getListGroupAttribute({ page: 1, limit: process.env.REACT_APP_API_LIMIT });
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên thông số' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataAttribute, isResult, openModal, getListAttribute, editAttribute, dataFilter } = this.props;
        const result = this.validationData(dataAttribute);
        if (result.check) {
            await editAttribute(dataAttribute.id, dataAttribute);
            if (isResult) {
                openModal("edit", false);
                await getListAttribute(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataAttribute, isLoading, onChangeAttribute, modalEdit, openModal, dataGroupAttributes } = this.props;
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

                        <FormInput name={'Tên thông số'} variable={'name'} value={dataAttribute?.name}
                            important={true}
                            onChangeInput={onChangeAttribute} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataAttribute?.description}
                            important={false}
                            onChangeInput={onChangeAttribute} />

                        <FormSelectSingle name={'Loại thông số'} variable={'group_attribute'} value={dataAttribute?.group_attribute}
                            important={true} width={'100%'}
                            options={dataGroupAttributes.map((item) => ({
                                label: item?.name,
                                value: item?.id,
                            }))}
                            onChangeInput={onChangeAttribute} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataAttribute: state.attribute.dataAttribute,
        isLoading: state.attribute.isLoading,
        isResult: state.attribute.isResult,
        dataGroupAttributes: state.groupAttribute.dataGroupAttributes,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListAttribute: (dataFilter) => dispatch(actions.getListAttributeRedux(dataFilter)),
        editAttribute: (id, data) => dispatch(actions.editAttributeRedux(id, data)),
        onChangeAttribute: (id, value) => dispatch(actions.onChangeAttributeRedux(id, value)),
        getListGroupAttribute: (dataFilter) => dispatch(actions.getListGroupAttributeRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));