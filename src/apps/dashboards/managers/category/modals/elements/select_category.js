import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select, message } from 'antd';
import { get_list_category } from '../../../../../../services/category_service';

class select_category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_categories: [],
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
        await this.get_list_category(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_category = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_category(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_categories: data.data.data.categories,
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
    on_select = (value) => {
        this.props.handle_onchange_input(value, "parent", 'select');
    }
    render() {
        let data_categories = this.state.data_categories;
        return (
            <div className='space-y-[3px]'>
                <div>
                    <Typography.Text italic strong>Quan hệ</Typography.Text>
                </div>
                <Select style={{ width: '100%' }} placement='topRight'
                    onSelect={(value) => this.on_select(value)}
                    value={this.props.category}
                    options={data_categories.map((item) => ({
                        label: item.name,
                        value: item.id,
                        disabled: !item.is_active,
                    }))}
                />
            </div>
        );
    }

}
export default withRouter(select_category);