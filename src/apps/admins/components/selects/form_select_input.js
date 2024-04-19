import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select } from 'antd';
class form_select_input extends Component {
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
                <Select style={{ width: this.props.width }} value={this.props.value}
                    onChange={(event) => this.props.handle_onchange_input(event, this.props.variable)}
                    options={this.props.options} />
            </div>
        );
    }

}
export default withRouter(form_select_input);