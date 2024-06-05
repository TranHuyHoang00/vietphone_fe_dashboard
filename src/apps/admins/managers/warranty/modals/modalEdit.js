import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import FormTextare from '@components/inputs/formTextare';
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
            return { mess: "Không được bỏ trống 'Tên' ", check: false };
        }
        if (!data.content) {
            return { mess: "Không được bỏ trống 'Nội dung' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataWarranty, isResult, openModal, getListWarranty, editWarranty, dataFilter } = this.props;
        const result = this.validationData(dataWarranty);
        if (result.check) {
            await editWarranty(dataWarranty.id, dataWarranty);
            if (isResult) {
                openModal("edit", false);
                await getListWarranty(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataWarranty, isLoading, onChangeWarranty, modalEdit, openModal } = this.props;
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
                        <FormInput name={'Tên'} variable={'name'} value={dataWarranty.name}
                            important={true}
                            onChangeInput={onChangeWarranty} />

                        <FormTextare name={'Nội dung'} variable={'content'} value={dataWarranty.content}
                            important={true}
                            onChangeInput={onChangeWarranty} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataWarranty: state.warranty.dataWarranty,
        isLoading: state.warranty.isLoading,
        isResult: state.warranty.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListWarranty: (dataFilter) => dispatch(actions.getListWarrantyRedux(dataFilter)),
        editWarranty: (id, data) => dispatch(actions.editWarrantyRedux(id, data)),
        onChangeWarranty: (id, value) => dispatch(actions.onChangeWarrantyRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));