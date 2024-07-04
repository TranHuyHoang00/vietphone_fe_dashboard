import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormImage from '@components/inputs/formImage';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modals/modalFooter';
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
            return { mess: "Không được bỏ trống 'Tên tag' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataTag, isResult, openModal, getListTag, createTag, dataFilter } = this.props;
        const result = this.validationData(dataTag);
        if (result.check) {
            await createTag(dataTag);
            if (isResult) {
                await getListTag(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataTag, isLoading, onChangeTag, modalCreate, openModal } = this.props;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormImage name={'Ảnh'} variable={'image'} value={dataTag.image}
                            important={true}
                            htmlFor={'loadImageCreate'} width={100} height={100}
                            onChangeInput={onChangeTag} />

                        <FormInput name={'Tên tag'} variable={'name'} value={dataTag.name}
                            important={true}
                            onChangeInput={onChangeTag} />

                        <FormInput name={'Icon'} variable={'icon'} value={dataTag.icon}
                            important={false}
                            onChangeInput={onChangeTag} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataTag.description}
                            important={false}
                            onChangeInput={onChangeTag} />

                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataTag.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={onChangeTag} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTag: state.tag.dataTag,
        isLoading: state.tag.isLoading,
        isResult: state.tag.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTag: (dataFilter) => dispatch(actions.getListTagRedux(dataFilter)),
        createTag: (data) => dispatch(actions.createTagRedux(data)),
        onChangeTag: (id, value) => dispatch(actions.onChangeTagRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));