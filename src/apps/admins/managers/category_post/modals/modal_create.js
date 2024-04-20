import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/form_input';
import ModalFooter from '@components/modal/modal_footer';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validation = (data) => {
        if (!data.title) {
            return { mess: "Không được bỏ trống 'Tiêu đề' ", code: 1 };
        }
        if (!data.slug) {
            return { mess: "Không được bỏ trống 'Slug' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_category_post);
        if (result.code === 0) {
            await this.props.create_category_post(this.props.data_category_post);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("create", false);
                await this.props.get_list_category_post(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_category_post = this.props.data_category_post;
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

                        <FormInput name={'Tiêu đề'} variable={'title'} value={data_category_post.title}
                            important={true}
                            handle_onchange_input={this.props.on_change_category_post} />

                        <FormInput name={'Slug'} variable={'slug'} value={data_category_post.slug}
                            important={true}
                            handle_onchange_input={this.props.on_change_category_post} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_category_post: state.category_post.data_category_post,
        is_loading: state.category_post.is_loading,
        is_result: state.category_post.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_category_post: (data_filter) => dispatch(actions.get_list_category_post_redux(data_filter)),
        create_category_post: (data) => dispatch(actions.create_category_post_redux(data)),
        on_change_category_post: (id, value) => dispatch(actions.on_change_category_post_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));