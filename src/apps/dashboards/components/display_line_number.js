import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select } from 'antd';
import data_line_number from '../datas/line_number';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    onchange_select = (value) => {
        this.props.onchange_page(value, 'limit');
    }
    render() {
        return (
            <Select
                onChange={(value) => this.onchange_select(value)}
                defaultValue="5 dòng"
                style={{ width: 100 }}
                options={data_line_number}
                value={this.props.limit}
            />
        );
    }

}
export default withRouter(index);