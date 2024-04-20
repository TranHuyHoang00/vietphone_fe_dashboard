import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/form_input';
import ModalFooter from '@components/modal/modal_footer';
import FormSelectInput from '@components/selects/form_select_input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_post: {},
        }
    }
    async componentDidMount() {
        this.props.get_list_category_post({ page: 1, limit: 100, search: '' });
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_post !== this.props.data_post) {
            this.setState({ data_post: this.props.data_post })
        }
    }
    validation = (data) => {
        if (!data.title) {
            return { mess: "Không được bỏ trống 'Tiêu đề' ", code: 1 };
        }
        if (!data.slug) {
            return { mess: "Không được bỏ trống 'Slug' ", code: 1 };
        }
        if (!data.body) {
            return { mess: "Không được bỏ trống 'Nội dung' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let data_post = this.props.data_post;
        data_post.body = this.state.data_post.body;
        let result = this.validation(data_post);
        if (result.code === 0) {
            await this.props.edit_post(data_post.id, data_post);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("edit", false);
                await this.props.get_list_post(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    onchange_ReactQuill = (value) => {
        this.setState({
            data_post: {
                ...this.state.data_post,
                body: value,
            }
        });
    }
    render() {
        let data_post = this.props.data_post;
        let is_loading = this.props.is_loading;
        let data_category_posts = this.props.data_category_posts;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={800}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'edit'}
                        is_loading={is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">
                        <div className='flex flex-col flex-wrap sm:flex-row gap-[10px]'>
                            <FormInput name={'Tiêu đề'} variable={'title'} value={data_post.title}
                                important={true}
                                handle_onchange_input={this.props.on_change_post} />


                            <FormInput name={'Slug'} variable={'slug'} value={data_post.slug}
                                important={true}
                                handle_onchange_input={this.props.on_change_post} />

                            <FormSelectInput name={'Loại bài viết'} variable={'category'} value={data_post.category}
                                important={true} width={200}
                                options={data_category_posts.map((item) => ({
                                    label: item.title,
                                    value: item.id,
                                }))}
                                handle_onchange_input={this.props.on_change_post} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Nội dung
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <ReactQuill theme="snow"
                                modules={modal_edit.modules}
                                formats={modal_edit.formats}
                                bounds={'.app'}
                                value={this.state.data_post.body}
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
        is_loading: state.post.is_loading,
        is_result: state.post.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_post: (data_filter) => dispatch(actions.get_list_post_redux(data_filter)),
        edit_post: (id, data) => dispatch(actions.edit_post_redux(id, data)),
        on_change_post: (id, value) => dispatch(actions.on_change_post_redux(id, value)),
        get_list_category_post: (data_filter) => dispatch(actions.get_list_category_post_redux(data_filter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));

modal_edit.modules = {
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

modal_edit.formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'link', 'image', 'video',

    'header', 'indent', 'script',
    'color', 'background', 'align', 'clean'
]