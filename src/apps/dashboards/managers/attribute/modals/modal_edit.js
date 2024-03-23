import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { edit_attribute } from '../../../../../services/attribute_service';
import Select_group_attribute from '../elements/select_group_attribute';
import Form_input from '../../../components/inputs/form_input';
import Form_textare from '../../../components/inputs/form_textare';
import Modal_footer from '../../../components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_attribute: {},
            is_loading: false,
            mask_closable: true,
            is_update_image: false,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_attribute !== this.props.data_attribute) {
            this.setState({ data_attribute: this.props.data_attribute });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_attribute };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_attribute: {
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
            return { mess: "Không được bỏ trống 'Tên thông số' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.state.data_attribute);
        if (result.code == 0) {
            try {
                let data_attribute = this.state.data_attribute;
                if (this.state.is_update_image == false) { delete data_attribute.image; }
                let data = await edit_attribute(data_attribute.id, data_attribute);
                if (data && data.data && data.data.success == 1) {
                    await this.props.load_data();
                    this.props.open_modal("edit", false);
                    this.setState({ data_attribute: {} });
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
        let data_attribute = this.state.data_attribute;
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

                        <Form_input name={'Tên thông số'} variable={'name'} value={data_attribute.name}
                            important={true} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Select_group_attribute value={data_attribute.group_attribute}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_textare name={'Mô tả'} variable={'description'} value={data_attribute.description}
                            important={false} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_edit);