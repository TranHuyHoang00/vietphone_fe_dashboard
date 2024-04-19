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
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validation = (data) => {
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên tag' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_tag);
        if (result.code === 0) {
            await this.props.create_tag(this.props.data_tag);
            let is_result = this.props.is_result;
            if (is_result) {
                this.props.open_modal("create", false);
                await this.props.get_list_tag(this.props.data_filter);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_tag = this.props.data_tag;
        let is_loading = this.props.is_loading;
        return (

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <ModalFooter open_modal={this.props.open_modal} type={'create'}
                        is_loading={is_loading} handle_funtion={this.handle_create} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <FormImage name={'Ảnh'} variable={'image'} value={data_tag.image}
                            important={true}
                            htmlFor={'load_file_create'} width={100} height={100}
                            handle_onchange_input={this.props.on_change_tag} />

                        <FormInput name={'Tên tag'} variable={'name'} value={data_tag.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_tag} />

                        <FormInput name={'Icon'} variable={'icon'} value={data_tag.icon}
                            important={false}
                            handle_onchange_input={this.props.on_change_tag} />

                        <FormTextare name={'Mô tả'} variable={'description'} value={data_tag.description}
                            important={false}
                            handle_onchange_input={this.props.on_change_tag} />

                        <FormSelectInput name={'Trạng thái'} variable={'is_active'} value={data_tag.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            handle_onchange_input={this.props.on_change_tag} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_tag: state.tag.data_tag,
        is_loading: state.tag.is_loading,
        is_result: state.tag.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_tag: (data_filter) => dispatch(actions.get_list_tag_redux(data_filter)),
        create_tag: (data) => dispatch(actions.create_tag_redux(data)),
        on_change_tag: (id, value) => dispatch(actions.on_change_tag_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));