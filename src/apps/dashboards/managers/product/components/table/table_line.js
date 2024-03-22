import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
class table_line extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data = this.props.data;
        return (
            <div className='flex gap-[5px]'>
                <div className='w-1/3 flex justify-between space-x-[5px]'>
                    <Typography.Text type="secondary">{data.attribute && data.attribute.name}</Typography.Text>
                    <span>:</span>
                </div>
                <div className='w-2/3 flex items-center justify-between'>
                    <Typography.Text >{data.value}</Typography.Text>
                    <Button className='bg-[#e94138] text-white' size='small'
                        icon={<DeleteOutlined />}>
                    </Button>
                </div>
            </div>
        );
    }

}
export default withRouter(table_line);