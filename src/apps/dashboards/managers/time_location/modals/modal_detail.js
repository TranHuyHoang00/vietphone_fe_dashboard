import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, Space } from 'antd';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_time_location = this.props.data_time_location;
        return (
            <Modal title="DETAIL" open={this.props.modal_detail}
                okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                onOk={() => this.props.open_Form("detail", false)}
                onCancel={() => this.props.open_Form("detail", false)}
                width={400}>
                <div className='space-y-[10px]'>
                    <Space wrap>
                        <div className='space-y-[3px]'>
                            <label className='font-[500]'>Show date</label><br />
                            <Input type='date' value={data_time_location && data_time_location.show_date} />
                        </div>
                        <div className='space-y-[3px]'>
                            <label className='font-[500]'>Show time</label><br />
                            <Input type='time' value={data_time_location && data_time_location.show_time} />
                        </div>
                    </Space>
                    <Space wrap>
                        <div className='space-y-[3px]'>
                            <label className='font-[500]'>Leave time</label><br />
                            <Input type='time' value={data_time_location && data_time_location.leave_time} />
                        </div>
                        <div className='space-y-[3px]'>
                            <label className='font-[500]'>Makeup time</label><br />
                            <Input type='time' value={data_time_location && data_time_location.make_up_time} />
                        </div>
                    </Space>
                    <Space wrap>
                        <div className='space-y-[3px]'>
                            <label className='font-[500]'>Agency name</label><br />
                            <Input value={data_time_location && data_time_location.agency_name} />
                        </div>
                        <div className='space-y-[3px]'>
                            <label className='font-[500]'>Contact</label><br />
                            <Input className='w-[100px]' value={data_time_location && data_time_location.contact} />
                        </div>
                    </Space>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Show location</label><br />
                        <Input.TextArea className='font-[600] italic'
                            value={data_time_location && data_time_location.show_localtion} />
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);