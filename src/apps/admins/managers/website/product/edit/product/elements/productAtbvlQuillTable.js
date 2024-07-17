import React, { Component, createRef } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse } from 'antd';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { moduleSunEditor } from '@datas/dataModuleSunEditor';

class index extends Component {
    constructor(props) {
        super(props);
        this.editorRef = createRef();
        this.state = {
        };
    }
    render() {
        const { shortDescription, onChangeProductShortDescription, isEdit } = this.props;
        console.log('shortDescription', shortDescription);
        const items = [
            {
                key: '1',
                label: 'Thông số kĩ thuật',
                children:
                    <SunEditor disable={!isEdit}
                        ref={this.editorRef}
                        setOptions={moduleSunEditor}
                        lang="en"
                        onChange={(value) => onChangeProductShortDescription(value)}
                        setContents={shortDescription}
                    />
            },
        ]
        return (
            <Collapse defaultActiveKey={[1]} items={items}></Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        isEdit: state.product.isEdit,
        shortDescription: state.product.shortDescription,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onChangeProductShortDescription: (value) => dispatch(actions.onChangeProductShortDescriptionRedux(value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
