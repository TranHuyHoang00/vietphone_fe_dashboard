import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Button, Spin, Typography, message } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormSelectSingle from '@components/selects/formSelectSingle';
import FormImage from '@components/inputs/formImage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { moduleQuills, formatQuills } from '@datas/dataModuleReactQuill';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditImage: false,
        }
    }
    async componentDidMount() {
        const { getListCategoryPost, getDataPost, match } = this.props;
        if (match && match.params) {
            const postId = match.params.id;
            if (postId) { await getDataPost(postId); }
        }
        await getListCategoryPost({ page: 1, limit: process.env.REACT_APP_API_LIMIT });
    }
    goBackHome = () => { this.props.history.push(`/admin/manager/website/post`) };
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
        const { dataPost, isResult, getListPost, editPost, dataFilter } = this.props;
        const result = this.validationData(dataPost);
        if (result.check) {
            await editPost(dataPost.id, dataPost);
            if (isResult) {
                await getListPost(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = (image) => {
        const { onChangePost } = this.props;
        this.setState({ isEditImage: true, })
        onChangePost(image, 'image');
    }
    render() {
        const { dataPost, isLoading, onChangePost, dataCategoryPosts } = this.props;
        return (
            <Spin size='large' spinning={isLoading}>
                <div className="mx-[10px] space-y-[10px]">
                    <div className='p-[10px] space-y-[10px] bg-white dark:bg-[#001529] rounded-[10px] shadow-md' >
                        <div className='flex items-center justify-between'>
                            <Button onClick={() => this.goBackHome()}
                                className='bg-[#e94138] text-white'>
                                Quay lại
                            </Button>
                            <Button onClick={() => this.handleEdit()}
                                className='bg-[#0e97ff] text-white'>
                                Lưu
                            </Button>
                        </div>
                        <div className="space-y-[10px]">
                            <FormImage name={'Ảnh'} variable={'image'} value={dataPost?.image}
                                important={true}
                                htmlFor={'loadImageEdit'} width={100} height={100}
                                onChangeImage={this.onChangeImage} />
                            <div className='flex flex-wrap gap-[10px]'>
                                <FormInput name={'Tiêu đề'} variable={'title'} value={dataPost?.title}
                                    important={true}
                                    onChangeInput={onChangePost} />

                                <FormInput name={'Slug'} variable={'slug'} value={dataPost?.slug}
                                    important={true}
                                    onChangeInput={onChangePost} />

                                <FormSelectSingle name={'Loại bài viết'} variable={'category'} value={dataPost?.category}
                                    important={true} width={200}
                                    options={dataCategoryPosts.map((item) => ({
                                        label: item?.title,
                                        value: item?.id,
                                    }))}
                                    onChangeInput={onChangePost} />

                            </div>
                            <div className='space-y-[3px]'>
                                <Typography.Text italic strong>
                                    Nội dung
                                    <Typography.Text type="danger" strong> *</Typography.Text>
                                </Typography.Text>
                                <ReactQuill theme="snow" className='text-black dark:text-white'
                                    modules={moduleQuills}
                                    formats={formatQuills}
                                    bounds={'.app'}
                                    value={dataPost?.body}
                                    onChange={(value) => onChangePost(value, 'body')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
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
        editPost: (id, data) => dispatch(actions.editPostRedux(id, data)),
        onChangePost: (id, value) => dispatch(actions.onChangePostRedux(id, value)),
        getListCategoryPost: (dataFilter) => dispatch(actions.getListCategoryPostRedux(dataFilter)),
        getDataPost: (id) => dispatch(actions.getDataPostRedux(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
