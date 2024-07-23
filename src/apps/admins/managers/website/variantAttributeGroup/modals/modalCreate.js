import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography, Select } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListAttribute } = this.props;
        getListAttribute({ page: 1, limit: process.env.REACT_APP_API_LIMIT });
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'TS-SP' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataVariantAttributeGroup, isResult, openModal, getListVariantAttributeGroup, createVariantAttributeGroup, dataFilter } = this.props;
        const result = this.validationData(dataVariantAttributeGroup);
        if (result.check) {
            await createVariantAttributeGroup(dataVariantAttributeGroup);
            if (isResult) {
                await getListVariantAttributeGroup(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataVariantAttributeGroup, isLoading, onChangeVariantAttributeGroup, modalCreate, openModal, dataAttributes } = this.props;

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

                        <FormInput name={'Tên TS-SP'} variable={'name'} value={dataVariantAttributeGroup?.name}
                            important={true}
                            onChangeInput={onChangeVariantAttributeGroup} />
                        <div className='space-y-[2px]'>
                            <Typography.Text strong>
                                Thông số
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Select mode="multiple" allowClear style={{ width: '100%' }} showSearch
                                value={dataVariantAttributeGroup?.variant_attribute_group}
                                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                                onChange={(value) => onChangeVariantAttributeGroup(value, 'attribute')}
                                options={dataAttributes && dataAttributes.map((item) => ({
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
        dataVariantAttributeGroup: state.variantAttributeGroup.dataVariantAttributeGroup,
        isLoading: state.variantAttributeGroup.isLoading,
        isResult: state.variantAttributeGroup.isResult,
        dataAttributes: state.attribute.dataAttributes,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListVariantAttributeGroup: (dataFilter) => dispatch(actions.getListVariantAttributeGroupRedux(dataFilter)),
        createVariantAttributeGroup: (data) => dispatch(actions.createVariantAttributeGroupRedux(data)),
        onChangeVariantAttributeGroup: (id, value) => dispatch(actions.onChangeVariantAttributeGroupRedux(id, value)),
        getListAttribute: (dataFilter) => dispatch(actions.getListAttributeRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));