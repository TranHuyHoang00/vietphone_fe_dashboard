import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Select, message, Input, Space, Button, Divider, Spin } from 'antd';
import { get_list_tag, create_tag } from '../../../../../../services/tag_service';
import { PlusOutlined } from '@ant-design/icons';
class select_tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_tags: [],
            data_tag: { is_active: true },
            is_loading: false,
            data_filter: {
                page: 1,
                limit: 5,
                search_query: ''
            },
            metadata: {},
        }
    }
    async componentDidMount() {
        await this.get_list_tag(this.state.data_filter);
    }
    handle_onchange_input = (event, id, type) => {
        let copyState = { ...this.state.data_tag };
        if (type == 'input') { copyState[id] = event.target.value; }
        if (type == 'select') { copyState[id] = event; }
        this.setState({
            data_tag: {
                ...copyState
            }
        });
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_tag = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_tag(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_tags: data.data.data.tags,
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
        await this.get_list_tag(data_filter);
    }
    validation = (data) => {
        this.handle_loading(true);
        if (!data.name) {
            return { mess: "Không được bỏ trống 'Tên tag' ", code: 1 };
        }
        return { code: 0 };
    }
    handle_create = async () => {
        let result = this.validation(this.state.data_tag);
        if (result.code == 0) {
            try {
                let data = await create_tag(this.state.data_tag);
                if (data && data.data && data.data.success == 1) {
                    await this.get_list_tag(this.state.data_filter);
                    this.setState({ data_tag: { is_active: true } });
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
        let data_tags = this.state.data_tags;
        return (
            <>
                <Spin size='large' spinning={this.state.is_loading}>
                    <Select disabled={!this.props.is_edit} style={{ width: '100%' }} placement='topRight' mode="multiple"
                        onChange={(value) => this.props.handle_onchange_input(value, "tags", 'select')}
                        value={this.props.tags}
                        dropdownRender={(menu) => (
                            <div className='p-[5px]'>
                                {menu}
                                <Divider />
                                <Space>
                                    <Input.Search onChange={(event) => this.handle_onchange_input(event, "name", 'input')}
                                        onSearch={(value) => this.on_search(value)} placeholder="Tên tag !" />

                                    <Button onClick={() => this.handle_create()}
                                        className='bg-[#0e97ff] text-white' icon={<PlusOutlined />}></Button>
                                </Space>
                            </div>
                        )}
                        options={data_tags.map((item) => ({
                            label: item.name,
                            value: item.id,
                            disabled: !item.is_active,
                        }))}
                    />
                </Spin>
            </>
        );
    }

}
export default withRouter(select_tag);