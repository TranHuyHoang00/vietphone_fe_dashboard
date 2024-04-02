import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '../../../components/inputs/form_input';
import FormTextare from '../../../components/inputs/form_textare';
import ModalFooter from '../../../components/modal/modal_footer';
class modal_edit extends Component {
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
    handle_edit = async () => {
        let result = this.validation(this.props.data_group_attribute);
        if (result.code === 0) {
            let data_group_attribute = this.props.data_group_attribute;
            await this.props.edit_group_attribute(data_group_attribute.id, data_group_attribute);
            let is_result = this.props.is_result;
            if (is_result === true) {
                await this.props.get_list_group_attribute(this.props.data_filter);
                this.props.open_modal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_group_attribute = this.props.data_group_attribute;
        let is_loading = this.props.is_loading;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'edit'}
                        is_loading={is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Tên loại thông số'} variable={'name'} value={data_group_attribute.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_group_attribute} />

                        <FormInput name={'Thứ tự'} variable={'priority'} value={data_group_attribute.priority}
                            important={false}
                            handle_onchange_input={this.props.on_change_group_attribute} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_group_attribute.description}
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
        edit_group_attribute: (id, data) => dispatch(actions.edit_group_attribute_redux(id, data)),
        on_change_group_attribute: (id, value) => dispatch(actions.on_change_group_attribute_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));