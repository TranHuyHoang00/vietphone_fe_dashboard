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
        let result = this.validationData(this.props.data_category);
        if (result.check) {
            let data_category = this.props.data_category;
            if (this.state.isEditImage === false) {
                delete data_category.image;
            }
            await this.props.edit_category(data_category.id, data_category);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("edit", false);
                await this.props.get_list_category(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = (image) => {
        this.setState({ isEditImage: true, })
        this.props.on_change_category(image, 'image');
    }
    render() {
        let data_category = this.props.data_category;
        let isLoading = this.props.isLoading;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modalEdit}
                onCancel={() => this.props.openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormImage name={'Ảnh'} variable={'image'} value={data_category.image}
                            important={true}
                            htmlFor={'loadImageEdit'} width={100} height={100}
                            onChangeImage={this.onChangeImage} />

                        <FormInput name={'Tên danh mục'} variable={'name'} value={data_category.name}
                            important={true}
                            onChangeInput={this.props.on_change_category} />

                        <FormInput name={'Icon'} variable={'icon'} value={data_category.icon}
                            important={false}
                            onChangeInput={this.props.on_change_category} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_category.description}
                            important={false}
                            onChangeInput={this.props.on_change_category} />

                        <FormSelectInput name={'Trạng thái'} variable={'is_active'} value={data_category.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={this.props.on_change_category} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_category: state.category.data_category,
        isLoading: state.category.isLoading,
        isResult: state.category.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_category: (dataFilter) => dispatch(actions.get_list_category_redux(dataFilter)),
        edit_category: (id, data) => dispatch(actions.edit_category_redux(id, data)),
        on_change_category: (id, value) => dispatch(actions.on_change_category_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));