import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '../../../components/inputs/form_input';
import ModalFooter from '../../../components/modal/modal_footer';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validation = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên vị trí' ", code: 1 };
        }
        if (!data.code) {
            return { mess: "Không được bỏ trống 'Code' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_location);
        if (result.code === 0) {
            await this.props.create_location(this.props.data_location);
            let is_result = this.props.is_result;
            if (is_result === true) {
                await this.props.get_list_location(this.props.data_filter);
                this.props.open_modal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_location = this.props.data_location;
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

                        <FormInput name={'Code'} variable={'code'} value={data_location.code}
                            important={false}
                            handle_onchange_input={this.props.on_change_location} />

                        <FormInput name={'Tên vị trí'} variable={'name'} value={data_location.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_location} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_location: state.location.data_location,
        is_loading: state.location.is_loading,
        is_result: state.location.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_location: (data_filter) => dispatch(actions.get_list_location_redux(data_filter)),
        create_location: (data) => dispatch(actions.create_location_redux(data)),
        on_change_location: (id, value) => dispatch(actions.on_change_location_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));