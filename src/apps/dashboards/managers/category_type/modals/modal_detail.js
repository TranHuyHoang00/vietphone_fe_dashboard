import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Typography } from 'antd';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_category_type = this.props.data_category_type;
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
                            <Typography.Text className='text-gray-700'>Tên loại danh mục</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category_type.name}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Mô tả</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category_type.description}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Ngày tạo</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category_type.created_at}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Ngày sửa</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category_type.updated_at}</Typography.Text>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);