import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Space, Typography, Radio, DatePicker } from 'antd';
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
                        <Typography.Text strong>Nguồn</Typography.Text>
                        <Radio.Group buttonStyle="solid"
                            value={dataFilter?.source} onChange={(event) => onChangePage(event.target.value, 'source')} className='flex'>
                            <Radio.Button value="store">chi nhánh</Radio.Button>
                            <Radio.Button value="staff">Nhân viên</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='space-y-[2px]'>
                        <Typography.Text strong>Thời gian</Typography.Text>
                        <div><DatePicker picker="month" allowClear={false} /></div>
                    </div>
                </Space>
            </Drawer>
        );
    }

}
export default withRouter(index);