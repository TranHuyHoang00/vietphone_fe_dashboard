import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { create_variant_attribute_group } from '../../../../../services/variant_attribute_group_service';
import Select_attribute from '../elements/select_attribute';
import Form_input from '../../../components/inputs/form_input';
import Modal_footer from '../../../components/modal/modal_footer';
class modal_create extends Component {
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
            return { mess: "Không được bỏ trống 'Tên TS-SP' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_variant_attribute_group);
        if (result.code == 0) {
            try {
                let data = await create_variant_attribute_group(this.state.data_variant_attribute_group);
                if (data && data.data && data.data.success == 1) {
                    await this.props.load_data();
                    this.props.open_modal("create", false);
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

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={this.state.mask_closable}
                footer={[
                    <Modal_footer open_modal={this.props.open_modal} type={'create'}
                        is_loading={this.state.is_loading} handle_funtion={this.handle_create} />
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
export default withRouter(modal_create);