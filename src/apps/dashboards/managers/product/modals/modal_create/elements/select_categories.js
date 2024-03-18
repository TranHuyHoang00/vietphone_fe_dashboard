import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select, Button, Space } from 'antd';
class select_categories extends Component {
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
                        Danh mục
                        <Typography.Text type="danger" strong> *</Typography.Text>
                    </Typography.Text>
                </div>
                <Select style={{ width: '100%' }} mode="multiple" placement='topRight'
                    options={[
                        { value: 1, label: 'Điện thoại' },
                        { value: 2, label: 'Loa' },
                        { value: 3, label: 'Phụ kiện' },
                    ]} />
            </div>
        );
    }

}
export default withRouter(select_categories);