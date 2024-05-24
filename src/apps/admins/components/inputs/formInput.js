import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Input } from 'antd';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        const { name, important, value, onChangeInput, variable } = this.props;
        return (
            <div className='space-y-[3px]'>
                <Typography.Text italic strong>
                    {name}
                    {important && <Typography.Text type="danger" strong> *</Typography.Text>}
                </Typography.Text>
                <Input value={value} onChange={(event) => onChangeInput(event.target.value, variable)} />
            </div>
        );
    }

}
export default withRouter(index);