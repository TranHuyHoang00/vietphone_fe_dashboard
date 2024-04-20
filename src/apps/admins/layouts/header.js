import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { get_data_local, remove_data_local } from '@auths/local_storage';
import { Avatar, Dropdown, Space, Badge } from 'antd';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import AvatarNone from '@assets/images/avatar_none1.png'
class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
        }
    }
    async componentDidMount() {
        let data_user = get_data_local(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        if (data_user) {
            this.setState({ data_user: data_user.data.user })
        }
    }
    handle_logout = () => {
        this.props.handle_logout_db();
        remove_data_local(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        this.props.history.push(`/admin/login`);
    }
    render() {
        let data_user = this.state.data_user;
        const items = [
            {
                label: <span onClick={() => this.handle_logout()}>Đăng xuất</span>,
                key: 1,
                icon: <LogoutOutlined />,
            },
        ];
        return (
            <div className='flex items-center justify-between w-full h-full bg-white py-[5px]'>
                <Space >
                    <MenuOutlined className='md:hidden block text-[20px]' onClick={() => this.props.open_drawer_form()} />
                    <Space >
                        <div onClick={() => { this.props.history.push(`/`); }}>
                            <h1 className='cursor-pointer text-[22px] font-[500] '>ADMIN</h1>
                        </div>
                    </Space>
                </Space>
                <Dropdown menu={{ items }} placement='bottomRight' className='cursor-pointer'>
                    <Space>
                        <Badge count={1}>
                            <Avatar src={AvatarNone} size={40} />
                        </Badge>

                        <div className='max-w-[70px] truncate'>
                            <h1 className='font-medium'>{data_user && data_user.full_name}</h1>
                        </div>
                    </Space>
                </Dropdown>
            </div>
        );
    }

}
export default withRouter(header);
