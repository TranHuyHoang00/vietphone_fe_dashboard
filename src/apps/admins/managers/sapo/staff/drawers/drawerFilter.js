import React, { Component } from 'react';
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
            <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <Space direction='vertical'>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Trạng thái</Typography.Text>
                        <Radio.Group value={dataFilter.status} buttonStyle="solid"
                            onChange={(event) => onChangePage(event.target.value, 'status')} className='flex'>
                            <Radio.Button value="">Tất cả</Radio.Button>
                            <Radio.Button value="active">Mở</Radio.Button>
                            <Radio.Button value="inactive">Khóa</Radio.Button>
                        </Radio.Group>
                    </div>
                </Space>
            </Drawer>
        );
    }

}

export default index;