import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Space, Typography, Radio } from 'antd';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { dataFilter, openDrawer, drawerFilter, onChangePage } = this.props;
        return (
            <Drawer title="Bộ lọc nâng cao" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <Space direction='vertical'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={dataFilter.status} onChange={(event) => onChangePage(event.target.value, 'status')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value="success">Thành công</Radio.Button>
                            <Radio.Button value="unconfirmed">Chưa xác nhận</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Nguồn</Typography.Text>
                        <Radio.Group value={dataFilter.source} onChange={(event) => onChangePage(event.target.value, 'source')} className='flex'>
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
export default withRouter(index);