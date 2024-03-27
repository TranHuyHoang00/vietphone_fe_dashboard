import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select, Divider, Space, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class form_select_data extends Component {
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
                <Typography.Text italic strong>{this.props.name}</Typography.Text>
                <Select disabled={this.props.disabled} style={{ width: this.props.width }} placement='topRight'
                    onChange={(value) => this.props.get_data_api(value, this.props.name_funtion)}
                    value={this.props.value}
                    dropdownRender={(menu) => (
                        <div className='p-[5px]'>
                            {menu}
                            <Divider />
                            <Space>
                                <Input.Search disabled={this.props.disabled_search}
                                    onChange={(event) => this.props.handle_onchange_input(event, this.props.variable, this.props.type, this.props.name_funtion)}
                                    onSearch={(value) => this.props.on_search_data_api(value, this.props.name_funtion)}
                                    placeholder={this.props.name} />

                                <Button disabled={this.props.disabled_create}
                                    onClick={() => this.props.handle_create(this.props.name_funtion)}
                                    className='bg-[#0e97ff] text-white' icon={<PlusOutlined />}></Button>
                            </Space>
                        </div>
                    )}
                    options={this.props.options}
                />
            </div>
        );
    }

}
export default withRouter(form_select_data);