import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListCategoryPost } = this.props;
        getListCategoryPost({ page: 1, limit: 100, search: '' });
    }
    validationData = (data) => {
        if (!data.title) {
            return { mess: "Không được bỏ trống 'Tiêu đề' ", check: false };
        }
        if (!data.slug) {
            return { mess: "Không được bỏ trống 'Slug' ", check: false };
        }
        if (!data.body) {
            return { mess: "Không được bỏ trống 'Nội dung' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataPost, isResult, openModal, getListPost, editPost, dataFilter } = this.props;
        const result = this.validationData(dataPost);
        if (result.check) {
            await editPost(dataPost.id, dataPost);
            if (isResult) {
                openModal("edit", false);
                await getListPost(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataPost, isLoading, onChangePost, modalEdit, openModal, dataCategoryPosts } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={800}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <div className='flex flex-col flex-wrap sm:flex-row gap-[10px]'>
                            <FormInput name={'Tiêu đề'} variable={'title'} value={dataPost.title}
                                important={true}
                                onChangeInput={onChangePost} />

                            <FormInput name={'Slug'} variable={'slug'} value={dataPost.slug}
                                important={true}
                                onChangeInput={onChangePost} />

                            <FormSelectSingle name={'Loại bài viết'} variable={'category'} value={dataPost.category}
                                important={true} width={200}
                                options={dataCategoryPosts.map((item) => ({
                                    label: item.title,
                                    value: item.id,
                                }))}
                                onChangeInput={onChangePost} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Nội dung
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <ReactQuill theme="snow" className='text-black dark:text-white'
                                modules={index.modules}
                                formats={index.formats}
                                bounds={'.app'}
                                value={dataPost.body}
                                onChange={(value) => onChangePost(value, 'body')}
                            />
                        </div>
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataCategoryPosts: state.category_post.dataCategoryPosts,
        dataPost: state.post.dataPost,
        isLoading: state.post.isLoading,
        isResult: state.post.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListPost: (dataFilter) => dispatch(actions.getListPostRedux(dataFilter)),
        editPost: (id, data) => dispatch(actions.editPostRedux(id, data)),
        onChangePost: (id, value) => dispatch(actions.onChangePostRedux(id, value)),
        getListCategoryPost: (dataFilter) => dispatch(actions.getListCategoryPostRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));

index.modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', 'large', 'huge'] }],

        ['bold', 'italic', 'underline', 'strike', 'blockquote'],

        ['link', 'image', 'video'],

        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],

        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],

        ['clean']
    ],
    clipboard: {
        matchVisual: false,
    }
}

index.formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'link', 'image', 'video',

    'header', 'indent', 'script',
    'color', 'background', 'align', 'clean'
]