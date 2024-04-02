import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin } from 'antd';
import Form_input from '../../../components/inputs/form_input';
import Form_textare from '../../../components/inputs/form_textare';
import Modal_footer from '../../../components/modal/modal_footer';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validation = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên loại thông số' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_group_attribute);
        if (result.code == 0) {
            await this.props.create_group_attribute(this.props.data_group_attribute);
            let is_result = this.props.is_result;
            if (is_result == true) {
                await this.props.get_list_group_attribute(this.props.data_filter);
                this.props.open_modal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_group_attribute = this.props.data_group_attribute;
        let is_loading = this.props.is_loading;
        return (

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <Modal_footer open_modal={this.props.open_modal} type={'create'}
                        is_loading={is_loading} handle_funtion={this.handle_create} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <Form_input name={'Tên loại thông số'} variable={'name'} value={data_group_attribute.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_group_attribute} />

                        <Form_input name={'Thứ tự'} variable={'priority'} value={data_group_attribute.priority}
                            important={false}
                            handle_onchange_input={this.props.on_change_group_attribute} />

                        <Form_textare name={'Mô tả'} variable={'description'} value={data_group_attribute.description}
                            important={false}
                            handle_onchange_input={this.props.on_change_group_attribute} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_group_attribute: state.group_attribute.data_group_attribute,
        is_loading: state.group_attribute.is_loading,
        is_result: state.group_attribute.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_group_attribute: (data_filter) => dispatch(actions.get_list_group_attribute_redux(data_filter)),
        create_group_attribute: (data) => dispatch(actions.create_group_attribute_redux(data)),
        on_change_group_attribute: (id, value) => dispatch(actions.on_change_group_attribute_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));