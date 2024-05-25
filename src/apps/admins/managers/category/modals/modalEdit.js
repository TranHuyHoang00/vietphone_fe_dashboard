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
            isEditImage: false,
        }
    }
    async componentDidMount() {
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Loại danh mục' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataCategory, isResult, openModal, getListCategory, editCategory, dataFilter } = this.props;
        const { isEditImage } = this.state;
        const result = this.validationData(dataCategory);
        let newDataCategory = { ...dataCategory };
        if (result.check) {
            if (isEditImage === false) { delete newDataCategory.image; }
            await editCategory(newDataCategory.id, newDataCategory);
            if (isResult) {
                await getListCategory(dataFilter);
                openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = (image) => {
        const { onChangeCategory } = this.props;
        this.setState({ isEditImage: true, })
        onChangeCategory(image, 'image');
    }
    render() {
        const { dataCategory, isLoading, onChangeCategory, modalEdit, openModal } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormImage name={'Ảnh'} variable={'image'} value={dataCategory.image}
                            important={true}
                            htmlFor={'loadImageEdit'} width={100} height={100}
                            onChangeImage={this.onChangeImage} />

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
        editCategory: (id, data) => dispatch(actions.editCategoryRedux(id, data)),
        onChangeCategory: (id, value) => dispatch(actions.onChangeCategoryRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));