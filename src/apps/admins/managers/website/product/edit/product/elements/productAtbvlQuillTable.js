import React, { Component, createRef } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse } from 'antd';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { moduleSunEditor } from '@datas/dataModuleSunEditor';
class Index extends Component {
    constructor(props) {
        super(props);
        this.editorRef = createRef();
        this.state = {
        };
    }

    componentDidMount() {
        const { shortDescription } = this.props;
        if (this.editorRef.current) {
            this.editorRef.current.editor.setContents(shortDescription);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.shortDescription !== this.props.shortDescription) {
            if (this.editorRef.current) {
                this.editorRef.current.editor.setContents(this.props.shortDescription || '');
            }
        }
    }
    handleChange = (value) => {
        this.props.onChangeProductShortDescription(value);
    };

    render() {
        const { isEdit, shortDescription } = this.props;
        return (
            <Collapse defaultActiveKey={[1]} >
                <Collapse.Panel header="Thông số kĩ thuật" key="1">
                    <SunEditor disable={!isEdit}
                        ref={this.editorRef}
                        setOptions={moduleSunEditor}
                        lang="en"
                        onChange={this.handleChange}
                        setContents={shortDescription || ""}
                    />
                </Collapse.Panel>
            </Collapse>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));
