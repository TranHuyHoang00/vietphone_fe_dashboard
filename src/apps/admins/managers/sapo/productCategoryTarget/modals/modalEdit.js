import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography, Select } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import FormSelectSingle from '@components/selects/formSelectSingle';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: {
                page: 1,
                limit: process.env.REACT_APP_API_LIMIT,
                is_active: true,
            },

        }
    }
    async componentDidMount() {
        const { getListProductCategory } = this.props;
        const { dataFilter } = this.state;
        await getListProductCategory(dataFilter);
    }
    validationData = (data) => {
        if (!data.code) {
            return { mess: "Không được bỏ trống 'Code' ", check: false };
        }
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataProductCategoryTarget, isResult, openModal, getListProductCategoryTarget, editProductCategoryTarget, dataFilter } = this.props;
        const result = this.validationData(dataProductCategoryTarget);
        if (result.check) {
            let newDataProductCategoryTarget = { ...dataProductCategoryTarget };
            if (newDataProductCategoryTarget?.sapo_product_category?.[0]?.id) { delete newDataProductCategoryTarget.sapo_product_category }
            await editProductCategoryTarget(newDataProductCategoryTarget.id, newDataProductCategoryTarget);
            if (isResult) {
                await getListProductCategoryTarget(dataFilter);
                openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataProductCategoryTarget, isLoadingProductCategory, isLoadingProductCategoryTarget, onChangeProductCategoryTarget,
            modalEdit, openModal, dataProductCategorys } = this.props;
        return (
            <Modal title="CHỈNH SỬA" open={modalEdit}
                onCancel={() => openModal("edit", false)} width={400}
                maskClosable={!isLoadingProductCategoryTarget}
                footer={[
                    <ModalFooter openModal={openModal} type={'edit'}
                        isLoading={isLoadingProductCategoryTarget} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoadingProductCategoryTarget || isLoadingProductCategory}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Code'} variable={'code'} value={dataProductCategoryTarget?.code}
                            important={true}
                            onChangeInput={onChangeProductCategoryTarget} />

                        <FormInput name={'Tên'} variable={'name'} value={dataProductCategoryTarget?.name}
                            important={true}
                            onChangeInput={onChangeProductCategoryTarget} />

                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataProductCategoryTarget?.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={onChangeProductCategoryTarget} />
                        <div className='space-y-[2px]'>
                            <Typography.Text strong>
                                Loại SP
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} showSearch
                                value={
                                    dataProductCategoryTarget?.sapo_product_category && dataProductCategoryTarget?.sapo_product_category.length !== 0
                                        ? dataProductCategoryTarget?.sapo_product_category.map(item => {
                                            if (typeof item === 'object') {
                                                return item?.id;
                                            }
                                            return item;
                                        })
                                        : []
                                }
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                onChange={(value) => onChangeProductCategoryTarget(value, 'sapo_product_category')}
                                options={dataProductCategorys && dataProductCategorys.map((item) => ({
                                    label: item?.name,
                                    value: item?.id,
                                }))}
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
        dataProductCategoryTarget: state.productCategoryTarget.dataProductCategoryTarget,

        isLoadingProductCategoryTarget: state.productCategoryTarget.isLoading,
        isResult: state.productCategoryTarget.isResult,

        dataProductCategorys: state.productCategory.dataProductCategorys,
        isLoadingProductCategory: state.productCategory.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListProductCategory: (dataFilter) => dispatch(actions.getListProductCategoryRedux(dataFilter)),

        getListProductCategoryTarget: (dataFilter) => dispatch(actions.getListProductCategoryTargetRedux(dataFilter)),
        editProductCategoryTarget: (id, data) => dispatch(actions.editProductCategoryTargetRedux(id, data)),
        onChangeProductCategoryTarget: (id, value) => dispatch(actions.onChangeProductCategoryTargetRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));