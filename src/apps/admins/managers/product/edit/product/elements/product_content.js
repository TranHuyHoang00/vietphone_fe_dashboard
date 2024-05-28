import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '@actions';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const { isEdit, description, onChangeProductDescription } = this.props;
        return (
            <Collapse defaultActiveKey={[1]}>
                <Collapse.Panel header="Mô tả sản phẩm" key="1">
                    <ReactQuill theme="snow" readOnly={!isEdit}
                        modules={index.modules}
                        formats={index.formats}
                        bounds={'.app'}
                        value={description}
                        onChange={(value) => onChangeProductDescription(value)}
                    />
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        isEdit: state.product.isEdit,
        description: state.product.description,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onChangeProductDescription: (value) => dispatch(actions.onChangeProductDescriptionRedux(value)),

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
