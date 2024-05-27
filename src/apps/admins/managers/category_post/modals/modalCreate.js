import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
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
    handleCreate = async () => {
        const { dataCategoryPost, isResult, openModal, getListCategoryPost, createCategoryPost, dataFilter } = this.props;
        const result = this.validationData(dataCategoryPost);
        if (result.check) {
            await createCategoryPost(dataCategoryPost);
            if (isResult) {
                await getListCategoryPost(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataCategoryPost, isLoading, onChangeCategoryPost, modalCreate, openModal } = this.props;
        return (
            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <FormInput name={'Tiêu đề'} variable={'title'} value={dataCategoryPost.title}
                            important={true}
                            onChangeInput={onChangeCategoryPost} />
                        <FormInput name={'Slug'} variable={'slug'} value={dataCategoryPost.slug}
                            important={true}
                            onChangeInput={onChangeCategoryPost} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataCategoryPost: state.category_post.dataCategoryPost,
        isLoading: state.category_post.isLoading,
        isResult: state.category_post.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListCategoryPost: (dataFilter) => dispatch(actions.getListCategoryPostRedux(dataFilter)),
        createCategoryPost: (data) => dispatch(actions.createCategoryPostRedux(data)),
        onChangeCategoryPost: (id, value) => dispatch(actions.onChangeCategoryPostRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));