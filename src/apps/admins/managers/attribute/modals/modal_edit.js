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
        this.props.get_list_group_attribute({ page: 1, limit: 100, search: '' });
    }
    validation = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên thông số' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.props.data_attribute);
        if (result.code === 0) {
            let data_attribute = this.props.data_attribute;
            await this.props.edit_attribute(data_attribute.id, data_attribute);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("edit", false);
                await this.props.get_list_attribute(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_attribute = this.props.data_attribute;
        let data_group_attributes = this.props.data_group_attributes;
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

                        <FormInput name={'Tên thông số'} variable={'name'} value={data_attribute.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_attribute} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_attribute.description}
                            important={false}
                            handle_onchange_input={this.props.on_change_attribute} />

                        <FormSelectInput name={'Loại thông số'} variable={'group_attribute'} value={data_attribute.group_attribute}
                            important={true} width={'100%'}
                            options={data_group_attributes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            handle_onchange_input={this.props.on_change_attribute} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_attribute: state.attribute.data_attribute,
        is_loading: state.attribute.is_loading,
        is_result: state.attribute.is_result,
        data_group_attributes: state.group_attribute.data_group_attributes,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_attribute: (data_filter) => dispatch(actions.get_list_attribute_redux(data_filter)),
        edit_attribute: (id, data) => dispatch(actions.edit_attribute_redux(id, data)),
        on_change_attribute: (id, value) => dispatch(actions.on_change_attribute_redux(id, value)),
        get_list_group_attribute: (data_filter) => dispatch(actions.get_list_group_attribute_redux(data_filter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));