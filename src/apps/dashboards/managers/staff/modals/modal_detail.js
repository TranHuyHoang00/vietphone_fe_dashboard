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
        let data_staff = this.props.data_staff;
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
                <div className="space-y-[10px]">
                    <div className="space-y-[10px]">
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Họ và tên
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Input value={data_staff.full_name} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>
                                Số điện thoại
                                <Typography.Text type="danger" strong> *</Typography.Text>
                            </Typography.Text>
                            <Input value={data_staff.phone} />
                        </div>
                        <div className='space-y-[3px]'>
                            <Typography.Text italic strong>Email</Typography.Text>
                            <Input value={data_staff.email} />
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-[3px]'>
                                <div><Typography.Text italic strong>Giới tính</Typography.Text></div>
                                <Select style={{ width: 120 }} value={data_staff.gender}
                                    options={[
                                        { value: true, label: 'Nam' },
                                        { value: false, label: 'Nữ' },
                                    ]} />
                            </div>
                            <div className='space-y-[3px]'>
                                <div><Typography.Text italic strong>Trạng thái</Typography.Text></div>
                                <Select style={{ width: 120 }} value={data_staff.activate}
                                    options={[
                                        { value: true, label: 'Mở' },
                                        { value: false, label: 'Khóa' },
                                    ]} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);