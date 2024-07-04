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
    handleEdit = async () => {
        const { dataCategoryPost, isResult, openModal, getListCategoryPost, editCategoryPost, dataFilter } = this.props;
        const result = this.validationData(dataCategoryPost);
        if (result.check) {
            await editCategoryPost(dataCategoryPost.id, dataCategoryPost);
            if (isResult) {
                openModal("edit", false);
                await getListCategoryPost(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataCategoryPost, isLoading, onChangeCategoryPost, modalEdit, openModal } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
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
        dataCategoryPost: state.categoryPost.dataCategoryPost,
        isLoading: state.categoryPost.isLoading,
        isResult: state.categoryPost.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListCategoryPost: (dataFilter) => dispatch(actions.getListCategoryPostRedux(dataFilter)),
        editCategoryPost: (id, data) => dispatch(actions.editCategoryPostRedux(id, data)),
        onChangeCategoryPost: (id, value) => dispatch(actions.onChangeCategoryPostRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));