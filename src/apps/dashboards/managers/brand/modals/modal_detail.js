import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Typography, Image } from 'antd';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_brand = this.props.data_brand;
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
                            <Typography.Text className='text-gray-700'>Ảnh</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            {data_brand.image == null ?
                                <span>:</span>
                                :
                                <Image width={100} height={50} src={data_brand.image} className='object-cover' />
                            }
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Tên thương hiệu</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_brand && data_brand.name}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Icon</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_brand && data_brand.icon}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Slug</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_brand && data_brand.slug}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Mô tả</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_brand && data_brand.description}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Trạng thái</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_brand && data_brand.is_active == true ? 'Mở' : 'Khóa'}</Typography.Text>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);