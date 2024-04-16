import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, Divider, Space, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class form_select_item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    render() {
        return (
            <Select style={{ width: this.props.width }} placement='topRight' mode={this.props.mode}
                onChange={(value) => this.props.on_change_select(value, this.props.variable_select)}
                value={this.props.value} disabled={this.props.disabled_select}
                dropdownRender={(menu) => (
                    <div className='p-[5px]'>
                        {menu}
                        <Divider />
                        <Space>
                            <Input.Search onKeyDown={(e) => e.stopPropagation()}
                                placeholder={this.props.placeholder}
                                disabled={this.props.disabled_search}
                                onChange={(event) => this.props.on_change_input(event.target.value, this.props.variable_input)}
                                onSearch={(value) => this.props.on_search(value, this.props.form_name)} />

                            <Button disabled={this.props.disabled_button}
                                onClick={() => this.props.handle_create(this.props.form_name)}
                                className='bg-[#0e97ff] text-white' icon={<PlusOutlined />}></Button>
                        </Space>
                    </div>
                )}
                options={this.props.options}
            />
        );
    }

}
export default withRouter(form_select_item);