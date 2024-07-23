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
    handleCreate = async () => {
        const { dataRepair, isResult, openModal, getListRepair, createRepair, dataFilter } = this.props;
        const result = this.validationData(dataRepair);
        if (result.check) {
            await createRepair(dataRepair);
            if (isResult) {
                await getListRepair(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataRepair, isLoading, onChangeRepair, modalCreate, openModal } = this.props;
        return (
            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <FormInput name={'Giá trị'} variable={'value'} value={dataRepair?.value}
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
        createRepair: (data) => dispatch(actions.createRepairRedux(data)),
        onChangeRepair: (id, value) => dispatch(actions.onChangeRepairRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));