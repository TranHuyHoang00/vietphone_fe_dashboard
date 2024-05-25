import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormImage from '@components/inputs/formImage';
import FormSelectInput from '@components/selects/formSelectInput';
import ModalFooter from '@components/modal/modalFooter';
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
            return { mess: "Không được bỏ trống 'Tên danh mục' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataCategory, isResult, openModal, getListCategory, createCategory, dataFilter } = this.props;
        const result = this.validationData(dataCategory);
        if (result.check) {
            await createCategory(dataCategory);
            if (isResult) {
                await getListCategory(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataCategory, isLoading, onChangeCategory, modalCreate, openModal } = this.props;
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

                        <FormImage name={'Ảnh'} variable={'image'} value={dataCategory.image}
                            important={true}
                            htmlFor={'loadImageCreate'} width={100} height={100}
                            onChangeInput={onChangeCategory} />

                        <FormInput name={'Tên danh mục'} variable={'name'} value={dataCategory.name}
                            important={true}
                            onChangeInput={onChangeCategory} />

                        <FormInput name={'Icon'} variable={'icon'} value={dataCategory.icon}
                            important={false}
                            onChangeInput={onChangeCategory} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataCategory.description}
                            important={false}
                            onChangeInput={onChangeCategory} />

                        <FormSelectInput name={'Trạng thái'} variable={'is_active'} value={dataCategory.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={onChangeCategory} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataCategory: state.category.dataCategory,
        isLoading: state.category.isLoading,
        isResult: state.category.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListCategory: (dataFilter) => dispatch(actions.getListCategoryRedux(dataFilter)),
        createCategory: (data) => dispatch(actions.createCategoryRedux(data)),
        onChangeCategory: (id, value) => dispatch(actions.onChangeCategoryRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));