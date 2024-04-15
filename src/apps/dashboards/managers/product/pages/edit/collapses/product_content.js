import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../../../../store/actions';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class product_content extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (

            <Collapse defaultActiveKey={"1"}>
                <Collapse.Panel header="Mô tả sản phẩm" key="1">
                    <ReactQuill theme="snow" readOnly={!this.props.is_edit}
                        modules={product_content.modules}
                        formats={product_content.formats}
                        bounds={'.app'}
                        value={this.props.description}
                        onChange={(value) => this.props.on_change_product_description(value)}
                    />
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        is_edit: state.product.is_edit,
        description: state.product.description,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        on_change_product_description: (value) => dispatch(actions.on_change_product_description_redux(value)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_content));

product_content.modules = {
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

product_content.formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'link', 'image', 'video',

    'header', 'indent', 'script',
    'color', 'background', 'align', 'clean'
]
