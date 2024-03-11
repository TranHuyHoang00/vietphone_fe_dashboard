import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message, Image } from 'antd';
import { create_user } from '../../../../../services/user_services';
import { get_list_role } from '../../../../../services/role_services';
import { convert_ImageToBase64 } from '../../../../../utils/base64';
class modal_create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: { color: '#1677FF', },
            confirm_Loading: false,
            data_roles: [],
        }
    }
    async componentDidMount() {
        await this.get_list_role();
    }
    get_list_role = async () => {
        try {
            let data = await get_list_role();
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_roles: data.data.data })
            } else {
                message.error('Error');
            }
        } catch (e) {
            message.error('System Error');
        }
    }
    handle_OnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_user };
        copyState[id] = event.target.value;
        this.setState({
            data_user: {
                ...copyState
            }
        });
    }
    handle_confirm_Loading = (value) => {
        this.setState({ confirm_Loading: value });
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    isCheckSpace = (value) => {
        return (/\s/).test(value);
    }
    validation = (data) => {
        this.handle_confirm_Loading(true);
        let data_users = this.props.data_users;
        if (!data.avatar) {
            return { mess: "Avatar cannot be blank", code: 1 };
        }
        for (const i of data_users) {
            if (i.username == data.username) {
                return { mess: "Username already exists ", code: 1 };
            };
        }
        if (!data.username) {
            return { mess: "Username cannot be blank", code: 1 };
        }
        if (this.isCheckSpace(data.username) == true) {
            return { mess: "Username contains spaces", code: 1 };
        }
        if (!data.password) {
            return { mess: "Password cannot be blank", code: 1 };
        }
        if (this.isCheckSpace(data.password) == true) {
            return { mess: "Password contains spaces", code: 1 };
        }
        if (!data.fullname) {
            return { mess: "Fullname cannot be blank", code: 1 };
        }
        if (!data.role_id || data.role_id == 0) {
            return { mess: "Role cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handle_Create = async () => {
        let result = this.validation(this.state.data_user);
        if (result.code == 0) {
            try {
                let data = await create_user(this.state.data_user);
                if (data && data.data && data.data.success == 1) {
                    message.success("Success");
                    await this.props.get_list_user();
                    this.props.open_Form("create", false);
                    this.setState({ data_user: { color: '#1677FF', role_id: 0 } });
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
    onchange_Image = async (image) => {
        let data = await convert_ImageToBase64(image);
        if (data) {
            this.setState({
                data_user: {
                    ...this.state.data_user,
                    avatar: data
                }
            })
        }
    }
    render() {
        let data_user = this.state.data_user;
        let data_roles = this.state.data_roles;
        return (
            <Modal title="CREATE" open={this.props.modal_create}
                okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                onOk={() => this.handle_Create()}
                onCancel={() => this.props.open_Form("create", false)}
                width={300} confirmLoading={this.state.confirm_Loading}>
                <div className='space-y-[10px]'>
                    <div className='flex items-center justify-center'>
                        <Image width={200} height={200} src={data_user.avatar}
                            className=' object-cover rounded-[5px]' />
                    </div>
                    <div className='text-center'>
                        <input id="load_file" type="file" accept="image/*" hidden
                            onChange={(image) => this.onchange_Image(image)} />
                        <label htmlFor="load_file"
                            className=' border rounded-[5px] px-[10px] py-[3px] cursor-pointer '>
                            Change
                        </label>
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Username<span className='text-red-500'> *</span></label>
                        <Input value={data_user.username}
                            onChange={(event) => this.handle_OnchangeInput(event, 'username')} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Password<span className='text-red-500'> *</span></label>
                        <Input.Password value={data_user.password}
                            onChange={(event) => this.handle_OnchangeInput(event, 'password')} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Fullname<span className='text-red-500'> *</span></label>
                        <Input value={data_user.fullname}
                            onChange={(event) => this.handle_OnchangeInput(event, 'fullname')} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Role<span className='text-red-500'> *</span></label><br />
                        <select className='border w-full rounded-[5px] p-[5px]'
                            onChange={(event) => this.handle_OnchangeInput(event, 'role_id')}
                            value={data_user.role_id}>
                            <option value={'0'}></option>
                            {data_roles && data_roles.map((item, index) => {
                                return (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Characteristic color</label>
                        <input type='color' value={data_user.color} className='w-full h-[30px]'
                            onChange={(event) => this.handle_OnchangeInput(event, 'color')} />
                    </div>
                </div>
            </Modal>
        );
    }

}
export default withRouter(modal_create);