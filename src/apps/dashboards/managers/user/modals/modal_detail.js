import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, Image } from 'antd';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_user = this.props.data_user;
        return (
            <Modal title="DETAIL" open={this.props.modal_detail}
                okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                onOk={() => this.props.open_Form("detail", false)}
                onCancel={() => this.props.open_Form("detail", false)}
                width={300}>
                <div className='space-y-[10px]'>
                    <div className='flex items-center justify-center'>
                        <Image width={200} height={200}
                            className=' object-cover rounded-[5px]'
                            src={(data_user.avatar == "" || data_user.avatar == null) ? require(`../../../../../assets/images/None.jpg`).default : data_user.avatar} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Username</label>
                        <Input value={data_user.username} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Fullname</label>
                        <Input value={data_user.fullname} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Role</label><br />
                        <Input value={data_user.role && data_user.role.name} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Characteristic color</label>
                        <Input type='color' value={data_user.color} />
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);