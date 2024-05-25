import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormSelectItem from '@components/selects/formSelectItem';
import ModalFooter from '@components/modal/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        this.props.get_list_group({ page: 1, limit: 100, search: '' });
    }
    validation_phone = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    validationData = (data) => {
        let regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!data.full_name) {
            return { mess: "Không được bỏ trống 'Họ và tên' ", check: false };
        }
        if (!data.phone) {
            return { mess: "Không được bỏ trống 'Số điện thoại' ", check: false };
        }
        if (!this.validation_phone(data?.phone)) {
            return { mess: "Số điện thoại sai định dạng", check: false };
        }
        if (!data.password) {
            return { mess: "Không được bỏ trống 'Mật khẩu' ", check: false };
        }
        if (!regex.test(data?.password)) {
            return { mess: "Mật khẩu phải > 8 kí tự, chứa chữ cái IN HOA và KÍ TỰ ĐẶC BIỆT", check: false };
        }
        if (!data.password2) {
            return { mess: "Không được bỏ trống 'Mật khẩu nhập lại' ", check: false };
        }
        if (data?.password2 !== data?.password) {
            return { mess: "Mật khẩu nhập lại không chính xác", check: false };
        }
        if (!data.groups || data?.groups.length === 0) {
            return { mess: "Không được bỏ trống 'Phân quyền' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        let result = this.validationData(this.props.data_user);
        if (result.check) {
            await this.props.create_user(this.props.data_user);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("create", false);
                await this.props.get_list_user(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_user = this.props.data_user;
        let data_groups = this.props.data_groups;
        let isLoading = this.props.isLoading;
        return (

            <Modal title="TẠO MỚI" open={this.props.modalCreate}
                onCancel={() => this.props.openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Họ và tên'} variable={'full_name'} value={data_user.full_name}
                            important={true}
                            onChangeInput={this.props.on_change_user} />

                        <FormInput name={'Số điện thoại'} variable={'phone'} value={data_user.phone}
                            important={true}
                            onChangeInput={this.props.on_change_user} />

                        <FormInput name={'Mật khẩu'} variable={'password'} value={data_user.password}
                            important={true}
                            onChangeInput={this.props.on_change_user} />

                        <FormInput name={'Nhập lại mật khẩu'} variable={'password2'} value={data_user.password2}
                            important={true}
                            onChangeInput={this.props.on_change_user} />

                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Phân quyền
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <FormSelectItem width={'100%'} placeholder={'Phân quyền'}
                                mode={'multiple'}
                                value={data_user.groups}
                                options={data_groups.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                                disabledSelect={false}
                                disabledButtonCreate={true}
                                disabledSearch={true}
                                variableSelect={'groups'}
                                onChangeSelect={this.props.on_change_user}
                            />
                        </div>

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_user: state.user.data_user,
        isLoading: state.user.isLoading,
        isResult: state.user.isResult,
        data_groups: state.group.data_groups,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_user: (dataFilter) => dispatch(actions.get_list_user_redux(dataFilter)),
        create_user: (data) => dispatch(actions.create_user_redux(data)),
        on_change_user: (id, value) => dispatch(actions.on_change_user_redux(id, value)),
        get_list_group: (dataFilter) => dispatch(actions.get_list_group_redux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));