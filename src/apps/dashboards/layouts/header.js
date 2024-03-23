import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { get_local_account, remove_local_account } from '../../../auths/local_storage';
import { Avatar, Dropdown, Space } from 'antd';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {
            },
        }
    }
    async componentDidMount() {
        let data_user = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        if (data_user) {
            this.setState({ data_user: data_user.data.user })
        }
    }
    handle_logout = () => {
        this.props.handle_logout_db();
        remove_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        this.props.history.push(`/admin/login`);
    }
    render() {
        let data_user = this.state.data_user;
        const items = [
            {
                label: <a onClick={() => this.handle_logout()}>Logout</a>,
                key: '1',
                icon: <LogoutOutlined />,
            },
        ];
        return (
            <div className='flex items-center justify-between w-full h-full bg-white'>
                <Space >
                    <MenuOutlined className='md:hidden block text-[20px]' onClick={() => this.props.open_drawer_form()} />
                    <Space >
                        <h1 className=' text-[22px] font-[500] '>ADMIN</h1>
                    </Space>
                </Space>
                <Dropdown menu={{ items }} placement='bottomRight' className='cursor-pointer'>
                    <Space>
                        <Avatar src={'https://api.dicebear.com/7.x/miniavs/svg?seed=3'} size={40} />
                        <div className='max-w-[70px] truncate'>
                            <h1>{data_user && data_user.full_name}</h1>
                        </div>
                    </Space>
                </Dropdown>
            </div>
        );
    }

}
export default withRouter(header);
