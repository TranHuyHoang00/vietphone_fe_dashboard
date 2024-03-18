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
        let data_menu = this.props.data_menu;
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
                            <Typography.Text className='text-gray-700'>Danh mục</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_menu.category_id && data_menu.category_id.name}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Trạng thái</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_menu.activate == true ? 'Mở' : 'Khóa'}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Ngày tạo</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_menu.created_at}</Typography.Text>
                        </div>
                    </div>
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3'>
                            <Typography.Text className='text-gray-700'>Ngày sửa</Typography.Text>
                        </div>
                        <div className='w-2/3'>
                            <Typography.Text>: {data_menu.updated_at}</Typography.Text>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);