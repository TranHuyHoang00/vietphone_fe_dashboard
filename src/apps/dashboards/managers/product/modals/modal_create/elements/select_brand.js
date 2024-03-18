import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class select_brand extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }

    render() {
        return (
            <div className='space-y-[3px]'>
                <div>
                    <Typography.Text italic strong>
                        Thương hiệu
                        <Typography.Text type="danger" strong> *</Typography.Text>
                    </Typography.Text>
                </div>
                <Select style={{ width: 180 }}
                    options={[
                        { value: 1, label: 'Iphone' },
                        { value: 2, label: 'SamSung' },
                    ]} />
            </div>
        );
    }

}
export default withRouter(select_brand);