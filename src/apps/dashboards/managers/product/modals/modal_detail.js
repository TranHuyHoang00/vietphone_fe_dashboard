import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Input, Typography, Select } from 'antd';
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
        return (
            <Modal title="CHI TIẾT" open={this.props.modal_detail}
                onCancel={() => this.props.open_modal("detail", false)} width={400}
                footer={[
                    <>
                        <Button onClick={() => this.props.open_modal("detail", false)}
                            className='bg-[#e94138] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <div className='border-t py-[10px] space-y-[5px]'>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Mã KH</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.code}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Họ và tên</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.user && data_customer.user.full_name}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Số điện thoại</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.user && data_customer.user.phone}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Email</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.email}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Giới tính</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.gender}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Vai trò</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.user && data_customer.user.user_type}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Địa chỉ</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.address}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Ngày sinh</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.date_of_birth}</Typography.Text>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);