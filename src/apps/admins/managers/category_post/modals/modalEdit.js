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
        if (!data.title) {
            return { mess: "Không được bỏ trống 'Tiêu đề' ", check: false };
        }
        if (!data.slug) {
            return { mess: "Không được bỏ trống 'Slug' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        let result = this.validationData(this.props.data_category_post);
        if (result.check) {
            let data_category_post = this.props.data_category_post;
            await this.props.edit_category_post(data_category_post.id, data_category_post);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("edit", false);
                await this.props.get_list_category_post(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_category_post = this.props.data_category_post;
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

                        <FormInput name={'Tiêu đề'} variable={'title'} value={data_category_post.title}
                            important={true}
                            onChangeInput={this.props.on_change_category_post} />

                        <FormInput name={'Slug'} variable={'slug'} value={data_category_post.slug}
                            important={true}
                            onChangeInput={this.props.on_change_category_post} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_category_post: state.category_post.data_category_post,
        isLoading: state.category_post.isLoading,
        isResult: state.category_post.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_category_post: (dataFilter) => dispatch(actions.get_list_category_post_redux(dataFilter)),
        edit_category_post: (id, data) => dispatch(actions.edit_category_post_redux(id, data)),
        on_change_category_post: (id, value) => dispatch(actions.on_change_category_post_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));