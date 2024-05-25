import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
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
            return { mess: "Không được bỏ trống 'Tên loại thông số' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataGroupAttribute, isResult, openModal, getListGroupAttribute, editGroupAttribute, dataFilter } = this.props;
        const result = this.validationData(dataGroupAttribute);
        if (result.check) {
            await editGroupAttribute(dataGroupAttribute.id, dataGroupAttribute);
            if (isResult) {
                openModal("edit", false);
                await getListGroupAttribute(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataGroupAttribute, isLoading, onChangeGroupAttribute, modalEdit, openModal } = this.props;

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

                        <FormInput name={'Tên loại thông số'} variable={'name'} value={dataGroupAttribute.name}
                            important={true}
                            onChangeInput={onChangeGroupAttribute} />

                        <FormInput name={'Thứ tự'} variable={'priority'} value={dataGroupAttribute.priority}
                            important={false}
                            onChangeInput={onChangeGroupAttribute} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataGroupAttribute.description}
                            important={false}
                            onChangeInput={onChangeGroupAttribute} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataGroupAttribute: state.group_attribute.dataGroupAttribute,
        isLoading: state.group_attribute.isLoading,
        isResult: state.group_attribute.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListGroupAttribute: (dataFilter) => dispatch(actions.getListGroupAttributeRedux(dataFilter)),
        editGroupAttribute: (id, data) => dispatch(actions.editGroupAttributeRedux(id, data)),
        onChangeGroupAttribute: (id, value) => dispatch(actions.onChangeGroupAttributeRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));