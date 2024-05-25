import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modal/modalFooter';
import FormSelectItem from '@components/selects/formSelectItem';
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
            return { mess: "Không được bỏ trống 'Tên TS-SP' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataVariantAttributeGroup, isResult, openModal, getListVariantAttributeGroup, editVariantAttributeGroup, dataFilter } = this.props;
        const result = this.validationData(dataVariantAttributeGroup);
        if (result.check) {
            if (dataVariantAttributeGroup?.attribute?.[0]?.id) {
                delete dataVariantAttributeGroup.attribute;
            }
            await editVariantAttributeGroup(dataVariantAttributeGroup.id, dataVariantAttributeGroup);
            if (isResult) {
                openModal("edit", false);
                await getListVariantAttributeGroup(dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataVariantAttributeGroup, isLoading, onChangeVariantAttributeGroup, modalEdit, openModal, dataAttributes } = this.props;

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
                        <FormInput name={'Tên TS-SP'} variable={'name'} value={dataVariantAttributeGroup.name}
                            important={true}
                            onChangeInput={onChangeVariantAttributeGroup} />

                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Thông số
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>

                            <FormSelectItem width={'100%'} mode={'multiple'}
                                variableSelect={'attribute'}
                                value={dataVariantAttributeGroup?.attribute?.[0]?.id ?
                                    (dataVariantAttributeGroup.attribute && dataVariantAttributeGroup.attribute.map((item) => ({
                                        value: item.id,
                                    }))) :
                                    (dataVariantAttributeGroup.attribute && dataVariantAttributeGroup.attribute.map((item) => ({
                                        value: item,
                                    })))
                                }
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
        dataVariantAttributeGroup: state.variant_attribute_group.dataVariantAttributeGroup,
        isLoading: state.variant_attribute_group.isLoading,
        isResult: state.variant_attribute_group.isResult,
        dataAttributes: state.attribute.dataAttributes,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListVariantAttributeGroup: (dataFilter) => dispatch(actions.getListVariantAttributeGroupRedux(dataFilter)),
        editVariantAttributeGroup: (id, data) => dispatch(actions.editVariantAttributeGroupRedux(id, data)),
        onChangeVariantAttributeGroup: (id, value) => dispatch(actions.onChangeVariantAttributeGroupRedux(id, value)),
        getListAttribute: (dataFilter) => dispatch(actions.getListAttributeRedux(dataFilter)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));