import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select } from 'antd';
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
            <div className='space-y-[3px]'>
                <div>
                    <Typography.Text italic strong>
                        {this.props.name}
                        {this.props.important && <Typography.Text type="danger" strong> *</Typography.Text>}
                    </Typography.Text>
                </div>
                <Select style={{ width: this.props.width }} value={this.props.value} showSearch
                    filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                    onChange={(event) => this.props.onChangeInput(event, this.props.variable)}
                    options={this.props.options} />
            </div>
        );
    }

}
export default withRouter(index);