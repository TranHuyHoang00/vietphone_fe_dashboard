import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { edit_variant_attribute_group } from '../../../../../services/variant_attribute_group_service';
import Select_attribute from '../elements/select_attribute';
import Form_input from '../../../components/inputs/form_input';
import Modal_footer from '../../../components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_variant_attribute_group: {},
            is_loading: false,
            mask_closable: true,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_variant_attribute_group !== this.props.data_variant_attribute_group) {
            this.setState({ data_variant_attribute_group: this.props.data_variant_attribute_group });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_variant_attribute_group };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_variant_attribute_group: {
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
        let result = this.validation(this.state.data_variant_attribute_group);
        if (result.code == 0) {
            try {
                let data_variant_attribute_group = this.state.data_variant_attribute_group;
                if (this.state.is_update_image == false) { delete data_variant_attribute_group.image; }
                let data = await edit_variant_attribute_group(data_variant_attribute_group.id, data_variant_attribute_group);
                if (data && data.data && data.data.success == 1) {
                    await this.props.load_data();
                    this.props.open_modal("edit", false);
                    this.setState({ data_variant_attribute_group: {} });
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
        let data_variant_attribute_group = this.state.data_variant_attribute_group;
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

                        <Form_input name={'Tên loại TT-SP'} variable={'name'} value={data_variant_attribute_group.name}
                            important={true} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <Select_attribute value={data_variant_attribute_group.attribute}
                            handle_onchange_input={this.handle_onchange_input} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_edit);