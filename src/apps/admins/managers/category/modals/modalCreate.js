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
        let result = this.validationData(this.props.data_category);
        if (result.check) {
            await this.props.create_category(this.props.data_category);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("create", false);
                await this.props.get_list_category(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_category = this.props.data_category;
        let isLoading = this.props.isLoading;
        return (

            <Modal title="TẠO MỚI" open={this.props.modalCreate}
                onCancel={() => this.props.openModal("create", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'create'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormImage name={'Ảnh'} variable={'image'} value={data_category.image}
                            important={true}
                            htmlFor={'loadImageCreate'} width={100} height={100}
                            onChangeInput={this.props.on_change_category} />

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
        create_category: (data) => dispatch(actions.create_category_redux(data)),
        on_change_category: (id, value) => dispatch(actions.on_change_category_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));