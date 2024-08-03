import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '@actions';
import { connect } from 'react-redux';
import { Collapse, Button } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { moduleQuills, formatQuills } from '@datas/dataModuleReactQuill';
import '../../../statics/product.css';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToolbarFixed: false,
        }
        this.quillRef = React.createRef();
    }
    componentDidMount() {
        document.querySelectorAll(".ql-picker").forEach(tool => {
            tool.addEventListener("mousedown", function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
        });
    }
    componentDidUpdate() {
        document.querySelectorAll(".ql-picker").forEach(tool => {
            tool.addEventListener("mousedown", function (event) {
                event.preventDefault();
                event.stopPropagation();
            });
        });
    }
    toggleToolbarFixed = (event) => {
        event.stopPropagation();
        this.setState({ isToolbarFixed: !this.state.isToolbarFixed });
    };
    handleImageUpload = () => {
        const { dataProduct } = this.props;
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.addEventListener('change', () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const quill = this.quillRef.current.getEditor();
                    const range = quill.getSelection();
                    if (range) {
                        const url = reader.result;
                        quill.insertEmbed(range.index, 'image', url);
                        const img = quill.container.querySelector('img');
                        if (img) {
                            img.setAttribute('alt', dataProduct?.name);
                            img.setAttribute('title', dataProduct?.name);
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        });
        input.click();
    };
    getModules = () => ({
        toolbar: {
            container: moduleQuills.toolbar,
            handlers: {
                'image': this.handleImageUpload
            }
        },
        clipboard: moduleQuills.clipboard
    });

    render() {
        const { isEdit, description, onChangeProductDescription } = this.props;
        const { isToolbarFixed } = this.state;
        const itemCollapses = [
            {
                key: '1',
                label: 'Thông tin sản phẩm',
                extra:
                    <Button className='bg-[#0e97ff] dark:bg-white'
                        onClick={(event) => this.toggleToolbarFixed(event)}>
                        <span className=' text-white dark:text-black'>{isToolbarFixed ? 'Bỏ Gim' : 'Gim'}</span>
                    </Button>,
                children: <div className={`editor-container ${isToolbarFixed ? 'toolbar-fixed' : ''}`}>
                    <ReactQuill theme="snow" readOnly={!isEdit}
                        ref={this.quillRef}
                        modules={this.getModules()}
                        formats={formatQuills}
                        bounds={'.editor-container'}
                        value={description}
                        onChange={(value) => onChangeProductDescription(value)}
                    />
                </div>
            }
        ]
        return (
            <Collapse defaultActiveKey={[1]} items={itemCollapses}></Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        isEdit: state.product.isEdit,
        description: state.product.description,
        dataProduct: state.product.dataProduct,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onChangeProductDescription: (value) => dispatch(actions.onChangeProductDescriptionRedux(value)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
