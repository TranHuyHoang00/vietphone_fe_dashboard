import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
import FormSelectMultiple from '@components/selects/formSelectMultiple';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListAttribute } = this.props;
        getListAttribute({ page: 1, limit: 100, search: '' });
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

                        <FormInput name={'Tên TS-SP'} variable={'name'} value={dataVariantAttributeGroup.name}
                            important={true}
                            onChangeInput={onChangeVariantAttributeGroup} />

                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Thông số
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <FormSelectMultiple width={'100%'} mode={'multiple'}
                                variableSelect={'attribute'}
                                value={dataVariantAttributeGroup.variant_attribute_group}
                                onChangeSelect={onChangeVariantAttributeGroup}
                                options={dataAttributes.map((item) => ({
                                    label: item.name,
                                    value: item.id,
                                }))}
                                disabledSelect={false}
                                disabledButtonCreate={true}
                                disabledSearch={true}
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