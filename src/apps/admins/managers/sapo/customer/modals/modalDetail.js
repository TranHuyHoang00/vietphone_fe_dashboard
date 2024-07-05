import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button, Spin } from 'antd';
import { textLine13 } from '@components/displays/line13';
import { formatDay } from '@utils/handleFuncFormat';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { dataCustomer, isLoading, modalDetail, openModal } = this.props;
        return (
            <Modal title="CHI TIẾT" open={modalDetail}
                onCancel={() => openModal("detail", false)} width={600}
                footer={[
                    <Button onClick={() => openModal("detail", false)}
                        className='bg-[#e94138] text-white'>
                        Hủy bỏ
                    </Button>
                ]}>
                <Spin spinning={isLoading}>
                    <div className='border-t py-[10px] space-y-[5px]'>
                        {textLine13('Mã KH', dataCustomer.code)}
                        {textLine13('Họ và tên', (dataCustomer.user?.full_name))}
                        {textLine13('Số điện thoại', (dataCustomer.user?.phone))}
                        {textLine13('Email', dataCustomer.email)}
                        {textLine13('Giới tính', dataCustomer.gender)}
                        {textLine13('Vai trò', (dataCustomer.user?.user_type))}
                        {textLine13('Địa chỉ', dataCustomer.address)}
                        {textLine13('Ngày sinh', dataCustomer.date_of_birth)}
                        {textLine13('Ngày tạo', formatDay(dataCustomer.created_at))}
                        {textLine13('Ngày sửa', formatDay(dataCustomer.updated_at))}
                    </div>
                </Spin>
            </Modal>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataCustomer: state.customer.dataCustomer,
        isLoading: state.customer.isLoading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));