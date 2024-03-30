import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Popconfirm, Button, Space } from 'antd';
import { AiOutlineCloudDownload } from "react-icons/ai";
class form_popconfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <Popconfirm disabled={this.props.disabled}
                title={this.props.title}
                description={this.props.description}
                okText={this.props.okText}
                cancelText={this.props.cancelText}
                okType='default'
                onConfirm={() => this.props.onConfirm(this.props.funtion_name)}>
                <Button disabled={this.props.disabled} className='bg-[#0e97ff]'>
                    <Space className='text-white'>
                        <AiOutlineCloudDownload className='text-[20px]' />
                        Đồng bộ
                    </Space>
                </Button>
            </Popconfirm>
        );
    }

}
export default withRouter(form_popconfirm);