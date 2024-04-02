import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '../../../components/inputs/form_input';
import FormTextare from '../../../components/inputs/form_textare';
import FormSelectInput from '../../../components/selects/form_select_input';
import ModalFooter from '../../../components/modal/modal_footer';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        this.props.get_list_group_attribute({ page: 1, limit: 100, search_query: '' });
    }
    validation = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên thông số' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_attribute);
        if (result.code === 0) {
            await this.props.create_attribute(this.props.data_attribute);
            let is_result = this.props.is_result;
            if (is_result === true) {
                await this.props.get_list_attribute(this.props.data_filter);
                this.props.open_modal("create", false);
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

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'create'}
                        is_loading={is_loading} handle_funtion={this.handle_create} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <FormInput name={'CODE'} variable={'code'} value={data_attribute.code}
                            important={false}
                            handle_onchange_input={this.props.on_change_attribute} />

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
        create_attribute: (data) => dispatch(actions.create_attribute_redux(data)),
        on_change_attribute: (id, value) => dispatch(actions.on_change_attribute_redux(id, value)),
        get_list_group_attribute: (data_filter) => dispatch(actions.get_list_group_attribute_redux(data_filter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));