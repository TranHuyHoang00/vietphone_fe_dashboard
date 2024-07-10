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
        if (!data.code) {
            return { mess: "Không được bỏ trống 'Code' ", check: false };
        }
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên quyền' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataStaffRole, isResult, openModal, getListStaffRole, createStaffRole, dataFilter } = this.props;
        const result = this.validationData(dataStaffRole);
        if (result.check) {
            await createStaffRole(dataStaffRole);
            if (isResult) {
                await getListStaffRole(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataStaffRole, isLoading, onChangeStaffRole, modalCreate, openModal } = this.props;
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
                        <FormInput name={'Code'} variable={'code'} value={dataStaffRole.code}
                            important={true}
                            onChangeInput={onChangeStaffRole} />
                        <FormInput name={'Tên quyền'} variable={'name'} value={dataStaffRole.name}
                            important={true}
                            onChangeInput={onChangeStaffRole} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataStaffRole: state.staffRole.dataStaffRole,
        isLoading: state.staffRole.isLoading,
        isResult: state.staffRole.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListStaffRole: (dataFilter) => dispatch(actions.getListStaffRoleRedux(dataFilter)),
        createStaffRole: (data) => dispatch(actions.createStaffRoleRedux(data)),
        onChangeStaffRole: (id, value) => dispatch(actions.onChangeStaffRoleRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));