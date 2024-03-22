import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select } from 'antd';
class form_select_active extends Component {
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
                <div><Typography.Text italic strong>
                    {this.props.name}
                    <Typography.Text type="danger" strong> *</Typography.Text>
                </Typography.Text>
                </div>
                <Select style={{ width: 200 }} value={this.props.value}
                    onChange={(event) => this.props.handle_onchange_input(event, this.props.variable, 'select')}
                    options={[
                        { value: true, label: 'Mở' },
                        { value: false, label: 'Khóa' },
                    ]} />
            </div>
        );
    }

}
export default withRouter(form_select_active);