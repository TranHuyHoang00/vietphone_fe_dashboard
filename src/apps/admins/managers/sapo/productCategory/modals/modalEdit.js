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
    handleEdit = async () => {
        const { dataProductCategory, isResult, openModal, getListProductCategory, editProductCategory, dataFilter } = this.props;
        const result = this.validationData(dataProductCategory);
        if (result.check) {
            await editProductCategory(dataProductCategory.id, dataProductCategory);
            if (isResult) {
                await getListProductCategory(dataFilter);
                openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataProductCategory, isLoading, onChangeProductCategory, modalEdit, openModal } = this.props;
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
        editProductCategory: (id, data) => dispatch(actions.editProductCategoryRedux(id, data)),
        onChangeProductCategory: (id, value) => dispatch(actions.onChangeProductCategoryRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));