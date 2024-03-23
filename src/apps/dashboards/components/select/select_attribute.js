import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, message, Input, Space, Button, Divider, Spin, Typography } from 'antd';
import { get_list_attribute, create_attribute, get_attribute } from '../../../../services/attribute_service';
import { PlusOutlined } from '@ant-design/icons';
class select_attribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_attributes: [],
            data_attribute: {},
            data_attribute: { is_active: true },
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

    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_attributes !== this.props.data_attributes) {
            this.setState({ data_attributes: this.props.data_attributes, data_attribute: {} });
        }
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_attribute };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_attribute: {
                ...copyState
            }
        });
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_attribute = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_attribute(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_attributes: data.data.data.attributes,
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
        await this.get_list_attribute(data_filter);
    }
    validation = (data) => {
        this.handle_loading(true);
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên loại thông số' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_attribute);
        if (result.code == 0) {
            try {
                let data = await create_attribute(this.state.data_attribute);
                if (data && data.data && data.data.success == 1) {
                    await this.get_list_attribute(this.state.data_filter);
                    this.setState({ data_attribute: { is_active: true } });
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
    get_attribute = async (id) => {
        this.handle_loading(true);
        try {
            let data = await get_attribute(id);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_attribute: data.data.data });
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
        await this.get_attribute(value);
        this.props.handle_get_data(this.state.data_attribute.attribute_values, 'attribute_value');
    }
    render() {
        let data_attributes = this.state.data_attributes;
        return (
            <>
                <Spin size='large' spinning={this.state.is_loading}>
                    <div className='space-y-[3px]'>
                        <Typography.Text italic strong>Thông số</Typography.Text>
                        <Select style={{ width: '100%' }} placement='topRight'
                            onChange={(value) => this.onchange_select(value)}
                            value={this.state.data_attribute.id}
                            dropdownRender={(menu) => (
                                <div className='p-[5px]'>
                                    {menu}
                                    <Divider />
                                    <Space>
                                        <Input.Search onChange={(event) => this.handle_onchange_input(event, "name", 'input')}
                                            onSearch={(value) => this.on_search(value)} placeholder="Tên thông số!" />
                                        <Button onClick={() => this.handle_create()}
                                            className='bg-[#0e97ff] text-white' icon={<PlusOutlined />}></Button>
                                    </Space>
                                </div>
                            )}
                            options={data_attributes.map((item) => ({
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
export default withRouter(select_attribute);