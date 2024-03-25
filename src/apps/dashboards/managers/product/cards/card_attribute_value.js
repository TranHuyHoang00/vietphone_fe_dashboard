import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, message } from 'antd';
import { get_attribute_value_detail } from '../../../../../services/attribute_value_service';
import Table_attribute_value from '../components/displays/table_attribute_value';
import Select_attribute_value from '../components/selects/select_attribute_value';

class card_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_product: {},

            data_attribute_value_ids: [],
            data_attribute_value_raws: [],
            data_attribute_value_uniques: [],

            data_attributes: [],
            data_attribute_values: [],
            data_attribute_value: {},
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_attributes !== this.props.data_attributes) {
            let data_attributes = this.props.data_attributes
            if (data_attributes && data_attributes.length !== 0) {
                this.setState({ data_attribute_value_ids: data_attributes });
                await this.get_list_attribute_value(data_attributes);
                await this.handle_data(this.state.data_attribute_value_raws);
            }
        }
    }
    get_list_attribute_value = async (list_id) => {
        let data_attribute_value_raws = [];
        for (const id of list_id) {
            let data = await this.get_attribute_value_detail(id);
            data_attribute_value_raws.push(data);
        }
        this.setState({ data_attribute_value_raws: data_attribute_value_raws });
    }
    get_attribute_value_detail = async (id) => {
        try {
            let data = await get_attribute_value_detail(id);
            if (data && data.data && data.data.success == 1) {
                return data.data.data
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        }
    }
    handle_data = async (data) => {
        if (data.length !== 0) {
            let unique_ids = new Set();
            let unique_datas = [];
            data.forEach(obj => {
                if (obj && obj.attribute && obj.attribute.group_attribute && obj.attribute.group_attribute.id) {
                    if (!unique_ids.has(obj.attribute.group_attribute.id)) {
                        unique_ids.add(obj.attribute.group_attribute.id);
                        unique_datas.push(obj.attribute.group_attribute);
                    }
                }
            });
            this.setState({ data_attribute_value_uniques: unique_datas });
        }
    }
    handle_delete_atbvl = async (id) => {
        let data_raws = this.state.data_attribute_value_raws.filter(item => item.id !== id);
        let data_ids = this.state.data_attribute_value_ids.filter(item => item !== id);
        await this.handle_data(data_raws);
        this.props.handle_onchange_input(data_ids, 'attribute_values', 'select');
        this.setState({
            data_attribute_value_raws: data_raws,
            data_attribute_value_ids: data_ids
        });
    }
    check_exist = (data, value) => {

        for (const item of data) {
            if (item == value) {
                return true
            } else {
                return false
            }
        }
    }
    add_data = async (value) => {
        let data_attribute_value_ids = this.state.data_attribute_value_ids;
        let check_exist = this.check_exist(data_attribute_value_ids, value.id);
        console.log('check_exist', check_exist);
        if (check_exist == true) {
            message.error('Đã tồn tại thuộc tính này');
        } else {
            data_attribute_value_ids.push(value.id);
            await this.get_list_attribute_value(data_attribute_value_ids);
            await this.handle_data(this.state.data_attribute_value_raws);
            this.props.handle_onchange_input(data_attribute_value_ids, 'attribute_values', 'select');
        }

    }
    render() {
        let data_attribute_value_raws = this.state.data_attribute_value_raws;
        let data_attribute_value_uniques = this.state.data_attribute_value_uniques;
        let is_edit = this.props.is_edit;
        return (

            <>
                <Card title="Thông số kỹ thuật">
                    <div className='space-y-[10px] '>
                        <Select_attribute_value is_edit={is_edit} add_data={this.add_data}
                            type_handle={this.props.type_handle}
                            variant_attribute_group={this.props.variant_attribute_group} />

                        {data_attribute_value_uniques && data_attribute_value_uniques.map((item, index) => {
                            return (
                                <Table_attribute_value key={index}
                                    data_attribute_value_raws={data_attribute_value_raws} data_attribute_value_uniques={item}
                                    handle_delete_atbvl={this.handle_delete_atbvl}
                                    is_edit={this.props.is_edit} />
                            )
                        })}
                    </div>
                </Card>

            </>
        );
    }

}
export default withRouter(card_attribute_value);