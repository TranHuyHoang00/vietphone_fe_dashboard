import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { edit_brand } from '../../../../../services/brand_service';
import Form_input from '../../../components/inputs/form_input';
import Form_textare from '../../../components/inputs/form_textare';
import Form_image from '../../../components/inputs/form_image';
import Form_select_input from '../../../components/selects/form_select_input';
import Modal_footer from '../../../components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_brand: {},
            is_loading: false,
            mask_closable: true,
            is_update_image: false,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_brand !== this.props.data_brand) {
            this.setState({ data_brand: this.props.data_brand });
        }
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
    handle_edit = async () => {
        let result = this.validation(this.state.data_brand);
        if (result.code == 0) {
            try {
                let data_brand = this.state.data_brand;
                if (this.state.is_update_image == false) { delete data_brand.image; }
                let data = await edit_brand(data_brand.id, data_brand);
                if (data && data.data && data.data.success == 1) {
                    await this.props.load_data();
                    this.props.open_modal("edit", false);
                    this.setState({ data_brand: {}, is_update_image: false });
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
    onchange_image = (image) => {
        this.setState({
            data_brand: {
                ...this.state.data_brand,
                image: image,
            },
            is_update_image: true,
        })
    }
    render() {
        let data_brand = this.state.data_brand;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={400}
                maskClosable={this.state.mask_closable}
                footer={[
                    <Modal_footer open_modal={this.props.open_modal} type={'edit'}
                        is_loading={this.state.is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={this.state.is_loading}>
                    <div className="space-y-[10px]">

                        <Form_image name={'Ảnh'} variable={'image'} value={data_brand.image}
                            important={true} type={'select'}
                            htmlFor={'load_file_edit'} width={200} height={100}
                            onchange_image={this.onchange_image} />

                        <Form_input name={'Tên thương hiệu'} variable={'name'} value={data_brand.name}
                            important={true} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_input name={'Icon'} variable={'icon'} value={data_brand.icon}
                            important={false} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_textare name={'Mô tả'} variable={'description'} value={data_brand.description}
                            important={false} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_select_input name={'Trạng thái'} variable={'is_active'} value={data_brand.is_active}
                            important={false} type={'select'} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            handle_onchange_input={this.handle_onchange_input} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_edit);