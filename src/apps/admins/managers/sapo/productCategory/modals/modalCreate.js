import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import FormSelectSingle from '@components/selects/formSelectSingle';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validationData = (data) => {
        if (!data.code) {
            return { mess: "Không được bỏ trống 'Code' ", check: false };
        }
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên loại sản phẩm' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataProductCategory, isResult, openModal, getListProductCategory, createProductCategory, dataFilter } = this.props;
        const result = this.validationData(dataProductCategory);
        if (result.check) {
            await createProductCategory(dataProductCategory);
            if (isResult) {
                await getListProductCategory(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataProductCategory, isLoading, onChangeProductCategory, modalCreate, openModal, } = this.props;
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

                        <FormInput name={'Code'} variable={'code'} value={dataProductCategory.code}
                            important={true}
                            onChangeInput={onChangeProductCategory} />

                        <FormInput name={'Tên loại sản phẩm'} variable={'name'} value={dataProductCategory.name}
                            important={true}
                            onChangeInput={onChangeProductCategory} />

                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataProductCategory.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={onChangeProductCategory} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataProductCategory: state.productCategory.dataProductCategory,
        isLoading: state.productCategory.isLoading,
        isResult: state.productCategory.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),
        createProductCategory: (data) => dispatch(actions.createProductCategoryRedux(data)),
        onChangeProductCategory: (id, value) => dispatch(actions.onChangeProductCategoryRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));