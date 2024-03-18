import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Space, Typography, Radio, Button } from 'antd';
class drawer_filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <Drawer title="Bộ lọc nâng cao" onClose={() => this.props.open_drawer('filter', false)} open={this.props.drawer_filter}
                extra={<Button >Áp dụng</Button>}>
                <Space direction='vertical'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Kiểu</Typography.Text>
                        <Radio.Group defaultValue={"1"} className='flex'>
                            <Radio.Button value="1">Tất cả</Radio.Button>
                            <Radio.Button value="2">Khóa</Radio.Button>
                            <Radio.Button value="3">Mở</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Sắp xếp</Typography.Text>
                        <Radio.Group defaultValue={"1"} className='flex'>
                            <Radio.Button value="1">Mới nhất</Radio.Button>
                            <Radio.Button value="2">Cũ nhất</Radio.Button>
                        </Radio.Group>
                    </div>
                </Space>
            </Drawer>
        );
    }

}
export default withRouter(drawer_filter);