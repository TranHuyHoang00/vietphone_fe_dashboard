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
                limit: 100,
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
    handleCreate = async () => {
        const { dataProductCategoryTarget, isResult, openModal, getListProductCategoryTarget, createProductCategoryTarget, dataFilter } = this.props;
        const result = this.validationData(dataProductCategoryTarget);
        if (result.check) {
            await createProductCategoryTarget(dataProductCategoryTarget);
            if (isResult) {
                await getListProductCategoryTarget(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataProductCategoryTarget, isLoadingProductCategory, dataProductCategorys, isLoadingProductCategoryTarget,
            onChangeProductCategoryTarget, modalCreate, openModal, } = this.props;
        return (

            <Modal title="TẠO MỚI" open={modalCreate}
                onCancel={() => openModal("create", false)} width={400}
                maskClosable={!isLoadingProductCategoryTarget}
                footer={[
                    <ModalFooter openModal={openModal} type={'create'}
                        isLoading={isLoadingProductCategoryTarget} selectFuncFooterModal={this.handleCreate} />
                ]}>
                <Spin spinning={isLoadingProductCategoryTarget || isLoadingProductCategory}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Code'} variable={'code'} value={dataProductCategoryTarget.code}
                            important={true}
                            onChangeInput={onChangeProductCategoryTarget} />

                        <FormInput name={'Tên'} variable={'name'} value={dataProductCategoryTarget.name}
                            important={true}
                            onChangeInput={onChangeProductCategoryTarget} />

                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataProductCategoryTarget.is_active}
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
                                value={dataProductCategoryTarget?.sapo_product_category}
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                onChange={(value) => onChangeProductCategoryTarget(value, 'sapo_product_category')}
                                options={dataProductCategorys && dataProductCategorys.map((item) => ({
                                    label: item?.name,
                                    value: item.id,
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
        createProductCategoryTarget: (data) => dispatch(actions.createProductCategoryTargetRedux(data)),
        onChangeProductCategoryTarget: (id, value) => dispatch(actions.onChangeProductCategoryTargetRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));