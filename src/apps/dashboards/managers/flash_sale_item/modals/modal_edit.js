import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import { Modal, message, Spin } from 'antd';
import Form_input from '../../../components/inputs/form_input';
import Form_textare from '../../../components/inputs/form_textare';
import Form_date from '../../../components/inputs/form_date';
import Form_select_input from '../../../components/selects/form_select_input';
import Modal_footer from '../../../components/modal/modal_footer';
import dayjs from 'dayjs';

class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    validation = (data) => {
        return { code: 0 };
    }
    handle_edit = async () => {
        let result = this.validation(this.props.data_flash_sale_item);
        if (result.code == 0) {
            let data_flash_sale_item = this.props.data_flash_sale_item;
            let data_flash_sale = this.props.data_flash_sale;
            await this.props.edit_flash_sale_item(data_flash_sale_item.id, data_flash_sale_item);
            let is_result = this.props.is_result;
            if (is_result == true) {
                await this.props.get_flash_sale(data_flash_sale.id);
                this.props.open_modal("edit", false);
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        let data_flash_sale_item = this.props.data_flash_sale_item;
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

                        <Form_input name={'Giá khuyến mãi'} variable={'discount_price'} value={data_flash_sale_item.discount_price}
                            important={true}
                            handle_onchange_input={this.props.on_change_flash_sale_item}
                        />
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_flash_sale_item: state.flash_sale_item.data_flash_sale_item,
        is_loading: state.flash_sale_item.is_loading,
        is_result: state.flash_sale_item.is_result,
        data_flash_sale: state.flash_sale.data_flash_sale,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        edit_flash_sale_item: (id, data) => dispatch(actions.edit_flash_sale_item_redux(id, data)),
        on_change_flash_sale_item: (id, value) => dispatch(actions.on_change_flash_sale_item_redux(id, value)),
        get_flash_sale: (id) => dispatch(actions.get_flash_sale_redux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_edit));