import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, message, Input, Space, Button, Divider, Spin } from 'antd';
import { get_list_variant_attribute_group, create_variant_attribute_group } from '../../../../../../services/variant_attribute_group_service';
import { PlusOutlined } from '@ant-design/icons';
class select_variant_attribute_group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_variant_attribute_groups: [],
            data_variant_attribute_group: {},
            is_loading: false,
            data_filter: {
                page: 1,
                limit: 100,
                search_query: ''
            },
            metadata: {},
        }
    }
    async componentDidMount() {
        await this.get_list_variant_attribute_group(this.state.data_filter);
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_variant_attribute_group };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_variant_attribute_group: {
                ...copyState
            }
        });
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_variant_attribute_group = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_variant_attribute_group(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_variant_attribute_groups: data.data.data.varriant_attribute_groups,
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
        await this.get_list_variant_attribute_group(data_filter);
    }
    validation = (data) => {
        this.handle_loading(true);
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên variant_attribute_group' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_variant_attribute_group);
        if (result.code == 0) {
            try {
                let data = await create_variant_attribute_group(this.state.data_variant_attribute_group);
                if (data && data.data && data.data.success == 1) {
                    await this.get_list_variant_attribute_group(this.state.data_filter);
                    this.setState({ data_variant_attribute_group: { is_active: true } });
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
        let data_variant_attribute_groups = this.state.data_variant_attribute_groups;
        return (
            <>
                <Spin size='large' spinning={this.state.is_loading}>
                    <Select disabled={!this.props.is_edit} style={{ width: '100%' }} placement='topRight'
                        onChange={(value) => this.props.handle_onchange_input(value, "variant_attribute_group", 'select')}
                        value={this.props.value}
                        dropdownRender={(menu) => (
                            <div className='p-[5px]'>
                                {menu}
                                <Divider />
                                <Space>
                                    <Input.Search onChange={(event) => this.handle_onchange_input(event, "name", 'input')}
                                        onSearch={(value) => this.on_search(value)} placeholder="Tên!" />
                                </Space>
                            </div>
                        )}
                        options={data_variant_attribute_groups.map((item) => ({
                            label: item.name,
                            value: item.id,
                        }))}
                    />
                </Spin>
            </>
        );
    }

}
export default withRouter(select_variant_attribute_group);