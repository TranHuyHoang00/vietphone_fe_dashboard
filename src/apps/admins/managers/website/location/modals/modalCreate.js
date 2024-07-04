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
            return { mess: "Không được bỏ trống 'Tên vị trí' ", check: false };
        }
        if (!data.code) {
            return { mess: "Không được bỏ trống 'Code' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataLocation, isResult, openModal, getListLocation, createLocation, dataFilter } = this.props;
        const result = this.validationData(dataLocation);
        if (result.check) {
            await createLocation(dataLocation);
            if (isResult) {
                await getListLocation(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        const { dataLocation, isLoading, onChangeLocation, modalCreate, openModal } = this.props;
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

                        <FormInput name={'Code'} variable={'code'} value={dataLocation.code}
                            important={false}
                            onChangeInput={onChangeLocation} />

                        <FormInput name={'Tên vị trí'} variable={'name'} value={dataLocation.name}
                            important={true}
                            onChangeInput={onChangeLocation} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataLocation: state.location.dataLocation,
        isLoading: state.location.isLoading,
        isResult: state.location.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListLocation: (dataFilter) => dispatch(actions.getListLocationRedux(dataFilter)),
        createLocation: (data) => dispatch(actions.createLocationRedux(data)),
        onChangeLocation: (id, value) => dispatch(actions.onChangeLocationRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));