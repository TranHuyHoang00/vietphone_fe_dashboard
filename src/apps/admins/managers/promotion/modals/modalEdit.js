import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { moduleQuills, formatQuills } from '@datas/dataModuleReactQuill';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên' ", check: false };
        }
        if (!data.content) {
            return { mess: "Không được bỏ trống 'Nội dung' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataPromotion, isResult, openModal, getListPromotion, editPromotion, dataFilter } = this.props;
        const result = this.validationData(dataPromotion);
        if (result.check) {
            await editPromotion(dataPromotion.id, dataPromotion);
            if (isResult) {
                openModal("edit", false);
                await getListPromotion(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataPromotion, isLoading, onChangePromotion, modalEdit, openModal } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={800}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <FormInput name={'Tên'} variable={'name'} value={dataPromotion.name}
                            important={true}
                            onChangeInput={onChangePromotion} />

                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Nội dung
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <ReactQuill theme="snow"
                                modules={moduleQuills}
                                formats={formatQuills}
                                bounds={'.app'}
                                value={dataPromotion.content}
                                onChange={(value) => onChangePromotion(value, 'content')}
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
        dataPromotion: state.promotion.dataPromotion,
        isLoading: state.promotion.isLoading,
        isResult: state.promotion.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListPromotion: (dataFilter) => dispatch(actions.getListPromotionRedux(dataFilter)),
        editPromotion: (id, data) => dispatch(actions.editPromotionRedux(id, data)),
        onChangePromotion: (id, value) => dispatch(actions.onChangePromotionRedux(id, value)),
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