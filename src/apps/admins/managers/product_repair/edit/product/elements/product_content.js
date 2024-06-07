import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as actions from '@actions';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { moduleQuills, formatQuills } from '@datas/dataModuleReactQuill';
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
                        modules={moduleQuills}
                        formats={formatQuills}
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
