import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modal/modalFooter';
import FormSelectItem from '@components/selects/form_select_item';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        this.props.get_list_attribute({ page: 1, limit: 100, search: '' })
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'TS-SP' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        let result = this.validationData(this.props.data_variant_attribute_group);
        if (result.check) {
            await this.props.create_variant_attribute_group(this.props.data_variant_attribute_group);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("create", false);
                await this.props.get_list_variant_attribute_group(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_variant_attribute_group = this.props.data_variant_attribute_group;
        let isLoading = this.props.isLoading;
        let data_attributes = this.props.data_attributes;
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

                        <FormInput name={'Tên TS-SP'} variable={'name'} value={data_variant_attribute_group.name}
                            important={true}
                            onChangeInput={this.props.on_change_variant_attribute_group} />

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
        isLoading: state.variant_attribute_group.isLoading,
        isResult: state.variant_attribute_group.isResult,
        data_attributes: state.attribute.data_attributes,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_variant_attribute_group: (dataFilter) => dispatch(actions.get_list_variant_attribute_group_redux(dataFilter)),
        create_variant_attribute_group: (data) => dispatch(actions.create_variant_attribute_group_redux(data)),
        on_change_variant_attribute_group: (id, value) => dispatch(actions.on_change_variant_attribute_group_redux(id, value)),
        get_list_attribute: (dataFilter) => dispatch(actions.get_list_attribute_redux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));