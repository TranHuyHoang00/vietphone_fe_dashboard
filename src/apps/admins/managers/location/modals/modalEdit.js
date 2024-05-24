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
            return { mess: "Không được bỏ trống 'Tên vị trí' ", check: false };
        }
        if (!data.code) {
            return { mess: "Không được bỏ trống 'Code' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        let result = this.validationData(this.props.data_location);
        if (result.check) {
            let data_location = this.props.data_location;
            await this.props.edit_location(data_location.id, data_location);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("edit", false);
                await this.props.get_list_location(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_location = this.props.data_location;
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

                        <FormInput name={'Code'} variable={'code'} value={data_location.code}
                            important={false}
                            onChangeInput={this.props.on_change_location} />

                        <FormInput name={'Tên vị trí'} variable={'name'} value={data_location.name}
                            important={true}
                            onChangeInput={this.props.on_change_location} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_location: state.location.data_location,
        isLoading: state.location.isLoading,
        isResult: state.location.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_location: (dataFilter) => dispatch(actions.get_list_location_redux(dataFilter)),
        edit_location: (id, data) => dispatch(actions.edit_location_redux(id, data)),
        on_change_location: (id, value) => dispatch(actions.on_change_location_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));