import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Select, message } from 'antd';
import { get_list_category_type } from '../../../../../../services/category_type_service';

class select_category_type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_category_types: [],
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
        await this.get_list_category_type(this.state.data_filter);
    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_category_type = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_category_type(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({
                    data_category_types: data.data.data.categorie_types,
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
        this.props.handle_onchange_input(value, "category_type", 'select');
    }
    render() {
        let data_category_types = this.state.data_category_types;
        return (
            <div className='space-y-[3px]'>
                <div>
                    <Typography.Text italic strong>Loại danh mục</Typography.Text>
                </div>
                <Select style={{ width: '100%' }} placement='topRight'
                    onSelect={(value) => this.on_select(value)}
                    value={this.props.category_type}
                    options={data_category_types.map((item) => ({
                        label: item.name,
                        value: item.id,
                    }))}
                />
            </div>
        );
    }

}
export default withRouter(select_category_type);