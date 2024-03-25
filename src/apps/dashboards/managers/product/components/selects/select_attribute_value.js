import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { message, Button } from 'antd';
import Form_select_data from '../../../../components/selects/form_select_data';

import { get_list_group_attribute, create_group_attribute, get_group_attribute } from '../../../../../../services/group_attribute_service';
import { get_variant_attribute_group } from '../../../../../../services/variant_attribute_group_service';
import { create_attribute, get_attribute } from '../../../../../../services/attribute_service';
import { create_attribute_value, get_attribute_value } from '../../../../../../services/attribute_value_service';
class select_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_filter: { page: 1, limit: 100, search_query: '' },

            data_group_attributes: [],
            data_group_attribute: { is_active: true },

            data_attributes: [],
            data_attribute: { is_active: true },

            data_attribute_values: [],
            data_attribute_value: {},

            data_variant_attribute_group: {},

            disabled_group_attribute: true,
            disabled_attribute: true,
            disabled_attribute_value: true,
            disabled_button: true,
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps) {
        if (prevProps.is_edit !== this.props.is_edit) {
            if (this.props.type_handle == 'product') {
                await this.get_list_group_attribute(this.state.data_filter);
            }
            if (this.props.type_handle == 'variant') {
                if (this.props.variant_attribute_group !== null) {
                    await this.get_variant_attribute_group(this.props.variant_attribute_group)
                }
            }
            this.setState({
                disabled_group_attribute: !this.props.is_edit,
                disabled_attribute: true,
                disabled_attribute_value: true,
                disabled_button: true,
            })
        }
    }
    handle_onchange_input = (event, id, type, name) => {
        let copyState;
        if (name == 'group_attribute') { copyState = { ...this.state.data_group_attribute }; }
        if (name == 'attribute') { copyState = { ...this.state.data_attribute }; }
        if (name == 'attribute_value') { copyState = { ...this.state.data_attribute_value }; }
        if (type == 'input') { copyState[id] = event.target.value; }

        if (type == 'select') { copyState[id] = event; }

        if (name == 'group_attribute') { this.setState({ data_group_attribute: { ...copyState } }); }
        if (name == 'attribute') { this.setState({ data_attribute: { ...copyState } }); }
        if (name == 'attribute_value') { this.setState({ data_attribute_value: { ...copyState } }); }

    }
    handle_loading = (value) => {
        this.setState({ is_loading: value });
    }
    get_list_group_attribute = async (data_filter) => {
        this.handle_loading(true);
        try {
            let data = await get_list_group_attribute(data_filter);
            if (data && data.data && data.data.success == 1) {
                this.setState({ data_group_attributes: data.data.data.group_attributes });
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }
    }
    get_data_api = async (id, name) => {
        this.handle_loading(true);
        try {
            let data = {};
            if (name == 'group_attribute') {
                if (this.props.type_handle == 'variant') {
                    data = await get_variant_attribute_group(id);
                }
                if (this.props.type_handle == 'product') {
                    data = await get_group_attribute(id);
                }
            }
            if (name == 'attribute') { data = await get_attribute(id); }
            if (name == 'attribute_value') { data = await get_attribute_value(id); }

            if (data && data.data && data.data.success == 1) {
                let data_raw = data.data.data;
                if (name == 'group_attribute') {
                    if (this.props.type_handle == 'variant') {
                        this.setState({
                            data_group_attribute: data_raw,
                            data_attributes: data_raw.attribute,
                            data_attribute: { group_attribute: data_raw.id },
                            disabled_attribute: false,
                        });
                    }
                    if (this.props.type_handle == 'product') {
                        this.setState({
                            data_group_attribute: data_raw,
                            data_attributes: data_raw.attributes,
                            data_attribute: { group_attribute: data_raw.id },
                            disabled_attribute: false,
                        });
                    }

                }
                if (name == 'attribute') {
                    this.setState({
                        data_attribute: data_raw,
                        data_attribute_values: data_raw.attribute_values,
                        data_attribute_value: { attribute: data_raw.id },
                        disabled_attribute_value: false,
                    });
                }
                if (name == 'attribute_value') {
                    this.setState({
                        data_attribute_value: data_raw,
                        disabled_button: false
                    });
                }
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống");
        } finally {
            this.handle_loading(false);
        }

    }
    on_search_data_api = async (value, name) => {
        let data_filter = this.state.data_filter;
        data_filter.search_query = value;
        data_filter.page = 1;
        if (name == 'group_attribute') { await this.get_list_group_attribute(data_filter); }
    }
    validation = (data, name) => {
        this.handle_loading(true);
        if (name == 'group_attribute') {
            if (!data.name) {
                return { mess: "Không được bỏ trống 'Tên loại thông số' ", code: 1 };
            }
        }
        if (name == 'attribute') {
            if (!data.name) {
                return { mess: "Không được bỏ trống 'Tên thông số' ", code: 1 };
            }
        }
        if (name == 'attribute_value') {
            if (!data.value) {
                return { mess: "Không được bỏ trống 'Giá trị' ", code: 1 };
            }
        }
        return { code: 0 };
    }
    handle_create = async (name) => {
        let data_create;
        if (name == 'group_attribute') { data_create = this.state.data_group_attribute }
        if (name == 'attribute') { data_create = this.state.data_attribute }
        if (name == 'attribute_value') { data_create = this.state.data_attribute_value }
        let result = this.validation(data_create, name);
        if (result.code == 0) {
            try {
                let data;
                if (name == 'group_attribute') { data = await create_group_attribute(data_create); }
                if (name == 'attribute') { data = await create_attribute(data_create); }
                if (name == 'attribute_value') { data = await create_attribute_value(data_create); }
                if (data && data.data && data.data.success == 1) {
                    if (name == 'group_attribute') {
                        await this.get_list_group_attribute(this.state.data_filter);
                        this.setState({ data_group_attribute: { is_active: true } });
                    }
                    if (name == 'attribute') {
                        await this.get_data_api(this.state.data_group_attribute.id, 'group_attribute');
                    }
                    if (name == 'attribute_value') {
                        await this.get_data_api(this.state.data_attribute.id, 'attribute');
                    }
                    message.success("Thành công");
                } else {
                    message.error('Thất bại 1');
                }
            } catch (e) {
                message.error('Lỗi hệ thống');
            }
        } else {
            message.error(result.mess);
        }
        this.handle_loading(false);
    }
    get_variant_attribute_group = async (id) => {
        try {
            let data = await get_variant_attribute_group(id);
            if (data && data.data && data.data.success == 1) {
                let x = data.data.data;
                let y = [];
                y.push(x);
                this.setState({
                    data_variant_attribute_group: x,
                    data_group_attributes: y,
                })
            } else {
                message.error("Lỗi");
            }
        } catch (e) {
            message.error("Lỗi hệ thống ");
        }
    }
    render() {
        return (
            <>
                <div className='flex items-center gap-[5px]'>
                    <div className='w-1/2'>
                        <Form_select_data disabled={this.state.disabled_group_attribute} name={'Loại thông số'}
                            width={'100%'} name_funtion={'group_attribute'} type={'input'} variable={'name'}
                            get_data_api={this.get_data_api} value={this.state.data_group_attribute.id}
                            on_search_data_api={this.on_search_data_api}
                            handle_onchange_input={this.handle_onchange_input}
                            handle_create={this.handle_create}
                            options={this.state.data_group_attributes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            disabled_search={this.props.type_handle == 'variant' ? true : false}
                            disabled_create={this.props.type_handle == 'variant' ? true : false}
                        />
                    </div>
                    <div className='w-1/2'>
                        <Form_select_data disabled={this.state.disabled_attribute} name={'Thông số'}
                            width={'100%'} name_funtion={'attribute'} type={'input'} variable={'name'}
                            get_data_api={this.get_data_api} value={this.state.data_attribute.id}
                            on_search_data_api={this.on_search_data_api}
                            handle_onchange_input={this.handle_onchange_input}
                            handle_create={this.handle_create}
                            options={this.state.data_attributes.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            disabled_search={this.props.type_handle == 'variant' ? true : false}
                            disabled_create={this.props.type_handle == 'variant' ? true : false}
                        />
                    </div>
                </div>
                <div className='flex flex-wrap items-end justify-between gap-[5px]'>
                    <div className='w-5/6'>
                        <Form_select_data disabled={this.state.disabled_attribute_value} name={'Giá trị'}
                            width={'100%'} name_funtion={'attribute_value'} type={'input'} variable={'value'}
                            get_data_api={this.get_data_api} value={this.state.data_attribute_value.id}
                            on_search_data_api={this.on_search_data_api}
                            handle_onchange_input={this.handle_onchange_input}
                            handle_create={this.handle_create}
                            options={this.state.data_attribute_values.map((item) => ({
                                label: item.value,
                                value: item.id,
                            }))}
                        />
                    </div>
                    <div className='w-1/6'>
                        <Button onClick={() => this.props.add_data(this.state.data_attribute_value)}
                            disabled={this.state.disabled_button}>Thêm vào</Button>
                    </div>
                </div>
            </>
        );
    }

}
export default withRouter(select_attribute_value);