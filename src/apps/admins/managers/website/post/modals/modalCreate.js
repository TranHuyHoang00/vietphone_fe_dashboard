import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import FormSelectSingle from '@components/selects/formSelectSingle';
import FormImage from '@components/inputs/formImage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { moduleQuills, formatQuills } from '@datas/dataModuleReactQuill';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListCategoryPost } = this.props;
        getListCategoryPost({ page: 1, limit: process.env.REACT_APP_API_LIMIT, });
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
    handleCreate = async () => {
        const { dataPost, isResult, openModal, getListPost, createPost, dataFilter } = this.props;
        const result = this.validationData(dataPost);
        if (result.check) {
            await createPost(dataPost);
            if (isResult) {
                await getListPost(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataPost, isLoading, onChangePost, modalCreate, openModal, dataCategoryPosts } = this.props;
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
                        <FormImage name={'Ảnh'} variable={'image'} value={dataPost?.image}
                            important={true}
                            htmlFor={'loadImageCreate'} width={100} height={100}
                            onChangeInput={onChangePost} />
                        <FormInput name={'Tiêu đề'} variable={'title'} value={dataPost?.title}
                            important={true}
                            onChangeInput={onChangePost} />
                        <FormInput name={'Slug'} variable={'slug'} value={dataPost?.slug}
                            important={true}
                            onChangeInput={onChangePost} />
                        <FormSelectSingle name={'Loại bài viết'} variable={'category'} value={dataPost?.category}
                            important={true} width={'100%'}
                            options={dataCategoryPosts.map((item) => ({
                                label: item?.title,
                                value: item?.id,
                            }))}
                            onChangeInput={onChangePost} />
                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataPost?.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={onChangePost} />
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Nội dung
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <ReactQuill theme="snow"
                                modules={moduleQuills}
                                formats={formatQuills}
                                bounds={'.app'}
                                value={dataPost?.body}
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
        dataCategoryPosts: state.categoryPost.dataCategoryPosts,
        dataPost: state.post.dataPost,
        isLoading: state.post.isLoading,
        isResult: state.post.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListPost: (dataFilter) => dispatch(actions.getListPostRedux(dataFilter)),
        createPost: (data) => dispatch(actions.createPostRedux(data)),
        onChangePost: (id, value) => dispatch(actions.onChangePostRedux(id, value)),
        getListCategoryPost: (dataFilter) => dispatch(actions.getListCategoryPostRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));