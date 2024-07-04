import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin,Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormImage from '@components/inputs/formImage';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modals/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditImage: false,
            isEditImageBg: false,
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
        const { isEditImage, isEditImageBg } = this.state;
        const result = this.validationData(dataCategory);
        let newDataCategory = { ...dataCategory };
        if (result.check) {
            if (isEditImage === false) { delete newDataCategory.image; }
            if (isEditImageBg === false) { delete newDataCategory.background; }
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
    onChangeImageBg = (background) => {
        const { onChangeCategory } = this.props;
        this.setState({ isEditImageBg: true, })
        onChangeCategory(background, 'background');
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
                            htmlFor={'loadImageEdit'} width={240} height={80}
                            onChangeImage={this.onChangeImage} />

                        <FormImage name={'Ảnh nền'} variable={'background'} value={dataCategory.background}
                            important={true}
                            htmlFor={'loadImageEditBg'} width={240} height={80}
                            onChangeImage={this.onChangeImageBg} />

                        <FormInput name={'Tên danh mục'} variable={'name'} value={dataCategory.name}
                            important={true}
                            onChangeInput={onChangeCategory} />

                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Màu nền</Typography.Text>
                            <div>
                                <input onChange={(event) => { onChangeCategory(event.target.value, 'color'); }}
                                    value={dataCategory.color} type='color' className='w-full' />
                            </div>
                        </div>

                        <FormInput name={'Icon'} variable={'icon'} value={dataCategory.icon}
                            important={false}
                            onChangeInput={onChangeCategory} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataCategory.description}
                            important={false}
                            onChangeInput={onChangeCategory} />

                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataCategory.is_active}
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