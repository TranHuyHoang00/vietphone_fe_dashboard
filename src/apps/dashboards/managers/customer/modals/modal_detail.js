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
                            className='bg-[#ed1e24] text-white'>
                            Hủy bỏ
                        </Button>
                    </>
                ]}>
                <div className='border-t py-[10px] space-y-[5px]'>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Họ và tên</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.full_name}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Số điện thoại</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.phone}</Typography.Text>
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
                            <Typography.Text>: {data_customer.gender == true ? 'Nam' : 'Nữ'}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Trạng thái</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.activate == true ? 'Mở' : 'Khóa'}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Ngày tạo</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.created_at}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Ngày sửa</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_customer.updated_at}</Typography.Text>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);