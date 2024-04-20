import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, Space } from 'antd';
import data_line_number from '../../datas/line_number';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <Space>
                <span className='text-black dark:text-white'>Hiển thị</span>
                <Select
                    onChange={(value) => this.props.onchange_page(value, 'limit')}
                    defaultValue="5 dòng"
                    style={{ width: 100 }}
                    options={data_line_number}
                    value={this.props.limit}
                />
            </Space>

        );
    }

}
export default withRouter(index);