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
        let id = this.props.id;
        let is_edit = this.props.is_edit;
        return (
            <>
                {(data && data.attribute && data.attribute.group_attribute && data.attribute.group_attribute.id == id) &&
                    <div className='flex gap-[5px]'>
                        <div className='w-1/3 flex justify-between space-x-[5px]'>
                            <Typography.Text type="secondary">{data.attribute && data.attribute.name}</Typography.Text>
                            <span>:</span>
                        </div>
                        <div className='w-2/3 flex items-center justify-between'>
                            <div className='flex-grow'>
                                <Typography.Text class="break-word">{data.value}</Typography.Text>
                            </div>
                            <div className='min-w-0 flex-shrink-0'>
                                <Button disabled={!is_edit}
                                    onClick={() => this.props.handle_delete_atbvl(data.id)}
                                    className='bg-[#e94138] text-white' size='small'
                                    icon={<DeleteOutlined />}>
                                </Button>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }

}
export default withRouter(table_line);