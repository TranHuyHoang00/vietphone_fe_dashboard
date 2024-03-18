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
        let data_tag = this.props.data_tag;
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
                            {data_tag.image == null ?
                                <span>:</span>
                                :
                                <Image width={50} height={50} src={data_tag.image} className='object-cover' />
                            }
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Tên Tag</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_tag && data_tag.name}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Icon</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_tag && data_tag.icon}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Slug</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_tag && data_tag.slug}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Mô tả</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_tag && data_tag.description}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Trạng thái</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_tag && data_tag.is_active == true ? 'Mở' : 'Khóa'}</Typography.Text>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);