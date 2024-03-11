import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Modal, message, Image } from 'antd';
import { edit_user } from '../../../../../services/user_services';
import { convert_ImageToBase64 } from '../../../../../utils/base64';
class modal_edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
            confirm_Loading: false,
            is_check_edit_image: false,
            is_check_edit: false,
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_user !== this.props.data_user) {
            this.setState({ data_user: this.props.data_user });
        }
    }
    handle_OnchangeInput = (event, id) => {
        let copyState = { ...this.state.data_user };
        copyState[id] = event.target.value;
        this.setState({
            is_check_edit: true,
            data_user: {
                ...copyState
            }
        });
    }
    handle_confirm_Loading = (value) => {
        this.setState({ confirm_Loading: value });
    }
    isCheckSpace = (value) => {
        return (/\s/).test(value);
    }
    validation = (data) => {
        this.handle_confirm_Loading(true);
        if (!data.fullname) {
            return { mess: "Fullname cannot be blank", code: 1 };
        }
        if (this.isCheckSpace(data.password) == true) {
            return { mess: "Password contains spaces", code: 1 };
        }
        return { code: 0 };
    }
    handle_Edit = async (id) => {
        if (this.state.is_check_edit == false) {
            message.success("Success");
            this.props.open_Form("edit", false);
        } else {
            let result = this.validation(this.state.data_user);
            if (result.code == 0) {
                let data_user = this.state.data_user;
                if (this.state.is_check_edit_image == false) {
                    delete data_user.avatar;
                }
                try {
                    let data = await edit_user(id, this.state.data_user);
                    if (data && data.data && data.data.success == 1) {
                        message.success("Success");
                        await this.props.get_list_user();
                        this.props.open_Form("edit", false);
                        this.setState({
                            data_user: {},
                            is_check_edit: false,
                            is_check_edit_image: false
                        });
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

    }
    onchange_Image = async (image) => {
        let data = await convert_ImageToBase64(image);
        if (data) {
            this.setState({
                is_check_edit_image: true,
                is_check_edit: true,
                data_user: {
                    ...this.state.data_user,
                    avatar: data
                }
            })
        }
    }
    render() {
        let data_user = this.state.data_user;
        return (
            <Modal title="EDIT" open={this.props.modal_edit}
                okText={"CONFIRM"} okType={"default"} cancelText={"CANCEL"}
                onOk={() => this.handle_Edit(data_user.id)}
                onCancel={() => this.props.open_Form("edit", false)}
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
                        <Input disabled value={data_user.username} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Password<span className='text-red-500'> *</span></label>
                        <Input.Password value={data_user.password} placeholder='Cannot be blank'
                            onChange={(event) => this.handle_OnchangeInput(event, 'password')} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Fullname<span className='text-red-500'> *</span></label>
                        <Input value={data_user.fullname} placeholder='Cannot be blank'
                            onChange={(event) => this.handle_OnchangeInput(event, 'fullname')} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Role<span className='text-red-500'> *</span></label><br />
                        <Input disabled value={data_user.role && data_user.role.name} />

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
export default withRouter(modal_edit);