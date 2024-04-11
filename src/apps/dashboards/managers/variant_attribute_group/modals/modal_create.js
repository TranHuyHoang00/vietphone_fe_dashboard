import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '../../../components/inputs/form_input';
import ModalFooter from '../../../components/modal/modal_footer';
import FormSelectItem from '../../../components/selects/form_select_item';

class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        this.props.get_list_attribute({ page: 1, limit: 100, search: '' })
    }
    validation = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'TS-SP' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_variant_attribute_group);
        if (result.code === 0) {
            await this.props.create_variant_attribute_group(this.props.data_variant_attribute_group);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("create", false);
                await this.props.get_list_variant_attribute_group(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_variant_attribute_group = this.props.data_variant_attribute_group;
        let is_loading = this.props.is_loading;
        let data_attributes = this.props.data_attributes;
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

                        <FormInput name={'Tên TS-SP'} variable={'name'} value={data_variant_attribute_group.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_variant_attribute_group} />

                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Thông số
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <FormSelectItem width={'100%'} mode={'multiple'}
                                variable_select={'attribute'}
                                value={data_variant_attribute_group.variant_attribute_group}
                                on_change_select={this.props.on_change_variant_attribute_group}
                                options={data_attributes.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                                disabled_select={false}
                                disabled_button={true}
                                disabled_search={true}
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
        data_variant_attribute_group: state.variant_attribute_group.data_variant_attribute_group,
        is_loading: state.variant_attribute_group.is_loading,
        is_result: state.variant_attribute_group.is_result,
        data_attributes: state.attribute.data_attributes,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_variant_attribute_group: (data_filter) => dispatch(actions.get_list_variant_attribute_group_redux(data_filter)),
        create_variant_attribute_group: (data) => dispatch(actions.create_variant_attribute_group_redux(data)),
        on_change_variant_attribute_group: (id, value) => dispatch(actions.on_change_variant_attribute_group_redux(id, value)),
        get_list_attribute: (data_filter) => dispatch(actions.get_list_attribute_redux(data_filter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));