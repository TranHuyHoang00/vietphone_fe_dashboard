import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormSelectInput from '@components/selects/formSelectInput';
import ModalFooter from '@components/modal/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        this.props.get_list_group_attribute({ page: 1, limit: 100, search: '' });
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên thông số' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        let result = this.validationData(this.props.data_attribute);
        if (result.check) {
            await this.props.create_attribute(this.props.data_attribute);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("create", false);
                await this.props.get_list_attribute(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_attribute = this.props.data_attribute;
        let data_group_attributes = this.props.data_group_attributes;
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

                        <FormInput name={'Tên thông số'} variable={'name'} value={data_attribute.name}
                            important={true}
                            onChangeInput={this.props.on_change_attribute} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_attribute.description}
                            important={false}
                            onChangeInput={this.props.on_change_attribute} />

                        <FormSelectInput name={'Loại thông số'} variable={'group_attribute'} value={data_attribute.group_attribute}
                            important={true} width={'100%'}
                            options={data_group_attributes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            onChangeInput={this.props.on_change_attribute} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_attribute: state.attribute.data_attribute,
        isLoading: state.attribute.isLoading,
        isResult: state.attribute.isResult,
        data_group_attributes: state.group_attribute.data_group_attributes,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_attribute: (dataFilter) => dispatch(actions.get_list_attribute_redux(dataFilter)),
        create_attribute: (data) => dispatch(actions.create_attribute_redux(data)),
        on_change_attribute: (id, value) => dispatch(actions.on_change_attribute_redux(id, value)),
        get_list_group_attribute: (dataFilter) => dispatch(actions.get_list_group_attribute_redux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));