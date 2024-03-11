import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { get_local_account, remove_local_account } from '../../../auths/local_storage';
import { Avatar, Dropdown, Space } from 'antd';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
class header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: {},
        }
    }
    async componentDidMount() {
        let data_user = get_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        if (data_user) {
            this.setState({ data_user: data_user.data.user })
        }
    }
    onClickLogout = () => {
        this.props.handle_Logout_DB();
        remove_local_account(process.env.REACT_APP_LOCALHOST_ACOUNT_DB);
        this.props.history.push(`/dashboard/login`);
    }
    render() {
        let data_user = this.state.data_user;
        const items = [
            {
                label: <a onClick={() => this.onClickLogout()}>Logout</a>,
                key: '1',
                icon: <LogoutOutlined />,
            },
        ];
        return (
            <div className='flex items-center justify-between w-full h-full bg-white'>
                <Space >
                    <MenuOutlined className='md:hidden block text-[20px]' onClick={() => this.props.open_DrawerForm()} />
                    <Space >
                        <h1 className=' text-[22px] font-[500] '>ADMIN</h1>
                    </Space>
                </Space>
                <Dropdown menu={{ items }} className='cursor-pointer'>
                    <Space>
                        <Avatar src={(data_user.avatar == "" || !data_user.avatar || data_user.avatar == null) ? require(`../../../assets/images/None.jpg`).default
                            : data_user.avatar} size={30} />
                        <div className='max-w-[70px] truncate'>
                            <h1>{data_user && data_user.fullname}</h1>
                        </div>
                    </Space>
                </Dropdown>
            </div>
        );
    }

}
export default withRouter(header);
