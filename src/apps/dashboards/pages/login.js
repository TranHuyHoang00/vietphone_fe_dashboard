import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { set_local_account } from '../../../auths/local_storage';
import { Login } from '../../../services/login_services';
import { message, Spin } from 'antd';
import bg from '../../../assets/images/bg.jpg';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from 'axios';

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
        if (this.isCheckEmpty(phone) == 0) {
            return { mess: "Số điện thoại không được bỏ trống!", code: 1 };
        }
        if (!this.validation_phone(phone)) {
            return { mess: "Số điện thoại sai định dạng", code: 1 };
        }
        if (this.isCheckEmpty(password) == 0) {
            return { mess: "Mật khẩu không được bỏ trống!", code: 1 };
        }
        return { code: 0 };
    }
    handle_login = async () => {
        let result = this.validation(this.state.phone, this.state.password);
        if (result.code == 0) {
            try {
                let data = await Login(this.state.phone, this.state.password);
                if (data && data.data && data.data.success == 1) {
                    set_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB, data.data.data);
                    this.props.history.push(`/dashboard`);
                    this.props.handle_login_db();
                }
                else {
                    message.error("Tài khoản hoặc mật khẩu không chính xác!")
                }
            } catch (e) {
                message.error("Lỗi hệ thống")
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
            <div class="bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
                <div class="absolute bg-gradient-to-b from-green-500 to-green-600 opacity-40 inset-0 z-0"></div>
                <div class="flex items-center justify-center h-screen p-[10px]">
                    <div class="flex justify-center self-center z-10">
                        <div class="p-[20px] md:p-[30px] bg-white mx-auto rounded-2xl w-100 space-y-[20px]">
                            <div class="text-center space-y-[10px]">
                                <h3 class="font-bold text-2xl text-gray-800">ADMIN</h3>
                                <div class="text-gray-500">
                                    <p >Xin hãy đăng nhập bằng tài khoản của bạn.</p>
                                </div>
                            </div>
                            <div class="space-y-5">
                                <div class="space-y-2">
                                    <label class="font-medium text-gray-700">Số điện thoại</label>
                                    <input class=" w-full text-base px-4 py-2 border  border-gray-600 rounded-full focus:outline-none focus:border-green-400"
                                        placeholder="0886825356" onChange={(event) => this.onchange_phone(event)} />
                                </div>
                                <div class="space-y-[5px]">
                                    <label class="font-medium text-gray-700">
                                        Mật khẩu
                                    </label>
                                    <div className='relative'>
                                        <input class="w-full content-center text-base px-4 py-2 border border-gray-600 rounded-full focus:outline-none focus:border-green-400"
                                            type={this.state.is_show_password == false ? 'password' : 'text'} placeholder="Nhập mật khẩu" onChange={(event) => this.onchange_password(event)} />
                                        <div onClick={() => this.handle_show_password()}
                                            className='absolute top-[12px] right-[12px] cursor-pointer'>
                                            {this.state.is_show_password == false ?
                                                <AiFillEye className='text-gray-700' />
                                                :
                                                <AiFillEyeInvisible className='text-gray-700' />
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='pt-[10px] md:pt-[20px]'>
                                    <Spin spinning={this.state.is_loading}>
                                        <button disabled={this.state.is_loading} onClick={() => this.handle_login()}
                                            class="w-full flex justify-center bg-green-500 text-white p-[10px] rounded-full font-semibold">
                                            ĐĂNG NHẬP
                                        </button>
                                    </Spin>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default withRouter(login);
