import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '../../../components/inputs/form_input';
import FormTextare from '../../../components/inputs/form_textare';
import FormSelectInput from '../../../components/selects/form_select_input';
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
        if (!data.value) {
            return { mess: "Không được bỏ trống 'Giá trị' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.props.data_attribute_value);
        if (result.code === 0) {
            let data_attribute_value = this.props.data_attribute_value;
            await this.props.edit_attribute_value(data_attribute_value.id, data_attribute_value);
            let is_result = this.props.is_result;
            if (is_result === true) {
                await this.props.get_list_attribute_value(this.props.data_filter);
                this.props.open_modal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_attribute_value = this.props.data_attribute_value;
        let data_attributes = this.props.data_attributes;
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

                        <FormInput name={'Giá trị'} variable={'value'} value={data_attribute_value.value}
                            important={true}
                            handle_onchange_input={this.props.on_change_attribute_value} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_attribute_value.description}
                            important={false}
                            handle_onchange_input={this.props.on_change_attribute_value} />

                        <FormSelectInput name={'Thông số'} variable={'attribute'} value={data_attribute_value.attribute}
                            important={true} width={'100%'}
                            options={data_attributes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            handle_onchange_input={this.props.on_change_attribute_value} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_attribute_value: state.attribute_value.data_attribute_value,
        is_loading: state.attribute_value.is_loading,
        is_result: state.attribute_value.is_result,
        data_attributes: state.attribute.data_attributes,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_attribute_value: (data_filter) => dispatch(actions.get_list_attribute_value_redux(data_filter)),
        edit_attribute_value: (id, data) => dispatch(actions.edit_attribute_value_redux(id, data)),
        on_change_attribute_value: (id, value) => dispatch(actions.on_change_attribute_value_redux(id, value)),
        get_list_attribute: (data_filter) => dispatch(actions.get_list_attribute_redux(data_filter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));