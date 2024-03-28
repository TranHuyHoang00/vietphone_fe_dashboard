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
            return { mess: "Không được bỏ trống 'Tên danh mục' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.props.data_category);
        if (result.code == 0) {
            await this.props.create_category(this.props.data_category);
            let is_result = this.props.is_result;
            if (is_result == true) {
                await this.props.get_list_category(this.props.data_filter);
                this.props.open_modal("create", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_category = this.props.data_category;
        let is_loading = this.props.is_loading;
        return (

            <Modal title="TẠO MỚI" open={this.props.modal_create}
                onCancel={() => this.props.open_modal("create", false)} width={400}
                maskClosable={!is_loading}
                footer={[
                    <Modal_footer open_modal={this.props.open_modal} type={'create'}
                        is_loading={is_loading} handle_funtion={this.handle_create} />
                ]}>
                <Spin spinning={is_loading}>
                    <div className="space-y-[10px]">

                        <Form_image name={'Ảnh'} variable={'image'} value={data_category.image}
                            important={true}
                            htmlFor={'load_file_create'} width={100} height={100}
                            handle_onchange_input={this.props.on_change_category} />

                        <Form_input name={'Tên danh mục'} variable={'name'} value={data_category.name}
                            important={true}
                            handle_onchange_input={this.props.on_change_category} />

                        <Form_input name={'Icon'} variable={'icon'} value={data_category.icon}
                            important={false}
                            handle_onchange_input={this.props.on_change_category} />

                        <Form_textare name={'Mô tả'} variable={'description'} value={data_category.description}
                            important={false}
                            handle_onchange_input={this.props.on_change_category} />

                        <Form_select_input name={'Trạng thái'} variable={'is_active'} value={data_category.is_active}
                            important={false} width={'100%'}
                            options={[
                                { value: true, label: 'Mở' },
                                { value: false, label: 'Khóa' },
                            ]}
                            handle_onchange_input={this.props.on_change_category} />

                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_category: state.category.data_category,
        is_loading: state.category.is_loading,
        is_result: state.category.is_result,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        get_list_category: (data_filter) => dispatch(actions.get_list_category_redux(data_filter)),
        create_category: (data) => dispatch(actions.create_category_redux(data)),
        on_change_category: (id, value) => dispatch(actions.on_change_category_redux(id, value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_create));