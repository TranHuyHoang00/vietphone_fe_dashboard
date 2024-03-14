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
        let data_category = this.props.data_category;
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
                            <Typography.Text className='text-gray-700'>Ảnh</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            {data_category.image == null ?
                                <Typography.Text >None</Typography.Text>
                                :
                                <Image width={30} src={data_category.image} />
                            }
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Tên danh mục</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category.name}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Loại danh mục</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            {(data_category.category_type_id && data_category.category_type_id.name) ?
                                <Typography.Text>: {data_category.category_type_id.name}</Typography.Text>
                                :
                                <Typography.Text>:None</Typography.Text>
                            }
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Quan hệ</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            {(data_category.parent_id && data_category.parent_id.name) ?
                                <Typography.Text>: {data_category.parent_id.name}</Typography.Text>
                                :
                                <Typography.Text>:None</Typography.Text>
                            }
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Trạng thái</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category.activate == true ? 'Mở' : 'Khóa'}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Slug</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category.slug}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Icon</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category.icon}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Mô tả</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category.description}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Ngày tạo</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category.created_at}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Ngày sửa</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_category.updated_at}</Typography.Text>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);