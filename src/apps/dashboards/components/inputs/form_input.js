import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Input } from 'antd';
class form_input extends Component {
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
                <Input value={this.props.value} onChange={(event) => this.props.handle_onchange_input(event.target.value, this.props.variable)} />
            </div>
        );
    }

}
export default withRouter(form_input);