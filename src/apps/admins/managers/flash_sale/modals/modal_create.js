import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '@components/inputs/form_input';
import FormTextare from '@components/inputs/form_textare';
import FormDate from '@components/inputs/form_date';
import FormSelectInput from '@components/selects/form_select_input';
import ModalFooter from '@components/modal/modal_footer';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validation = (data) => {
        if (!data.start_time) {
            return { mess: "Không được bỏ trống 'Ngày bắt đầu' ", code: 1 };
        }
        if (!data.end_time) {
            return { mess: "Không được bỏ trống 'Ngày kết thúc' ", code: 1 };
        }
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên flash sale' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_flash_sale);
        if (result.code === 0) {
            await this.props.create_flash_sale(this.props.data_flash_sale);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("create", false);
                await this.props.get_list_flash_sale(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_flash_sale = this.props.data_flash_sale;
        let is_loading = this.props.is_loading;
        return (

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'create'}
                        is_loading={is_loading} handle_funtion={this.handle_create} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <FormDate name={'Ngày bắt đầu'} variable={'start_time'} value={data_flash_sale.start_time}
                            important={true}
                            handle_onchange_input={this.props.on_change_flash_sale} />

                        <FormDate name={'Ngày kết thúc'} variable={'end_time'} value={data_flash_sale.end_time}
                            important={true}
                            handle_onchange_input={this.props.on_change_flash_sale} />

                        <FormInput name={'Tên flash sale'} variable={'name'} value={data_flash_sale.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_flash_sale} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_flash_sale.description}
                            important={false}
                            handle_onchange_input={this.props.on_change_flash_sale} />

                        <FormSelectInput name={'Trạng thái'} variable={'is_active'} value={data_flash_sale.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            handle_onchange_input={this.props.on_change_flash_sale} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_flash_sale: state.flash_sale.data_flash_sale,
        is_loading: state.flash_sale.is_loading,
        is_result: state.flash_sale.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_flash_sale: (data_filter) => dispatch(actions.get_list_flash_sale_redux(data_filter)),
        create_flash_sale: (data) => dispatch(actions.create_flash_sale_redux(data)),
        on_change_flash_sale: (id, value) => dispatch(actions.on_change_flash_sale_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));