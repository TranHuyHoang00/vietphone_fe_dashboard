import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin, Typography } from 'antd';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modals/modalFooter';
import FormSelectMultiple from '@components/selects/formSelectMultiple';
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
            return { mess: "Không được bỏ trống 'Tên thông số' ", check: false };
        }
        return { check: true };
    }
    handleCreate = async () => {
        const { dataTarget, isResult, openModal, getListTarget, createTarget, dataFilter } = this.props;
        const result = this.validationData(dataTarget);
        if (result.check) {
            await createTarget(dataTarget);
            if (isResult) {
                await getListTarget(dataFilter);
                openModal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    formatNumber = (number) => {
        console.log('number', number);
        if (number) { return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
    };
    render() {
        const { dataTarget, isLoading, onChangeTarget, modalCreate, openModal } = this.props;
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
                        <FormSelectSingle name={'Tạo Target cho'} variable={'type'} value={dataTarget.type}
                            important={true} width={'100%'}
                            options={[
                                { label: 'Cửa hàng', value: 1 },
                                { label: 'Nhân viên', value: 2 },
                            ]}
                            onChangeInput={onChangeTarget} />

                        {dataTarget && dataTarget.type && <>
                            {dataTarget?.type === 1 &&
                                <FormSelectSingle name={'Chọn cửa hàng'} variable={'store'} value={dataTarget.store}
                                    important={true} width={'100%'}
                                    options={[
                                        { label: 'Vietphone 16', value: 1 },
                                        { label: 'Vietphone 21', value: 2 },
                                    ]}
                                    onChangeInput={onChangeTarget} />
                            }
                            {dataTarget?.type === 2 &&
                                <div className='space-y-[3px]'>
                                    <Typography.Text italic strong>
                                        Nhân viên
                                        <Typography.Text type="danger" strong> *</Typography.Text>
                                    </Typography.Text>
                                    <FormSelectMultiple width={'100%'} placeholder={'Chọn nhân viên'}
                                        nameFormSelect={'staff'} mode={'multiple'}
                                        value={dataTarget.staff}
                                        options={[
                                            { label: 'Huy Hoàng', value: 1 },
                                            { label: 'Phúc Đại', value: 2 },
                                        ]}
                                        disabledSelect={false}
                                        disabledButtonCreate={false}
                                        disabledSearch={false}
                                        onSearch={this.onSearch}
                                        variableSelect={'staff'}
                                        onChangeSelect={onChangeTarget}
                                        variableInputSearch={'name'}
                                    // onChangeInput={onChangeTag}
                                    // handleCreate={this.handleCreate}
                                    />
                                </div>
                            }
                            <div className='space-y-[3px]'>
                                <Typography.Text italic strong>
                                    Target
                                    <Typography.Text type="danger" strong> *</Typography.Text>
                                </Typography.Text>
                                <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                                    type="number" min="0"
                                    value={dataTarget?.target}
                                    onChange={(event) => onChangeTarget(event.target.value, 'target')}
                                />
                            </div>
                        </>}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataTarget: state.target.dataTarget,
        isLoading: state.target.isLoading,
        isResult: state.target.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListTarget: (dataFilter) => dispatch(actions.getListTargetRedux(dataFilter)),
        createTarget: (data) => dispatch(actions.createTargetRedux(data)),
        onChangeTarget: (id, value) => dispatch(actions.onChangeTargetRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));