import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
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
            return { mess: "Không được bỏ trống 'Tên quyền' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        let result = this.validationData(this.props.data_group);
        if (result.check) {
            await this.props.create_group(this.props.data_group);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("create", false);
                await this.props.get_list_group(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_group = this.props.data_group;
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

                        <FormInput name={'Tên quyền'} variable={'name'} value={data_group.name}
                            important={true}
                            onChangeInput={this.props.on_change_group} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_group: state.group.data_group,
        isLoading: state.group.isLoading,
        isResult: state.group.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_group: (dataFilter) => dispatch(actions.get_list_group_redux(dataFilter)),
        create_group: (data) => dispatch(actions.create_group_redux(data)),
        on_change_group: (id, value) => dispatch(actions.on_change_group_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));