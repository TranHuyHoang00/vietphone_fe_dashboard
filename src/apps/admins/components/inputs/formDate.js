import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography } from 'antd';
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
                <div>
                    <input className='border w-full h-[35px] px-[5px]'
                        type='datetime-local' value={value}
                        onChange={(event) => onChangeInput(event.target.value, variable)} />
                </div>
            </div>
        );
    }

}
export default withRouter(index);