import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modals/modalFooter';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        const { getListGroupAttribute } = this.props;
        getListGroupAttribute({ page: 1, limit: 100, search: '' });
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên thông số' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataAttribute, isResult, openModal, getListAttribute, createAttribute, dataFilter } = this.props;
        const result = this.validationData(dataAttribute);
        if (result.check) {
            await createAttribute(dataAttribute);
            if (isResult) {
                await getListAttribute(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataAttribute, isLoading, onChangeAttribute, modalCreate, openModal, dataGroupAttributes } = this.props;
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

                        <FormInput name={'Tên thông số'} variable={'name'} value={dataAttribute.name}
                            important={true}
                            onChangeInput={onChangeAttribute} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataAttribute.description}
                            important={false}
                            onChangeInput={onChangeAttribute} />

                        <FormSelectSingle name={'Loại thông số'} variable={'group_attribute'} value={dataAttribute.group_attribute}
                            important={true} width={'100%'}
                            options={dataGroupAttributes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            onChangeInput={onChangeAttribute} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataAttribute: state.attribute.dataAttribute,
        isLoading: state.attribute.isLoading,
        isResult: state.attribute.isResult,
        dataGroupAttributes: state.groupAttribute.dataGroupAttributes,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListAttribute: (dataFilter) => dispatch(actions.getListAttributeRedux(dataFilter)),
        createAttribute: (data) => dispatch(actions.createAttributeRedux(data)),
        onChangeAttribute: (id, value) => dispatch(actions.onChangeAttributeRedux(id, value)),
        getListGroupAttribute: (dataFilter) => dispatch(actions.getListGroupAttributeRedux(dataFilter)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));