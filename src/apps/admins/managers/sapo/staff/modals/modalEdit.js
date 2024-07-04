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
        }
    }
    async componentDidMount() {
    }
    validationData = (data) => {
        if (!data.code) {
            return { mess: "Không được bỏ trống 'Code' ", check: false };
        }
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên loại sản phẩm' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataStaff, isResult, openModal, getListStaff, editStaff, dataFilter } = this.props;
        const result = this.validationData(dataStaff);
        if (result.check) {
            await editStaff(dataStaff.id, dataStaff);
            if (isResult) {
                await getListStaff(dataFilter);
                openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataStaff, isLoading, onChangeStaff, modalEdit, openModal } = this.props;
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

                        <FormInput name={'Code'} variable={'code'} value={dataStaff.code}
                            important={true}
                            onChangeInput={onChangeStaff} />

                        <FormInput name={'Tên loại sản phẩm'} variable={'name'} value={dataStaff.name}
                            important={true}
                            onChangeInput={onChangeStaff} />

                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataStaff.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
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
        isLoading: state.staff.isLoading,
        isResult: state.staff.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListStaff: (dataFilter) => dispatch(actions.getListStaffRedux(dataFilter)),
        editStaff: (id, data) => dispatch(actions.editStaffRedux(id, data)),
        onChangeStaff: (id, value) => dispatch(actions.onChangeStaffRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));