import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin,Typography } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormDate from '@components/inputs/formDate';
import FormSelectSingle from '@components/selects/formSelectSingle';
import ModalFooter from '@components/modals/modalFooter';
import dayjs from 'dayjs';
import FormImage from '@components/inputs/formImage';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditImage: false,
        }
    }
    async componentDidMount() {
    }
    validationData = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên flash sale' ", check: false };
        }
        if (!data.start_time) {
            return { mess: "Không được bỏ trống 'Ngày bắt đầu' ", check: false };
        }
        if (!data.end_time) {
            return { mess: "Không được bỏ trống 'Ngày kết thúc' ", check: false };
        }
        if (!data.color) {
            return { mess: "Không được bỏ trống 'Màu nền' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        const { dataFlashSale, isResult, openModal, getListFlashSale, editFlashSale, dataFilter } = this.props;
        const { isEditImage } = this.state;
        const result = this.validationData(dataFlashSale);
        let newDataFlashSale = { ...dataFlashSale };
        if (result.check) {
            if (isEditImage === false) { delete newDataFlashSale.background; }
            await editFlashSale(newDataFlashSale.id, newDataFlashSale);
            if (isResult) {
                await getListFlashSale(dataFilter);
                openModal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    onChangeImage = (background) => {
        const { onChangeFlashSale } = this.props;
        this.setState({ isEditImage: true, })
        onChangeFlashSale(background, 'background');
    }
    render() {
        const { dataFlashSale, isLoading, onChangeFlashSale, modalEdit, openModal } = this.props;
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

                        <FormImage name={'Ảnh nền'} variable={'background'} value={dataFlashSale.background}
                            important={true}
                            htmlFor={'loadImageEditBg'} width={300} height={100}
                            onChangeImage={this.onChangeImage} />

                        <FormDate name={'Ngày bắt đầu'} variable={'start_time'} value={dayjs(dataFlashSale.start_time).format('YYYY-MM-DDTHH:mm')}
                            important={true}
                            onChangeInput={onChangeFlashSale} />

                        <FormDate name={'Ngày kết thúc'} variable={'end_time'} value={dayjs(dataFlashSale.end_time).format('YYYY-MM-DDTHH:mm')}
                            important={true}
                            onChangeInput={onChangeFlashSale} />

                        <FormInput name={'Tên flash sale'} variable={'name'} value={dataFlashSale.name}
                            important={true}
                            onChangeInput={onChangeFlashSale} />

                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Màu nền
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <div>
                                <input onChange={(event) => { onChangeFlashSale(event.target.value, 'color'); }}
                                    value={dataFlashSale.color} type='color' className='w-full' />
                            </div>
                        </div>

                        <FormTextare name={'Mô tả'} variable={'description'} value={dataFlashSale.description}
                            important={false}
                            onChangeInput={onChangeFlashSale} />

                        <FormSelectSingle name={'Trạng thái'} variable={'is_active'} value={dataFlashSale.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={onChangeFlashSale} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataFlashSale: state.flash_sale.dataFlashSale,
        isLoading: state.flash_sale.isLoading,
        isResult: state.flash_sale.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getListFlashSale: (dataFilter) => dispatch(actions.getListFlashSaleRedux(dataFilter)),
        editFlashSale: (id, data) => dispatch(actions.editFlashSaleRedux(id, data)),
        onChangeFlashSale: (id, value) => dispatch(actions.onChangeFlashSaleRedux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));