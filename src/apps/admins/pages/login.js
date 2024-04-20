import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { set_data_local } from '@auths/local_storage';
import { Login } from '@services/login_services';
import { message, Spin } from 'antd';
import bg from '@assets/images/bg.jpg';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            phone: '',
            is_loading: false,
            is_show_password: false,
        }
    }
    async componentDidMount() {
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    onchange_password = (event) => {
        this.setState({ password: (event.target.value).replace(/\s/g, '') })
    }
    onchange_phone = (event) => {
        this.setState({ phone: (event.target.value).replace(/\s/g, '') })
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    validation_phone = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    validation = (phone, password) => {
        this.handle_loading(true);
        if (this.isCheckEmpty(phone) === 0) {
            return { mess: "Số điện thoại không được bỏ trống!", code: 1 };
        }
        if (!this.validation_phone(phone)) {
            return { mess: "Số điện thoại sai định dạng", code: 1 };
        }
        if (this.isCheckEmpty(password) === 0) {
            return { mess: "Mật khẩu không được bỏ trống!", code: 1 };
        }
        return { code: 0 };
    }
    handle_login = async () => {
        let result = this.validation(this.state.phone, this.state.password);
        if (result.code === 0) {
            try {
                let data = await Login(this.state.phone, this.state.password);
                if (data && data.data && data.data.success === 1) {
                    set_data_local(process.env.REACT_APP_LOCALHOST_ACOUNT_DB, data.data.data);
                    this.props.history.push(`/admin`);
                    this.props.handle_login_db();
                }
                else {
                    message.error("Tài khoản hoặc mật khẩu không chính xác!")
                }
            } catch (e) {
                message.error("Tài khoản hoặc mật khẩu không chính xác!")
            }
        } else {
            message.error(result.mess);
        }
        this.handle_loading(false);
    }
    handle_show_password = () => {
        this.setState({ is_show_password: !this.state.is_show_password })
    }
    render() {
        return (
            <div className="h-screen w-screen font-sans bg-no-repeat bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${bg})` }}>
                <div className="leading-loose">
                    <div className=" m-4 p-[20px] md:p-[40px] bg-gray-700 bg-opacity-60 rounded shadow-xl space-y-[15px] w-[350px] sm:w-[400px]">
                        <p className="text-white font-medium text-center text-[22px] ">ADMIN</p>
                        <div className="space-y-[5px]">
                            <label className="block  text-sm text-white" for="email">Số điện thoại</label>
                            <input onChange={(event) => this.onchange_phone(event)}
                                className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                                type="text" id="phone" aria-label="phone" required />
                        </div>
                        <div className="space-y-[5px]">
                            <label className="block text-sm text-white">Mật khẩu</label>
                            <div className='relative'>
                                <input className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                                    id="password" arial-label="password" required
                                    type={this.state.is_show_password === false ? 'password' : 'text'} onChange={(event) => this.onchange_password(event)} />
                                <div onClick={() => this.handle_show_password()}
                                    className='absolute top-[12px] right-[12px] cursor-pointer'>
                                    {this.state.is_show_password === false ?
                                        <AiFillEye className='text-gray-700' />
                                        :
                                        <AiFillEyeInvisible className='text-gray-700' />
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="pt-[10px]">
                            <Spin spinning={this.state.is_loading}>
                                <button disabled={this.state.is_loading} onClick={() => this.handle_login()}
                                    className="px-4 py-[10px] w-full flex justify-center font-medium text-white tracking-wider bg-gray-900 hover:bg-gray-800 rounded" type="submit">
                                    ĐĂNG NHẬP
                                </button>
                            </Spin>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default withRouter(login);
