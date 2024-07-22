import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, Spin, message } from 'antd';
import ModalFooter from '@components/modals/modalFooter';
import FormInput from '@components/inputs/formInput';
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
    handleEdit = async () => {
        const { dataStaffRole, isResult, openModal, getListStaffRole, editStaffRole, dataFilter } = this.props;
        const result = this.validationData(dataStaffRole);
        if (result.check) {
            await editStaffRole(dataStaffRole.id, dataStaffRole);
            if (isResult) {
                openModal("edit", false);
                await getListStaffRole(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }


    render() {
        const { modalEdit, openModal, dataStaffRole, onChangeStaffRole, isLoading } = this.props;
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
                        <FormInput name={'Code'} variable={'code'} value={dataStaffRole?.code}
                            important={true}
                            onChangeInput={onChangeStaffRole} />
                        <FormInput name={'Tên quyền'} variable={'name'} value={dataStaffRole?.name}
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
        editStaffRole: (id, data) => dispatch(actions.editStaffRoleRedux(id, data)),
        onChangeStaffRole: (id, value) => dispatch(actions.onChangeStaffRoleRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));