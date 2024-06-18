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
    render() {
        const { isEdit, description, onChangeProductDescription } = this.props;
        const { isToolbarFixed } = this.state;
        return (
            <Collapse defaultActiveKey={[1]}>
                <Collapse.Panel header="Mô tả sản phẩm" key="1" extra={
                    <>
                        <Button className='bg-[#0e97ff] dark:bg-white'
                            onClick={(event) => this.toggleToolbarFixed(event)}>
                            <span className=' text-white dark:text-black'>{isToolbarFixed ? 'Bỏ Gim' : 'Gim'}</span>
                        </Button>
                    </>
                }>

                    <div className={`editor-container ${isToolbarFixed ? 'toolbar-fixed' : ''}`}>
                        <ReactQuill theme="snow" readOnly={!isEdit}
                            modules={moduleQuills}
                            formats={formatQuills}
                            bounds={'.editor-container'}
                            value={description}
                            onChange={(value) => onChangeProductDescription(value)}
                        />
                    </div>
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
