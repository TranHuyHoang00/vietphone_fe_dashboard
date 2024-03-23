import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, Input, Space, Button, Divider, Spin, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { get_attribute_value } from '../../../../services/attribute_value_service';

class select_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_attribute_values: [],
            data_attribute_value: {},

            is_loading: false,
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_attribute_values !== this.props.data_attribute_values) {
            this.setState({
                data_attribute_values: this.props.data_attribute_values,
                data_attribute_value: {}
            });
        }
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_attribute_value = async (id) => {
        this.handle_loading(true);
        try {
            let data = await get_attribute_value(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_attribute_value: data.data.data });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }

    }
    onchange_select = async (value) => {
        await this.get_attribute_value(value);
        this.props.handle_get_data(this.state.data_attribute_value, 'data');
    }
    render() {
        let data_attribute_values = this.state.data_attribute_values;
        return (
            <>
                <Spin size='large' spinning={this.state.is_loading}>
                    <div className='space-y-[3px]'>
                        <Typography.Text italic strong>Giá trị thông số</Typography.Text>
                        <Select style={{ width: '100%' }} placement='topRight'
                            onChange={(value) => this.onchange_select(value)}
                            value={this.state.data_attribute_value.id}
                            dropdownRender={(menu) => (
                                <div className='p-[5px]'>
                                    {menu}
                                    <Divider />
                                    <Space>
                                        <Input.Search onChange={(event) => this.handle_onchange_input(event, "name", 'input')}
                                            onSearch={(value) => this.on_search(value)} placeholder="Giá trị thông số !" />
                                        <Button onClick={() => this.handle_create()}
                                            className='bg-[#0e97ff] text-white' icon={<PlusOutlined />}></Button>
                                    </Space>
                                </div>
                            )}
                            options={data_attribute_values.map((item) => ({
                                label: item.value,
                                value: item.id,
                            }))}
                        />
                    </div>
                </Spin>
            </>
        );
    }

}
export default withRouter(select_attribute_value);