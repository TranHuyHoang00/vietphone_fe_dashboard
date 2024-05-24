import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { textLine13 } from '@components/displays/line13';
import { format_day } from '@utils/format_day';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_customer = this.props.data_customer;
        let isLoading = this.props.isLoading;
        return (
            <Modal title="CHI TIẾT" open={this.props.modalDetail}
                onCancel={() => this.props.openModal("detail", false)} width={600}
                footer={[
                    <>
                        <Button onClick={() => this.props.openModal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <Spin spinning={isLoading}>
                    <div className='border-t py-[10px] space-y-[5px]'>
                        {textLine13('Mã KH', data_customer.code)}
                        {textLine13('Họ và tên', (data_customer.user && data_customer.user.full_name))}
                        {textLine13('Số điện thoại', (data_customer.user && data_customer.user.phone))}
                        {textLine13('Email', data_customer.email)}
                        {textLine13('Giới tính', data_customer.gender)}
                        {textLine13('Vai trò', (data_customer.user && data_customer.user.user_type))}
                        {textLine13('Địa chỉ', data_customer.address)}
                        {textLine13('Ngày sinh', data_customer.date_of_birth)}
                        {textLine13('Ngày tạo', format_day(data_customer.created_at))}
                        {textLine13('Ngày sửa', format_day(data_customer.updated_at))}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_customer: state.customer.data_customer,
        isLoading: state.customer.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));