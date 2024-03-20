import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select } from 'antd';
class select_is_active extends Component {
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
                    Trạng thái
                    <Typography.Text type="danger" strong> *</Typography.Text>
                </Typography.Text>
                </div>
                <Select style={{ width: 200 }} value={this.props.is_active}
                    onChange={(event) => this.props.handle_onchange_input(event, "is_active", 'select')}
                    options={[
                        { value: true, label: 'Mở' },
                        { value: false, label: 'Khóa' },
                    ]} />
            </div>
        );
    }

}
export default withRouter(select_is_active);