import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import ModalFooter from '@components/modal/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên loại thông số' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        let result = this.validationData(this.props.data_group_attribute);
        if (result.check) {
            let data_group_attribute = this.props.data_group_attribute;
            await this.props.edit_group_attribute(data_group_attribute.id, data_group_attribute);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("edit", false);
                await this.props.get_list_group_attribute(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_group_attribute = this.props.data_group_attribute;
        let isLoading = this.props.isLoading;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modalEdit}
                onCancel={() => this.props.openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Tên loại thông số'} variable={'name'} value={data_group_attribute.name}
                            important={true}
                            onChangeInput={this.props.on_change_group_attribute} />

                        <FormInput name={'Thứ tự'} variable={'priority'} value={data_group_attribute.priority}
                            important={false}
                            onChangeInput={this.props.on_change_group_attribute} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_group_attribute.description}
                            important={false}
                            onChangeInput={this.props.on_change_group_attribute} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_group_attribute: state.group_attribute.data_group_attribute,
        isLoading: state.group_attribute.isLoading,
        isResult: state.group_attribute.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_group_attribute: (dataFilter) => dispatch(actions.get_list_group_attribute_redux(dataFilter)),
        edit_group_attribute: (id, data) => dispatch(actions.edit_group_attribute_redux(id, data)),
        on_change_group_attribute: (id, value) => dispatch(actions.on_change_group_attribute_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));