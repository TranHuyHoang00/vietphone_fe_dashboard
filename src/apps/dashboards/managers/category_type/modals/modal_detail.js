import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';
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
                <div className="space-y-[10px]">
                    <div className='space-y-[3px]'>
                        <label className='font-semibold italic'>Tên loại danh mục</label>
                        <input value={data_category_type.name} disabled
                            className='w-full h-[40px] border border-[#07d1bc] px-[10px] rounded-[5px]' />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-semibold italic'>Mô tả</label>
                        <textarea disabled value={data_category_type.description} rows="5"
                            className='w-full border border-[#07d1bc] px-[10px] rounded-[5px]' />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-semibold italic'>Ngày tạo</label>
                        <input disabled value={data_category_type.created_at}
                            className='w-full h-[40px] border border-[#07d1bc] px-[10px] rounded-[5px]' />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-semibold italic'>Ngày cập nhập</label>
                        <input disabled value={data_category_type.updated_at}
                            className='w-full h-[40px] border border-[#07d1bc] px-[10px] rounded-[5px]' />
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);