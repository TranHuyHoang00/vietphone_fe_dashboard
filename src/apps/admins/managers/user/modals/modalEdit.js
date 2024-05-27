import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormSelectMultiple from '@components/selects/formSelectMultiple';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modals/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListGroup } = this.props;
        getListGroup({ page: 1, limit: 100, search: '' });
    }
    validation_phone = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    validationData = (data) => {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!data.full_name) {
            return { mess: "Không được bỏ trống 'Họ và tên' ", check: false };
        }
        if (!data.phone) {
            return { mess: "Không được bỏ trống 'Số điện thoại' ", check: false };
        }
        if (!this.validation_phone(data?.phone)) {
            return { mess: "Số điện thoại sai định dạng", check: false };
        }
        if (data?.password) {
            if (!regex.test(data?.password)) {
                return { mess: "Mật khẩu phải > 8 kí tự, chứa chữ cái IN HOA và KÍ TỰ ĐẶC BIỆT", check: false };
            }
            if (!data.password2) {
                return { mess: "Không được bỏ trống 'Mật khẩu nhập lại' ", check: false };
            }
            if (data?.password2 !== data?.password) {
                return { mess: "Mật khẩu nhập lại không chính xác", check: false };
            }
        }

        if (!data.groups || data?.groups.length === 0) {
            return { mess: "Không được bỏ trống 'Phân quyền' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataUser, isResult, openModal, getListUser, editUser, dataFilter } = this.props;
        const result = this.validationData(dataUser);
        if (result.check) {
            await editUser(dataUser.id, dataUser);
            if (isResult) {
                openModal("edit", false);
                await getListUser(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataUser, isLoading, onChangeUser, modalEdit, openModal, dataGroups } = this.props;
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

                        <FormInput name={'Họ và tên'} variable={'full_name'} value={dataUser.full_name}
                            important={true}
                            onChangeInput={onChangeUser} />

                        <FormInput name={'Số điện thoại'} variable={'phone'} value={dataUser.phone}
                            important={true}
                            onChangeInput={onChangeUser} />

                        <FormInput name={'Mật khẩu'} variable={'password'} value={dataUser.password}
                            important={true}
                            onChangeInput={onChangeUser} />

                        <FormInput name={'Nhập lại mật khẩu'} variable={'password2'} value={dataUser.password2}
                            important={true}
                            onChangeInput={onChangeUser} />

                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Phân quyền
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <FormSelectMultiple width={'100%'} placeholder={'Phân quyền'}
                                mode={'multiple'}
                                value={dataUser.groups}
                                options={dataGroups.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                                disabledSelect={false}
                                disabledButtonCreate={true}
                                disabledSearch={true}
                                variableSelect={'groups'}
                                onChangeSelect={onChangeUser}
                            />
                        </div>
                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataUser.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={onChangeUser} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataUser: state.user.dataUser,
        isLoading: state.user.isLoading,
        isResult: state.user.isResult,
        dataGroups: state.group.dataGroups,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListUser: (dataFilter) => dispatch(actions.getListUserRedux(dataFilter)),
        editUser: (id, data) => dispatch(actions.editUserRedux(id, data)),
        onChangeUser: (id, value) => dispatch(actions.onChangeUserRedux(id, value)),
        getListGroup: (dataFilter) => dispatch(actions.getListGroupRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));