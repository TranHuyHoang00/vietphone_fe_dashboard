import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/form_input';
import FormSelectItem from '@components/selects/form_select_item';
import ModalFooter from '@components/modal/modal_footer';
class modal_create extends Component {
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
    validation = (data) => {
        let regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!data.full_name) {
            return { mess: "Không được bỏ trống 'Họ và tên' ", code: 1 };
        }
        if (!data.phone) {
            return { mess: "Không được bỏ trống 'Số điện thoại' ", code: 1 };
        }
        if (!this.validation_phone(data?.phone)) {
            return { mess: "Số điện thoại sai định dạng", code: 1 };
        }
        if (!data.password) {
            return { mess: "Không được bỏ trống 'Mật khẩu' ", code: 1 };
        }
        if (!regex.test(data?.password)) {
            return { mess: "Mật khẩu phải > 8 kí tự, chứa chữ cái IN HOA và KÍ TỰ ĐẶC BIỆT", code: 1 };
        }
        if (!data.password2) {
            return { mess: "Không được bỏ trống 'Mật khẩu nhập lại' ", code: 1 };
        }
        if (data?.password2 !== data?.password) {
            return { mess: "Mật khẩu nhập lại không chính xác", code: 1 };
        }
        if (!data.groups || data?.groups.length === 0) {
            return { mess: "Không được bỏ trống 'Phân quyền' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_user);
        if (result.code === 0) {
            await this.props.create_user(this.props.data_user);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("create", false);
                await this.props.get_list_user(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_user = this.props.data_user;
        let data_groups = this.props.data_groups;
        let is_loading = this.props.is_loading;
        return (

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'create'}
                        is_loading={is_loading} handle_funtion={this.handle_create} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Họ và tên'} variable={'full_name'} value={data_user.full_name}
                            important={true}
                            handle_onchange_input={this.props.on_change_user} />

                        <FormInput name={'Số điện thoại'} variable={'phone'} value={data_user.phone}
                            important={true}
                            handle_onchange_input={this.props.on_change_user} />

                        <FormInput name={'Mật khẩu'} variable={'password'} value={data_user.password}
                            important={true}
                            handle_onchange_input={this.props.on_change_user} />

                        <FormInput name={'Nhập lại mật khẩu'} variable={'password2'} value={data_user.password2}
                            important={true}
                            handle_onchange_input={this.props.on_change_user} />

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
                                disabled_select={false}
                                disabled_button={true}
                                disabled_search={true}
                                variable_select={'groups'}
                                on_change_select={this.props.on_change_user}
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
        is_loading: state.user.is_loading,
        is_result: state.user.is_result,
        data_groups: state.group.data_groups,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_user: (data_filter) => dispatch(actions.get_list_user_redux(data_filter)),
        create_user: (data) => dispatch(actions.create_user_redux(data)),
        on_change_user: (id, value) => dispatch(actions.on_change_user_redux(id, value)),
        get_list_group: (data_filter) => dispatch(actions.get_list_group_redux(data_filter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));