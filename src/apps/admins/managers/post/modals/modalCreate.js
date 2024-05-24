import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modal/modalFooter';
import FormSelectInput from '@components/selects/formSelectInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
        }
    }
    async componentDidMount() {
        this.props.get_list_category_post({ page: 1, limit: 100, search: '' });
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
        let data_post = this.props.data_post;
        data_post.body = this.state.body;
        let result = this.validationData(data_post);
        if (result.check) {
            await this.props.create_post(data_post);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("create", false);
                await this.props.get_list_post(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    onchange_ReactQuill = (value) => {
        this.setState({ body: value });
    }
    render() {
        let data_post = this.props.data_post;
        let isLoading = this.props.isLoading;
        let data_category_posts = this.props.data_category_posts;
        return (

            <Modal title="TẠO MỚI" open={this.props.modalCreate}
                onCancel={() => this.props.openModal("create", false)} width={800}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <div className='flex flex-col flex-wrap sm:flex-row gap-[10px]'>
                            <FormInput name={'Tiêu đề'} variable={'title'} value={data_post.title}
                                important={true}
                                onChangeInput={this.props.on_change_post} />

                            <FormInput name={'Slug'} variable={'slug'} value={data_post.slug}
                                important={true}
                                onChangeInput={this.props.on_change_post} />
                            <FormSelectInput name={'Loại bài viết'} variable={'category'} value={data_post.category}
                                important={true} width={200}
                                options={data_category_posts.map((item) => ({
                                    label: item.title,
                                    value: item.id,
                                }))}
                                onChangeInput={this.props.on_change_post} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Nội dung
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <ReactQuill theme="snow"
                                modules={index.modules}
                                formats={index.formats}
                                bounds={'.app'}
                                value={this.state.body}
                                onChange={(value) => this.onchange_ReactQuill(value)}
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
        data_category_posts: state.category_post.data_category_posts,
        data_post: state.post.data_post,
        isLoading: state.post.isLoading,
        isResult: state.post.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_post: (dataFilter) => dispatch(actions.get_list_post_redux(dataFilter)),
        create_post: (data) => dispatch(actions.create_post_redux(data)),
        on_change_post: (id, value) => dispatch(actions.on_change_post_redux(id, value)),
        get_list_category_post: (dataFilter) => dispatch(actions.get_list_category_post_redux(dataFilter)),

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