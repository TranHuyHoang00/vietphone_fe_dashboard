import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, DatePicker } from 'antd';
class form_date extends Component {
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
                <Typography.Text italic strong>
                    {this.props.name}
                    {this.props.important === true && <Typography.Text type="danger" strong> *</Typography.Text>}
                </Typography.Text>
                <div>
                    <DatePicker className='w-full' allowClear showTime needConfirm={true}
                        value={this.props.value} onChange={(event) => this.props.handle_onchange_input(event, this.props.variable)} />
                </div>
            </div>
        );
    }

}
export default withRouter(form_date);