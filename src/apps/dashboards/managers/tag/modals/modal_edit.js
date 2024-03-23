import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { edit_tag } from '../../../../../services/tag_service';
import Form_input from '../../../components/inputs/form_input';
import Form_textare from '../../../components/inputs/form_textare';
import Form_image from '../../../components/inputs/form_image';
import Form_select_input from '../../../components/selects/form_select_input';
import Modal_footer from '../../../components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_tag: {},
            is_loading: false,
            mask_closable: true,
            is_update_image: false,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_tag !== this.props.data_tag) {
            this.setState({ data_tag: this.props.data_tag });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_tag };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_tag: {
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
            return { mess: "Không được bỏ trống 'Tên Tag' ", code: 1 };
        }
        if (!data.icon) {
            return { mess: "Không được bỏ trống 'Icon' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.state.data_tag);
        if (result.code == 0) {
            try {
                let data_tag = this.state.data_tag;
                if (this.state.is_update_image == false) { delete data_tag.image; }
                let data = await edit_tag(data_tag.id, data_tag);
                if (data && data.data && data.data.success == 1) {
                    await this.props.load_data();
                    this.props.open_modal("edit", false);
                    this.setState({ data_tag: {}, is_update_image: false });
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
            data_tag: {
                ...this.state.data_tag,
                image: image,
            },
            is_update_image: true,
        })
    }
    render() {
        let data_tag = this.state.data_tag;
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

                        <Form_image name={'Ảnh'} variable={'image'} value={data_tag.image}
                            important={true} type={'select'}
                            htmlFor={'load_file_edit'} width={100} height={100}
                            onchange_image={this.onchange_image} />

                        <Form_input name={'Tên Tag'} variable={'name'} value={data_tag.name}
                            important={true} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_input name={'Icon'} variable={'icon'} value={data_tag.icon}
                            important={false} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_textare name={'Mô tả'} variable={'description'} value={data_tag.description}
                            important={false} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_select_input name={'Trạng thái'} variable={'is_active'} value={data_tag.is_active}
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