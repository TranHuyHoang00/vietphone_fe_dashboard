import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Space, Typography, Radio } from 'antd';
class drawer_filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        let data_filter = this.props.data_filter;
        return (
            <Drawer title="Bộ lọc nâng cao" onClose={() => this.props.open_drawer('filter', false)} open={this.props.drawer_filter}>
                <Space direction='vertical'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={data_filter.status} onChange={(event) => this.props.onchange_page(event.target.value, 'status')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value="success">Thành công</Radio.Button>
                            <Radio.Button value="unconfirmed">Chưa xác nhận</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Nguồn</Typography.Text>
                        <Radio.Group value={data_filter.source} onChange={(event) => this.props.onchange_page(event.target.value, 'source')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value="sapo">Sapo</Radio.Button>
                            <Radio.Button value="web">Web</Radio.Button>
                        </Radio.Group>
                    </div>
                </Space>
            </Drawer>
        );
    }

}
export default withRouter(drawer_filter);