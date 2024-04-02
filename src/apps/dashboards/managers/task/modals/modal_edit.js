import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin } from 'antd';
import FormInput from '../../../components/inputs/form_input';
import FormTextare from '../../../components/inputs/form_textare';
import FormImage from '../../../components/inputs/form_image';
import FormSelectInput from '../../../components/selects/form_select_input';
import ModalFooter from '../../../components/modal/modal_footer';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_update_image: false,
        }
    }
    async componentDidMount() {
    }
    validation = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên thương hiệu' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.props.data_brand);
        if (result.code === 0) {
            let data_brand = this.props.data_brand;
            if (this.state.is_update_image === false) {
                delete data_brand.image;
            }
            await this.props.edit_brand(data_brand.id, data_brand);
            let is_result = this.props.is_result;
            if (is_result === true) {
                await this.props.get_list_brand(this.props.data_filter);
                this.props.open_modal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    onchange_image = (image) => {
        this.setState({ is_update_image: true, })
        this.props.on_change_brand(image, 'image');
    }
    render() {
        let data_brand = this.props.data_brand;
        let is_loading = this.props.is_loading;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'edit'}
                        is_loading={is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <FormImage name={'Ảnh'} variable={'image'} value={data_brand.image}
                            important={true}
                            htmlFor={'load_file_edit'} width={200} height={100}
                            onchange_image={this.onchange_image} />

                        <FormInput name={'Tên thương hiệu'} variable={'name'} value={data_brand.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_brand} />

                        <FormInput name={'Icon'} variable={'icon'} value={data_brand.icon}
                            important={false}
                            handle_onchange_input={this.props.on_change_brand} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_brand.description}
                            important={false}
                            handle_onchange_input={this.props.on_change_brand} />

                        <FormSelectInput name={'Trạng thái'} variable={'is_active'} value={data_brand.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            handle_onchange_input={this.props.on_change_brand} />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_brand: state.brand.data_brand,
        is_loading: state.brand.is_loading,
        is_result: state.brand.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_brand: (data_filter) => dispatch(actions.get_list_brand_redux(data_filter)),
        edit_brand: (id, data) => dispatch(actions.edit_brand_redux(id, data)),
        on_change_brand: (id, value) => dispatch(actions.on_change_brand_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));