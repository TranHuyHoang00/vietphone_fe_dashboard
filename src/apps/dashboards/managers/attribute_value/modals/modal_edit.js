import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { edit_attribute } from '../../../../../services/attribute_service';
import Select_attribute from '../elements/select_attribute';
import Form_input from '../../../components/form/form_input';
import Form_textare from '../../../components/form/form_textare';
import Modal_footer from '../../../components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_attribute_value: {},
            is_loading: false,
            mask_closable: true,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_attribute_value !== this.props.data_attribute_value) {
            this.setState({ data_attribute_value: this.props.data_attribute_value });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_attribute_value };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_attribute_value: {
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
        if (!data.value) {
            return { mess: "Không được bỏ trống 'Giá trị' ", code: 1 };
        }
        if (!data.attribute) {
            return { mess: "Không được bỏ trống 'Thông số' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.state.data_attribute_value);
        if (result.code == 0) {
            try {
                let data_attribute_value = this.state.data_attribute_value;
                let data = await edit_attribute(data_attribute_value.id, data_attribute_value);
                if (data && data.data && data.data.success == 1) {
                    await this.props.load_data();
                    this.props.open_modal("edit", false);
                    this.setState({ data_attribute_value: {} });
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
        let data_attribute_value = this.state.data_attribute_value;
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

                        <Form_input name={'Giá trị'} variable={'value'} value={data_attribute_value.value} type={'danger'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Select_attribute value={data_attribute_value.attribute}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Form_textare name={'Mô tả'} variable={'description'} value={data_attribute_value.description}
                            handle_onchange_input={this.handle_onchange_input} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_edit);