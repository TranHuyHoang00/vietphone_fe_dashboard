import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import ModalFooter from '@components/modals/modalFooter';
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
            return { mess: "Không được bỏ trống 'Tên quyền' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataGroup, isResult, openModal, getListGroup, createGroup, dataFilter } = this.props;
        const result = this.validationData(dataGroup);
        if (result.check) {
            await createGroup(dataGroup);
            if (isResult) {
                await getListGroup(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataGroup, isLoading, onChangeGroup, modalCreate, openModal } = this.props;
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

                        <FormInput name={'Tên quyền'} variable={'name'} value={dataGroup?.name}
                            important={true}
                            onChangeInput={onChangeGroup} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataGroup: state.group.dataGroup,
        isLoading: state.group.isLoading,
        isResult: state.group.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListGroup: (dataFilter) => dispatch(actions.getListGroupRedux(dataFilter)),
        createGroup: (data) => dispatch(actions.createGroupRedux(data)),
        onChangeGroup: (id, value) => dispatch(actions.onChangeGroupRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));