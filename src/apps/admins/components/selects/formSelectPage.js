import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, Space } from 'antd';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const dataLineNumber = [
            { value: 5, label: '5 dòng' },
            { value: 10, label: '10 dòng' },
            { value: 20, label: '20 dòng' },
            { value: 30, label: '30 dòng' },
            { value: 40, label: '40 dòng' },
            { value: 50, label: '50 dòng' },
            { value: 100, label: '100 dòng' },
        ];
        return (
            <Space>
                <span className='text-black dark:text-white'>Hiển thị</span>
                <Select
                    onChange={(value) => this.props.onChangePage(value, 'limit')}
                    defaultValue="5 dòng"
                    style={{ width: 100 }}
                    options={dataLineNumber}
                    value={this.props.limit}
                />
            </Space>

        );
    }

}
export default withRouter(index);