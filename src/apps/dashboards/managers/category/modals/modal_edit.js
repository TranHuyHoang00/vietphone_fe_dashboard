import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { edit_category } from '../../../../../services/category_service';
import Select_category_type from '../elements/select_category_type';
import Form_input from '../../../components/inputs/form_input';
import Form_textare from '../../../components/inputs/form_textare';
import Form_image from '../../../components/inputs/form_image';
import Form_select_input from '../../../components/selects/form_select_input';
import Modal_footer from '../../../components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_category: {},
            is_loading: false,
            mask_closable: true,
            is_update_image: false,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_category !== this.props.data_category) {
            this.setState({ data_category: this.props.data_category });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_category };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_category: {
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
            return { mess: "Không được bỏ trống 'Loại danh mục' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.state.data_category);
        if (result.code == 0) {
            try {
                let data_category = this.state.data_category;
                if (this.state.is_update_image == false) { delete data_category.image; }
                let data = await edit_category(data_category.id, data_category);
                if (data && data.data && data.data.success == 1) {
                    await this.props.load_data();
                    this.props.open_modal("edit", false);
                    this.setState({ data_category: {}, is_update_image: false });
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
            data_category: {
                ...this.state.data_category,
                image: image,
            },
            is_update_image: true,
        })
    }
    render() {
        let data_category = this.state.data_category;
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

                        <Form_image name={'Ảnh'} variable={'image'} value={data_category.image}
                            important={true} type={'select'}
                            htmlFor={'load_file_edit'} width={100} height={100}
                            onchange_image={this.onchange_image} />

                        <Form_input name={'Tên danh mục'} variable={'name'} value={data_category.name}
                            important={true} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_input name={'Icon'} variable={'icon'} value={data_category.icon}
                            important={false} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_textare name={'Mô tả'} variable={'description'} value={data_category.description}
                            important={false} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Select_category_type value={data_category.category_type}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_select_input name={'Trạng thái'} variable={'is_active'} value={data_category.is_active}
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