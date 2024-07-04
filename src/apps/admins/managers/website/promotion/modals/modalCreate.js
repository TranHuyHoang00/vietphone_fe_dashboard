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
import FormImage from '@components/inputs/formImage';

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
    handleCreate = async () => {
        const { dataPromotion, isResult, openModal, getListPromotion, createPromotion, dataFilter } = this.props;
        const result = this.validationData(dataPromotion);
        if (result.check) {
            await createPromotion(dataPromotion);
            if (isResult) {
                await getListPromotion(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataPromotion, isLoading, onChangePromotion, modalCreate, openModal } = this.props;
        return (
            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={600}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">
                        <FormImage name={'Ảnh'} variable={'image'} value={dataPromotion.image}
                            important={true}
                            htmlFor={'loadImageCreate'} width={250} height={50}
                            onChangeInput={onChangePromotion} />

                        <FormInput name={'Tên'} variable={'name'} value={dataPromotion.name}
                            important={true}
                            onChangeInput={onChangePromotion} />

                        <FormInput name={'Trả góp'} variable={'instalment'} value={dataPromotion.instalment}
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
        createPromotion: (data) => dispatch(actions.createPromotionRedux(data)),
        onChangePromotion: (id, value) => dispatch(actions.onChangePromotionRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));