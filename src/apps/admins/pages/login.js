import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { setDataLocal } from '@auths/localStorage';
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
            isLoading: false,
            isShowPassword: false,
        }
    }
    async componentDidMount() {
    }
    handleLoading = (value) => {
        this.setState({ isLoading: value });
    }
    onChangePassword = (event) => {
        this.setState({ password: (event.target.value).replace(/\s/g, '') })
    }
    onChangePhone = (event) => {
        this.setState({ phone: (event.target.value).replace(/\s/g, '') });
    }
    isCheckEmpty = (value) => {
        return value.trim().length
    }
    validationPhone = (phone_number) => {
        const re = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])(?:\d{7}|\d{7})$/;
        return re.test(phone_number);
    }
    validationData = (phone, password) => {
        this.handleLoading(true);
        if (this.isCheckEmpty(phone) === 0) {
            return { mess: "Số điện thoại không được bỏ trống!", check: false };
        }
        if (!this.validationPhone(phone)) {
            return { mess: "Số điện thoại sai định dạng", check: false };
        }
        if (this.isCheckEmpty(password) === 0) {
            return { mess: "Mật khẩu không được bỏ trống!", check: false };
        }
        return { check: true };
    }
    handleLogin = async () => {
        const { phone, password } = this.state;
        const result = this.validationData(phone, password);
        const { setLogin } = this.props;
        if (result.check) {
            try {
                let data = await Login(phone, password);
                if (data && data.data && data.data.success === 1) {
                    await setDataLocal(process.env.REACT_APP_LOCALHOST_ACOUNT_DB, data.data.data);
                    setLogin(true);
                    this.props.history.push(`/admin`);
                    window.location.href = '/admin';
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
        this.handleLoading(false);
    }
    onShowPassword = () => {
        const { isShowPassword } = this.state;
        this.setState({ isShowPassword: !isShowPassword })
    }
    render() {
        const { isShowPassword, isLoading } = this.state;
        return (
            <div className="h-screen w-screen font-sans bg-no-repeat bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${bg})` }}>
                <div className="leading-loose">
                    <div className=" m-4 p-[20px] md:p-[40px] bg-gray-700 bg-opacity-60 rounded shadow-xl space-y-[15px] w-[350px] sm:w-[400px]">
                        <p className="text-white font-medium text-center text-[22px] ">ADMIN</p>
                        <div className="space-y-[5px]">
                            <label className="block  text-sm text-white" for="email">Số điện thoại</label>
                            <input onChange={(event) => this.onChangePhone(event)}
                                className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                                type="text" id="phone" aria-label="phone" required />
                        </div>
                        <div className="space-y-[5px]">
                            <label className="block text-sm text-white">Mật khẩu</label>
                            <div className='relative'>
                                <input className="w-full px-5 py-1 text-gray-700 bg-gray-100 rounded focus:outline-none focus:bg-white"
                                    id="password" arial-label="password" required
                                    type={isShowPassword ? 'text' : 'password'} onChange={(event) => this.onChangePassword(event)} />
                                <div onClick={() => this.onShowPassword()}
                                    className='absolute top-[12px] right-[12px] cursor-pointer'>
                                    {isShowPassword ?
                                        <AiFillEyeInvisible className='text-gray-700' />
                                        :
                                        <AiFillEye className='text-gray-700' />

                                    }
                                </div>
                            </div>

                        </div>
                        <div className="pt-[10px]">
                            <Spin spinning={isLoading}>
                                <button disabled={isLoading} onClick={() => this.handleLogin()}
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

const mapStateToProps = state => {
    return {
        loggedIn: state.login.loggedIn,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setLogin: (data) => dispatch(actions.setLoginRedux(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(login));