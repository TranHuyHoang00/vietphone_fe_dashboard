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
    render() {

        return (
            <>
                <Select
                    defaultValue="5 dòng"
                    style={{ width: 100 }}
                    options={data_line_number}
                />
            </>
        );
    }

}
export default withRouter(index);