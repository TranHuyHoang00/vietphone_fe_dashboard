import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message } from 'antd';
import { create_role } from '../../../../../services/role_services';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_role: {},
            confirm_Loading: false,
        }
    }
    async componentDidMount() {
    }
    handle_OnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_role };
        copyState[id] = event.target.value;
        this.setState({
            data_role: {
                ...copyState
            }
        });
    }
    handle_confirm_Loading = (value) => {
        this.setState({ confirm_Loading: value });
    }
    validation = (data) => {
        this.handle_confirm_Loading(true);
        let data_roles = this.props.data_roles;
        for (const i of data_roles) {
            if (i.name == data.name) {
                return { mess: "Name already exists ", code: 1 };
            };
        }
        if (!data.name) {
            return { mess: "Name cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handle_Create = async () => {
        let result = this.validation(this.state.data_role);
        if (result.code == 0) {
            try {
                let data = await create_role(this.state.data_role);
                if (data && data.data && data.data.success == 1) {
                    message.success("Success");
                    await this.props.get_list_role();
                    this.props.open_Form("create", false);
                    this.setState({ data_role: {} });
                } else {
                    message.error('Error');
                }
            } catch (e) {
                message.error('System Error');
            }
        } else {
            message.error(result.mess);
        }
        this.handle_confirm_Loading(false);
    }
    render() {
        let data_role = this.state.data_role;
        return (
            <Modal title="CREATE" open={this.props.modal_create}
                okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                onOk={() => this.handle_Create()}
                onCancel={() => this.props.open_Form("create", false)}
                width={300} confirmLoading={this.state.confirm_Loading}>
                <div className="space-y-[10px]">
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Name<span className="text-red-500"> *</span></label>
                        <Input className='lowercase' value={data_role.name}
                            onChange={(event) => this.handle_OnchangeInput(event, "name")} />
                    </div>
                </div>

            </Modal>
        );
    }

}
export default withRouter(modal_create);