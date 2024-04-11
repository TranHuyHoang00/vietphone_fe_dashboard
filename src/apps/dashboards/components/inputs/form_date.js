import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography } from 'antd';
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
                    {this.props.important && <Typography.Text type="danger" strong> *</Typography.Text>}
                </Typography.Text>
                <div>
                    <input className='border w-full h-[35px] px-[5px]'
                        type='datetime-local' value={this.props.value}
                        onChange={(event) => this.props.handle_onchange_input(event.target.value, this.props.variable)} />
                </div>
            </div>
        );
    }

}
export default withRouter(form_date);