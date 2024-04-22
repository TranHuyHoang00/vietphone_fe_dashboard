import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { text_line_1_3 } from '@components/displays/data_line_1_3';
import { format_day } from '@utils/format_day';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_customer = this.props.data_customer;
        let is_loading = this.props.is_loading;
        return (
            <Modal title="CHI TIẾT" open={this.props.modal_detail}
                onCancel={() => this.props.open_modal("detail", false)} width={600}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <Spin spinning={is_loading}>
                    <div className='border-t py-[10px] space-y-[5px]'>
                        {text_line_1_3('Mã KH', data_customer.code)}
                        {text_line_1_3('Họ và tên', (data_customer.user && data_customer.user.full_name))}
                        {text_line_1_3('Số điện thoại', (data_customer.user && data_customer.user.phone))}
                        {text_line_1_3('Email', data_customer.email)}
                        {text_line_1_3('Giới tính', data_customer.gender)}
                        {text_line_1_3('Vai trò', (data_customer.user && data_customer.user.user_type))}
                        {text_line_1_3('Địa chỉ', data_customer.address)}
                        {text_line_1_3('Ngày sinh', data_customer.date_of_birth)}
                        {text_line_1_3('Ngày tạo', format_day(data_customer.created_at))}
                        {text_line_1_3('Ngày sửa', format_day(data_customer.updated_at))}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_customer: state.customer.data_customer,
        is_loading: state.customer.is_loading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(modal_detail));