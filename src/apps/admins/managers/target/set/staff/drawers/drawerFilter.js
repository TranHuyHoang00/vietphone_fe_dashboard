import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Space, Typography } from 'antd';
import dayjs from 'dayjs';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { openDrawer, drawerFilter, onChangePage, dataFilter } = this.props;
        const { Text } = Typography;
        return (
            <Drawer title="Bộ lọc" onClose={() => openDrawer('filter', false)} open={drawerFilter}>
                <Space direction='vertical'>
                    <div className='space-y-[3px]'>
                        <Text italic strong>
                            Thời gian
                            <Text type="danger" strong> *</Text>
                        </Text>
                        <input className='border border-gray-300 rounded-[2px] w-full h-[35px] px-[10px]'
                            type="month" value={dayjs(dataFilter?.month).format('YYYY-MM')}
                            onChange={(event) => onChangePage(dayjs(event.target.value).startOf('month').format('YYYY-MM-DD'), 'month')} />
                    </div>
                </Space>
            </Drawer>
        );
    }

}
export default withRouter(index);