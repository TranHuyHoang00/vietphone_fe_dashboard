import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import FormSelectSingle from '@components/selects/formSelectSingle';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100 }
        }
    }
    async componentDidMount() {
        const { getListStaffRole } = this.props;
        const { dataFilter } = this.state;
        await getListStaffRole(dataFilter);
    }
    validationData = (data) => {
        return { check: true };
    }
    handleEdit = async () => {
        const { dataStaff, isResult, openModal, getListStaff, editStaff, dataFilter } = this.props;
        const result = this.validationData(dataStaff);
        if (result.check) {
            const newDataStaff = { ...dataStaff };
            if (newDataStaff?.user?.id) { delete newDataStaff.user; }
            if (newDataStaff?.role?.id) { delete newDataStaff.role; }
            await editStaff(newDataStaff.id, newDataStaff);
            if (isResult) {
                await getListStaff(dataFilter);
                openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataStaff, isLoadingStaff, isLoadingStaffRole, onChangeStaff, modalEdit, openModal, dataStaffRoles } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={400}
                maskClosable={!isLoadingStaff}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoadingStaff} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoadingStaff || isLoadingStaffRole}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Tên'} variable={'name'} value={dataStaff.name}
                            important={true} disabled={true}
                            onChangeInput={onChangeStaff} />

                        <FormInput name={'Số điện thoại'} variable={'phone_number'} value={dataStaff.phone_number}
                            important={true} disabled={true}
                            onChangeInput={onChangeStaff} />

                        <FormSelectSingle
                            name={'Trạng thái'} variable={'status'} value={dataStaff.status}
                            important={false} width={'100%'}
                            options={[
                                { value: 'active', label: 'Mở' },
                                { value: 'inactive', label: 'Khóa' },
                            ]}
                            onChangeInput={onChangeStaff} />

                        <FormSelectSingle
                            name={'Phân quyền'} variable={'role'} value={dataStaff.role}
                            important={false} width={'100%'}
                            options={[
                                { label: 'Bỏ trống', value: '' },
                                ...dataStaffRoles && dataStaffRoles
                                    .map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    })),
                            ]}
                            onChangeInput={onChangeStaff} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataStaff: state.staff.dataStaff,
        isLoadingStaff: state.staff.isLoading,
        isResult: state.staff.isResult,

        dataStaffRoles: state.staffRole.dataStaffRoles,
        isLoadingStaffRole: state.staffRole.isLoading,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListStaff: (dataFilter) => dispatch(actions.getListStaffRedux(dataFilter)),
        editStaff: (id, data) => dispatch(actions.editStaffRedux(id, data)),
        onChangeStaff: (id, value) => dispatch(actions.onChangeStaffRedux(id, value)),

        getListStaffRole: (dataFilter) => dispatch(actions.getListStaffRoleRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));