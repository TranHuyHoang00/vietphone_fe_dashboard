import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, message, Spin } from 'antd';
import { edit_category_type } from '../../../../../services/category_type_service';
import FormInput from '../../../components/inputs/form_input';
import FormTextare from '../../../components/inputs/form_textare';
import ModalFooter from '../../../components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_category_type: {},
            is_loading: false,
            mask_closable: true,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_category_type !== this.props.data_category_type) {
            this.setState({ data_category_type: this.props.data_category_type });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_category_type };
        if (type === 'input') { copyState[id] = event.target.value; }
        if (type === 'select') { copyState[id] = event; }
        this.setState({
            data_category_type: {
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
            return { mess: "Không được bỏ trống 'Tên loại danh mục' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.state.data_category_type);
        if (result.code === 0) {
            try {
                let data_category_type = this.state.data_category_type;
                let data = await edit_category_type(data_category_type.id, data_category_type);
                if (data && data.data && data.data.success === 1) {
                    await this.props.load_data();
                    this.props.open_modal("edit", false);
                    this.setState({ data_category_type: {} });
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
        let data_category_type = this.state.data_category_type;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={400}
                maskClosable={this.state.mask_closable}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'edit'}
                        is_loading={this.state.is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={this.state.is_loading}>
                    <div className="space-y-[10px]">

                        <FormInput name={'Tên loại danh mục'} variable={'name'} value={data_category_type.name}
                            important={true} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_category_type.description}
                            important={false} type={'input'}
                            handle_onchange_input={this.handle_onchange_input} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
export default withRouter(modal_edit);