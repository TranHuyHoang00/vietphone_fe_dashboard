import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Collapse } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class product_content extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }
    render() {
        return (

            <Collapse >
                <Collapse.Panel header="Mô tả sản phẩm" key="1">
                    <ReactQuill theme="snow"
                        modules={product_content.modules}
                        formats={product_content.formats}
                        bounds={'.app'}
                        value={this.props.data_product.description}
                        onChange={(event) => this.props.on_change_product(event, 'description', 'select')}
                    />
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_product: state.product.data_product,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        on_change_product: (event, id, type) => dispatch(actions.on_change_product_redux(event, id, type)),
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

        [{ 'header': [1, 2, 3, 4, 5, 6] }],

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
