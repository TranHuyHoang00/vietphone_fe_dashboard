import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { create_brand } from '../../../../../services/brand_service';
import Form_input from '../../../components/form/form_input';
import Form_textare from '../../../components/form/form_textare';
import Form_select_active from '../../../components/form/form_select_active';
import Form_select_image from '../../../components/form/form_select_image';
import Modal_footer from '../../../components/modal/modal_footer';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_brand: {
                is_active: true,
            },
            is_loading: false,
            mask_closable: true,
        }
    }
    async componentDidMount() {
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_brand };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_brand: {
                ...copyState
            }
        });
    }
    handle_loading = (value) => {
        this.setState({
            is_loading: value,
            mask_closable: !value
        });
    }
    validation = (data) => {
        this.handle_loading(true);
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên thương hiệu' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_brand);
        if (result.code == 0) {
            try {
                let data = await create_brand(this.state.data_brand);
                if (data && data.data && data.data.success == 1) {
                    await this.props.load_data();
                    this.props.open_modal("create", false);
                    this.setState({ data_brand: { is_active: true } });
                    message.success("Thành công");
                } else {
                    message.error('Thất bại');
                }
            } catch (e) {
                message.error('Lỗi hệ thống');
            }
        } else {
            message.error(result.mess);
        }
        this.handle_loading(false);
    }
    render() {
        let data_brand = this.state.data_brand;
        return (

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={this.state.mask_closable}
                footer={[
                    <Modal_footer open_modal={this.props.open_modal} type={'create'}
                        is_loading={this.state.is_loading} handle_funtion={this.handle_create} />
                ]}>
                <Spin spinning={this.state.is_loading}>
                    <div className="space-y-[10px]">
                        <Form_select_image name={'Ảnh'} variable={'image'} value={data_brand.image}
                            htmlFor={'load_file_create'} width={200} height={100}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_input name={'Tên thương hiệu'} variable={'name'} value={data_brand.name} type={'danger'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_input name={'Icon'} variable={'icon'} value={data_brand.icon}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_textare name={'Mô tả'} variable={'description'} value={data_brand.description}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_select_active name={'Trạng thái'} variable={'is_active'} value={data_brand.is_active}
                            handle_onchange_input={this.handle_onchange_input} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_create);