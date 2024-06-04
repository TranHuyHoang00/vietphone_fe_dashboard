import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
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
        return { check: true };
    }
    handleEdit = async () => {
        const { dataRepair, isResult, openModal, getListRepair, editRepair, dataFilter } = this.props;
        const result = this.validationData(dataRepair);
        if (result.check) {
            await editRepair(dataRepair.id, dataRepair);
            if (isResult) {
                openModal("edit", false);
                await getListRepair(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataRepair, isLoading, onChangeRepair, modalEdit, openModal } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={800}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <FormInput name={'Giá trị'} variable={'value'} value={dataRepair.value}
                            important={true}
                            onChangeInput={onChangeRepair} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataRepair: state.repair.dataRepair,
        isLoading: state.repair.isLoading,
        isResult: state.repair.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListRepair: (dataFilter) => dispatch(actions.getListRepairRedux(dataFilter)),
        editRepair: (id, data) => dispatch(actions.editRepairRedux(id, data)),
        onChangeRepair: (id, value) => dispatch(actions.onChangeRepairRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));