import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin } from 'antd';
import Form_input from '../../../components/inputs/form_input';
import Form_textare from '../../../components/inputs/form_textare';
import Form_image from '../../../components/inputs/form_image';
import Form_select_input from '../../../components/selects/form_select_input';
import Modal_footer from '../../../components/modal/modal_footer';
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
            return { mess: "Không được bỏ trống 'Tên tag' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.props.data_tag);
        if (result.code == 0) {
            let data_tag = this.props.data_tag;
            if (this.state.is_update_image == false) {
                delete data_tag.image;
            }
            await this.props.edit_tag(data_tag.id, data_tag);
            let is_result = this.props.is_result;
            if (is_result == true) {
                await this.props.get_list_tag(this.props.data_filter);
                this.props.open_modal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    onchange_image = (image) => {
        this.setState({ is_update_image: true, })
        this.props.on_change_tag(image, 'image');
    }
    render() {
        let data_tag = this.props.data_tag;
        let is_loading = this.props.is_loading;
        return (
            <Modal title="CHỈNH SỬA" open={this.props.modal_edit}
                onCancel={() => this.props.open_modal("edit", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <Modal_footer open_modal={this.props.open_modal} type={'edit'}
                        is_loading={is_loading} handle_funtion={this.handle_edit} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <Form_image name={'Ảnh'} variable={'image'} value={data_tag.image}
                            important={true}
                            htmlFor={'load_file_edit'} width={200} height={100}
                            onchange_image={this.onchange_image} />

                        <Form_input name={'Tên tag'} variable={'name'} value={data_tag.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_tag} />

                        <Form_input name={'Icon'} variable={'icon'} value={data_tag.icon}
                            important={false}
                            handle_onchange_input={this.props.on_change_tag} />

                        <Form_textare name={'Mô tả'} variable={'description'} value={data_tag.description}
                            important={false}
                            handle_onchange_input={this.props.on_change_tag} />

                        <Form_select_input name={'Trạng thái'} variable={'is_active'} value={data_tag.is_active}
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
        edit_tag: (id, data) => dispatch(actions.edit_tag_redux(id, data)),
        on_change_tag: (id, value) => dispatch(actions.on_change_tag_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));