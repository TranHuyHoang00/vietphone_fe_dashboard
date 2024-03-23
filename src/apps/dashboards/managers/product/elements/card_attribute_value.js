import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Button, message } from 'antd';
import { get_attribute_value_detail } from '../../../../../services/attribute_value_service';
import Table_attribute_value from '../components/table/table_attribute_value';
import Select_group_attribute from '../../../components/select/select_group_attribute';
import Select_attribute from '../../../components/select/select_attribute';
import Select_attribute_value from '../../../components/select/select_attribute_value';
class card_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_product: {},
            data_atbvl_ids: [],
            data_atbvl_raws: [],
            data_atbvl_uniques: [],

            data_attributes: [],
            data_attribute_values: [],
            data_attribute_value: {},
            id_attribute_value: ''
        }
    }
    async componentDidMount() {
        await this.get_list_attribute_value(this.state.data_atbvl_ids);
        await this.handle_data(this.state.data_atbvl_raws);
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.data_product !== this.props.data_product) {
            let attribute_values = this.props.data_product.attribute_values;

            await this.get_list_attribute_value(attribute_values);
            await this.handle_data(this.state.data_atbvl_raws);
        }
    }
    get_list_attribute_value = async (list_id) => {
        let data_atbvl_raws = [];
        for (const id of list_id) {
            let data = await this.get_attribute_value_detail(id);
            data_atbvl_raws.push(data);
        }
        this.setState({ data_atbvl_raws: data_atbvl_raws });
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
                if (!unique_ids.has(obj.attribute.group_attribute.id)) {
                    unique_ids.add(obj.attribute.group_attribute.id);
                    unique_datas.push(obj.attribute.group_attribute);
                }
            });
            this.setState({ data_atbvl_uniques: unique_datas });
        }
    }
    handle_delete_atbvl = async (id) => {
        let data_raws = this.state.data_atbvl_raws.filter(item => item.id !== id);
        let data_ids = this.state.data_atbvl_ids.filter(item => item !== id);
        await this.handle_data(data_raws);
        this.props.handle_onchange_input(data_ids, 'attribute_values', 'select');
        this.setState({
            data_atbvl_raws: data_raws,
            data_atbvl_ids: data_ids
        });
    }
    handle_get_data = (data, name) => {
        if (name == 'attribute') { this.setState({ data_attributes: data }); }
        if (name == 'attribute_value') { this.setState({ data_attribute_values: data }); }
        if (name == 'data') {
            this.setState({
                data_attribute_value: data,
                id_attribute_value: data.id
            })
        }
    }
    add_data = async () => {
        let data_atbvl_ids = this.state.data_atbvl_ids;
        let id_attribute_value = this.state.id_attribute_value;
        data_atbvl_ids.push(id_attribute_value);
        await this.get_list_attribute_value(data_atbvl_ids);
        await this.handle_data(this.state.data_atbvl_raws);
        this.props.handle_onchange_input(data_atbvl_ids, 'attribute_values', 'select');
    }
    render() {
        let data_atbvl_raws = this.state.data_atbvl_raws;
        let data_atbvl_uniques = this.state.data_atbvl_uniques;
        let is_edit = this.props.is_edit;

        return (
            <>
                <Card title="Thông số kỹ thuật">
                    <div className='space-y-[10px]'>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/2'>
                                <Select_group_attribute handle_get_data={this.handle_get_data} />
                            </div>
                            <div className='w-1/2'>
                                <Select_attribute handle_get_data={this.handle_get_data}
                                    data_attributes={this.state.data_attributes} />
                            </div>
                        </div>
                        <div className='flex items-end justify-between gap-[5px]'>
                            <div className='w-5/6'>
                                <Select_attribute_value handle_get_data={this.handle_get_data}
                                    data_attribute_values={this.state.data_attribute_values} />
                            </div>
                            <div className='w-1/6'>
                                <Button disabled={!is_edit} onClick={() => this.add_data()}>Thêm mới</Button>
                            </div>
                        </div>
                        {data_atbvl_uniques && data_atbvl_uniques.map((item, index) => {
                            return (
                                <Table_attribute_value key={index}
                                    data_atbvl_raws={data_atbvl_raws} data_atbvl_uniques={item}
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