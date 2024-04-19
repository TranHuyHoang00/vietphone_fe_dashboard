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
            return { mess: "Không được bỏ trống 'Tên quyền' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_group);
        if (result.code === 0) {
            await this.props.create_group(this.props.data_group);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("create", false);
                await this.props.get_list_group(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_group = this.props.data_group;
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

                        <FormInput name={'Tên quyền'} variable={'name'} value={data_group.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_group} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_group: state.group.data_group,
        is_loading: state.group.is_loading,
        is_result: state.group.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_group: (data_filter) => dispatch(actions.get_list_group_redux(data_filter)),
        create_group: (data) => dispatch(actions.create_group_redux(data)),
        on_change_group: (id, value) => dispatch(actions.on_change_group_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));