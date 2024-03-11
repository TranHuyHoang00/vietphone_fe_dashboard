import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { set_local_account } from '../../../auths/local_storage';
import { Login } from '../../../services/login_services';
import { Input, Button, message, Image } from 'antd';
import bg from '../../../assets/images/bg1.jpg';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
        }
    }
    async componentDidMount() {
    }
    onChange_Password = (event) => {
        this.setState({ password: (event.target.value).replace(/\s/g, '') })
    }
    onChange_Username = (event) => {
        this.setState({ username: (event.target.value).replace(/\s/g, '') })
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    validation = (username, password) => {
        if (this.isCheckEmpty(username) == 0) {
            return { mess: "Username cannot be blank", code: 1 };
        }
        if (this.isCheckEmpty(password) == 0) {
            return { mess: "Password cannot be blank", code: 1 };
        }
        return { code: 0 };
    }
    handle_Login = async () => {
        let result = this.validation(this.state.username, this.state.password);
        if (result.code == 0) {
            try {
                let data = await Login(this.state.username, this.state.password);
                if (data && data.data && data.data.success == 1) {
                    set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB, data.data.data);
                    this.props.history.push(`/dashboard`);
                    this.props.handle_Login_DB();
                } else {
                    message.error("Usename or password is incorrect")
                }
            } catch (e) {
                message.error("Usename or password is incorrect")
            }
        } else {
            message.error(result.mess);
        }
    }
    render() {
        return (
            <div className='h-screen w-screen flex items-center justify-center bg-center sm:bg-cover bg-no-repeat'
                style={{ backgroundImage: `url(${bg})` }}>
                <div className='shadow-md border rounded-[5px] p-[20px] space-y-[20px] 
                bg-white'>
                    <div className='text-center font-[600] text-[22px]'>
                        <label>ADMIN</label>
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Username</label>
                        <Input onChange={(event) => this.onChange_Username(event)} />
                    </div>
                    <div className='space-y-[3px]'>
                        <label className='font-[500]'>Password</label>
                        <Input.Password onChange={(event) => this.onChange_Password(event)} />
                    </div>
                    <Button onClick={() => this.handle_Login()}
                        size='large' className='w-full bg-indigo-600 font-[600] text-white'>Login</Button>
                </div>
            </div>
        );
    }

}
export default withRouter(login);
