import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/formInput';
import FormTextare from '@components/inputs/formTextare';
import FormDate from '@components/inputs/form_date';
import FormSelectInput from '@components/selects/formSelectInput';
import ModalFooter from '@components/modal/modalFooter';
import dayjs from 'dayjs';
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
            return { mess: "Không được bỏ trống 'Tên flash sale' ", check: false };
        }
        if (!data.start_time) {
            return { mess: "Không được bỏ trống 'Ngày bắt đầu' ", check: false };
        }
        if (!data.end_time) {
            return { mess: "Không được bỏ trống 'Ngày kết thúc' ", check: false };
        }
        return { check: true };
    }
    handleEdit = async () => {
        let result = this.validationData(this.props.data_flash_sale);
        if (result.check) {
            let data_flash_sale = this.props.data_flash_sale;
            await this.props.edit_flash_sale(data_flash_sale.id, data_flash_sale);
            let isResult = this.props.isResult;
            if (isResult) {
                this.props.openModal("edit", false);
                await this.props.get_list_flash_sale(this.props.dataFilter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_flash_sale = this.props.data_flash_sale;
        let isLoading = this.props.isLoading;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modalEdit}
                onCancel={() => this.props.openModal("edit", false)} width={400}
                maskClosable={!isLoading}
                footer={[
                    <ModalFooter openModal={this.props.openModal} type={'edit'}
                        isLoading={isLoading} selectFuncFooterModal={this.handleEdit} />
                ]}>
                <Spin spinning={isLoading}>
                    <div className="space-y-[10px]">

                        <FormDate name={'Ngày bắt đầu'} variable={'start_time'} value={dayjs(data_flash_sale.start_time).format('YYYY-MM-DDTHH:mm')}
                            important={true}
                            onChangeInput={this.props.on_change_flash_sale} />

                        <FormDate name={'Ngày kết thúc'} variable={'end_time'} value={dayjs(data_flash_sale.end_time).format('YYYY-MM-DDTHH:mm')}
                            important={true}
                            onChangeInput={this.props.on_change_flash_sale} />

                        <FormInput name={'Tên flash sale'} variable={'name'} value={data_flash_sale.name}
                            important={true}
                            onChangeInput={this.props.on_change_flash_sale} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_flash_sale.description}
                            important={false}
                            onChangeInput={this.props.on_change_flash_sale} />

                        <FormSelectInput name={'Trạng thái'} variable={'is_active'} value={data_flash_sale.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            onChangeInput={this.props.on_change_flash_sale} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_flash_sale: state.flash_sale.data_flash_sale,
        isLoading: state.flash_sale.isLoading,
        isResult: state.flash_sale.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_flash_sale: (dataFilter) => dispatch(actions.get_list_flash_sale_redux(dataFilter)),
        edit_flash_sale: (id, data) => dispatch(actions.edit_flash_sale_redux(id, data)),
        on_change_flash_sale: (id, value) => dispatch(actions.on_change_flash_sale_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));