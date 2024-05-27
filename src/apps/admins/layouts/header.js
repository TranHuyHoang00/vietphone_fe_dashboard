import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { getDataLocal, deleteDataLocal, setDataLocal } from '@auths/localStorage';
import { Avatar, Dropdown, Space } from 'antd';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import AvatarNone from '@assets/images/avatarNone1.png'
class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
            darkMode: '',
        }
    }
    async componentDidMount() {
        const dataUser = await getDataLocal(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        let darkMode = await getDataLocal(process.env.REACT_APP_LOCALHOST_DARK_MODE);
        const { setDarkMode } = this.props;
        if (dataUser) {
            if (!darkMode) {
                darkMode = { data: false };
                setDataLocal(process.env.REACT_APP_LOCALHOST_DARK_MODE, false);
            } else {
                document.documentElement.classList.toggle('dark', darkMode.data);
            }
            setDarkMode(darkMode.data);
            this.setState({ dataUser: dataUser.data.user, darkMode: darkMode.data });
        }
    }
    handleLogout = () => {
        const { handleLogoutAdmin } = this.props;
        handleLogoutAdmin();
        deleteDataLocal(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        this.props.history.push(`/admin/login`);
    }
    handleSetDarkMode = (value) => {
        const { setDarkMode } = this.props;
        this.setState({ darkMode: value });
        setDataLocal(process.env.REACT_APP_LOCALHOST_DARK_MODE, value);
        setDarkMode(value);
        document.documentElement.classList.toggle('dark', value);
    }
    render() {
        const { dataUser, darkMode } = this.state;
        const items = [
            {
                label: <span onClick={() => this.handleLogout()}>Đăng xuất</span>,
                key: 1,
                icon: <LogoutOutlined />,
            },
        ];
        return (
            <div className='sticky top-0 z-50 shadow-sm h-auto mx-[10px]'>
                <div className='flex items-center justify-between w-full h-full py-[5px] px-[20px] bg-white dark:bg-[#001529]'>
                    <Space >
                        <MenuOutlined className='md:hidden block text-[20px] text-black dark:text-white ' onClick={() => this.props.openDrawerMenu()} />
                        <Space >
                            <div onClick={() => { this.props.history.push(`/`); }}>
                                <h1 className='cursor-pointer text-[22px] font-[500] text-black dark:text-white'>ADMIN</h1>
                            </div>
                        </Space>
                    </Space>
                    <Space>
                        {darkMode ?
                            <div onClick={() => this.handleSetDarkMode(false)}
                                className='border cursor-pointer p-[5px] rounded-full shadow-sm border-orange-600'>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path class="fill-orange-600" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
                                    <path class="fill-orange-600" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
                                </svg>
                            </div>
                            :
                            <div onClick={() => this.handleSetDarkMode(true)}
                                className='border cursor-pointer p-[5px] rounded-full border-gray-500 shadow-sm'>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path class="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
                                    <path class="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
                                </svg>
                            </div>
                        }
                        <Dropdown menu={{ items }} placement='bottomRight' className='cursor-pointer'>
                            <Space>
                                <Avatar src={AvatarNone} size={40} />
                                <div className='max-w-[70px] truncate'>
                                    <h1 className='font-medium text-gray-900 dark:text-white'>{dataUser && dataUser.full_name}</h1>
                                </div>
                            </Space>
                        </Dropdown>
                    </Space>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setDarkMode: (value) => dispatch(actions.setDarkModeRedux(value)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(header));
