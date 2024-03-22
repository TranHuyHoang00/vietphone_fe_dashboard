import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, message, Input, Space, Button, Divider, Spin, Typography } from 'antd';
import { get_list_group_attribute, create_group_attribute } from '../../../../../services/group_attribute_service';
import { PlusOutlined } from '@ant-design/icons';
class select_group_attribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_group_attributes: [],
            data_group_attribute: { is_active: true },
            is_loading: false,
            data_filter: {
                page: 1,
                limit: 10,
                search_query: ''
            },
            metadata: {},
        }
    }
    async componentDidMount() {
        await this.get_list_group_attribute(this.state.data_filter);
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_group_attribute };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_group_attribute: {
                ...copyState
            }
        });
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_group_attribute = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_group_attribute(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_group_attributes: data.data.data.group_attributes,
                    metadata: data.data.data.metadata,
                });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }
    }
    on_search = async (value) => {
        let data_filter = this.state.data_filter;
        data_filter.search_query = value;
        data_filter.page = 1;
        await this.get_list_group_attribute(data_filter);
    }
    validation = (data) => {
        this.handle_loading(true);
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên loại thông số' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_group_attribute);
        if (result.code == 0) {
            try {
                let data = await create_group_attribute(this.state.data_group_attribute);
                if (data && data.data && data.data.success == 1) {
                    await this.get_list_group_attribute(this.state.data_filter);
                    this.setState({ data_group_attribute: { is_active: true } });
                    message.success("Thành công");
                } else {
                    message.error('Thất bại');
                }
            } catch (e) {
                message.error('Lỗi hệ thống');
            }
        } else {
            message.error(result.mess);
        }
        this.handle_loading(false);
    }
    render() {
        let data_group_attributes = this.state.data_group_attributes;
        return (
            <>
                <Spin size='large' spinning={this.state.is_loading}>
                    <div className='space-y-[3px]'>
                        <Typography.Text italic strong>Loại thông số</Typography.Text>
                        <Select style={{ width: '100%' }} placement='topRight'
                            onChange={(value) => this.props.handle_onchange_input(value, "group_attribute", 'select')}
                            value={this.props.value}
                            dropdownRender={(menu) => (
                                <div className='p-[5px]'>
                                    {menu}
                                    <Divider />
                                    <Space>
                                        <Input.Search onChange={(event) => this.handle_onchange_input(event, "name", 'input')}
                                            onSearch={(value) => this.on_search(value)} placeholder="Tên loại thông số!" />
                                        <Button onClick={() => this.handle_create()}
                                            className='bg-[#0e97ff] text-white' icon={<PlusOutlined />}></Button>
                                    </Space>
                                </div>
                            )}
                            options={data_group_attributes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                        />
                    </div>
                </Spin>
            </>
        );
    }

}
export default withRouter(select_group_attribute);