import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal } from 'antd';
class modal_detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_role = this.props.data_role;
        return (
            <Modal title="DETAIL" open={this.props.modal_detail}
                okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                onOk={() => this.props.open_Form("detail", false)}
                onCancel={() => this.props.open_Form("detail", false)}
                width={300}>
                <div className="space-y-[10px]">
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Name</label>
                        <Input value={data_role.name} />
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_detail);