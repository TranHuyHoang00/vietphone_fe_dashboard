import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions';
import { Collapse, Typography, Button, Card, message } from 'antd';
import FormSelectItem from '../../../../../components/selects/form_select_item';
import { DeleteOutlined } from '@ant-design/icons';
class variant_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable_atbvl: true,
            disabled_button: true,

            is_edit: '',
            data_atbvl_raws: [],
            data_atbvl_ids: [],
            data_atbvl_uniques: [],

            data_attributes: [],
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.is_edit !== this.props.is_edit || prevProps.data_atbvl_raws !== this.props.data_atbvl_raws || prevProps.data_attributes !== this.props.data_attributes) {
            this.props.set_data_attribute({});
            this.props.set_data_attribute_value({});
            let data_attributes = this.props.data_attributes;
            let data_atbvl_raws = this.props.data_atbvl_raws;
            if (data_atbvl_raws && data_atbvl_raws.length !== 0) {
                this.handle_data_unique(this.props.data_atbvl_raws);
                this.handle_data_id(this.props.data_atbvl_raws);
                this.setState({
                    data_atbvl_raws: this.props.data_atbvl_raws,
                })
            }
            if (data_attributes && data_attributes.length !== 0) {
                this.setState({
                    data_attributes: this.props.data_attributes,
                })
            }
            this.setState({
                disable_atbvl: true,
                disabled_button: true,
            })
        }
    }
    on_search = (value, form_name) => {

    }
    handle_create = async (form_name) => {
        if (form_name === 'attribute_value') {
            if (!this.props.data_attribute_value.value) { message.error('Thiếu giá trị'); return; }
            await this.props.create_attribute_value(this.props.data_attribute_value);
            await this.props.get_attribute(this.props.data_attribute_value.attribute);
        }
    }

    on_select = async (value, form_name) => {
        if (form_name === 'attribute') {
            await this.props.get_attribute(value);
            this.props.set_data_attribute_value({ attribute: this.props.data_attribute.id });
            this.setState({
                disable_atbvl: false,
            })
        }
        if (form_name === 'attribute_value') {
            await this.props.get_attribute_value(value);
            this.setState({
                disabled_button: false,
            })
        }
    }
    handle_data_unique = async (data) => {
        if (data && data.length !== 0) {
            let unique_ids = new Set();
            let unique_datas = [];
            for (const obj of data) {
                if (obj && obj.attribute && obj.attribute.group_attribute && obj.attribute.group_attribute.id) {
                    if (!unique_ids.has(obj.attribute.group_attribute.id)) {
                        unique_ids.add(obj.attribute.group_attribute.id);
                        unique_datas.push(obj.attribute.group_attribute);
                    }
                }
            }
            this.setState({ data_atbvl_uniques: unique_datas });
        }
    }
    handle_data_id = (data) => {
        let data_atbvl_ids = [];
        if (data && data.length !== 0) {
            for (const item of data) {
                data_atbvl_ids.push(item.id);
            }
        }
        this.setState({
            data_atbvl_ids: data_atbvl_ids,
        })
    }
    handle_add_atbvl = async () => {
        let data_attribute_value = this.props.data_attribute_value;
        let data_atbvl_ids = this.state.data_atbvl_ids;
        let data_atbvl_raws = this.state.data_atbvl_raws;
        if (data_atbvl_ids.includes(data_attribute_value.id)) {
            message.error('Đã tồn tại giá trị này');
            return;
        }
        const index = data_atbvl_raws.findIndex(item => item.attribute.id === data_attribute_value.attribute.id);
        if (index !== -1) {
            message.error('Đã tồn tại thông số này');
            return;
        }
        data_atbvl_ids.push(data_attribute_value.id);
        data_atbvl_raws.push(data_attribute_value);
        await this.handle_data_unique(data_atbvl_raws);
        this.props.get_data_atbvl(data_atbvl_ids);
        this.setState({
            data_atbvl_ids: data_atbvl_ids,
            data_atbvl_raws: data_atbvl_raws,
        })



    }
    handle_delete_atbvl = async (id) => {
        let data_atbvl_raws = this.state.data_atbvl_raws.filter(item => item.id !== id);
        let data_atbvl_ids = this.state.data_atbvl_ids.filter(item => item !== id);
        await this.handle_data_unique(data_atbvl_raws);
        this.props.get_data_atbvl(data_atbvl_ids);
        this.setState({
            data_atbvl_ids: data_atbvl_ids,
            data_atbvl_raws: data_atbvl_raws,
        });
    }
    render() {
        let data_attribute = this.props.data_attribute;
        let data_attribute_value = this.props.data_attribute_value;
        let data_atbvl_uniques = this.state.data_atbvl_uniques;
        let data_atbvl_raws = this.state.data_atbvl_raws;
        let data_attributes = this.state.data_attributes;
        return (
            <Collapse defaultActiveKey={[1]}>
                <Collapse.Panel header="Thông số kĩ thuật" key="1">
                    <div className='space-y-[10px]'>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/2'>
                                <div className='space-y-[3px]'>
                                    <Typography.Text italic strong>Thông số</Typography.Text>
                                    <FormSelectItem width={'100%'}
                                        placeholder={'Thông số'}
                                        form_name={'attribute'}
                                        options={data_attributes.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                        value={data_attribute.id}
                                        disabled_select={!this.props.is_edit}
                                        disabled_button={true}
                                        disabled_search={true}
                                        on_search={this.on_search}
                                        variable_select={'attribute'}
                                        on_change_select={this.on_select}
                                        variable_input={'name'}
                                        on_change_input={this.props.on_change_attribute}
                                        handle_create={this.handle_create}
                                    />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='space-y-[3px]'>
                                    <Typography.Text italic strong>Giá trị</Typography.Text>
                                    <FormSelectItem width={'100%'}
                                        placeholder={'Giá trị'}
                                        form_name={'attribute_value'}
                                        options={data_attribute && data_attribute.attribute_values && data_attribute.attribute_values.map((item) => ({
                                            label: item.value,
                                            value: item.id,
                                        }))}
                                        value={data_attribute_value.id}
                                        disabled_select={this.state.disable_atbvl}
                                        on_search={this.on_search}
                                        variable_select={'attribute_value'}
                                        on_change_select={this.on_select}
                                        variable_input={'value'}
                                        on_change_input={this.props.on_change_attribute_value}
                                        handle_create={this.handle_create}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-end gap-[5px]'>
                            <div className='w-1/4'>
                                <Button className='w-full bg-[#0e97ff] text-white'
                                    onClick={() => this.handle_add_atbvl()}
                                    disabled={this.state.disabled_button}>Thêm </Button>
                            </div>
                        </div>

                        <div className='overflow-y-auto max-h-[500px]'>
                            {data_atbvl_uniques && data_atbvl_uniques.map((item, index) => {
                                return (
                                    <Card key={item.id} title={`${item.name}`} size='small'>
                                        <div className='space-y-[5px]'>
                                            {data_atbvl_raws && data_atbvl_raws.map((data, index) => {
                                                return (
                                                    <div key={index}>
                                                        {(data && data.attribute && data.attribute.group_attribute && data.attribute.group_attribute.id === item.id) &&
                                                            <div className='flex gap-[5px]'>
                                                                <div className='w-1/3 flex justify-between space-x-[5px]'>
                                                                    <Typography.Text type="secondary">{data.attribute && data.attribute.name}</Typography.Text>
                                                                    <span>:</span>
                                                                </div>
                                                                <div className='w-2/3 flex items-center justify-between'>
                                                                    <div className='flex-grow'>
                                                                        <Typography.Text class="break-word">{data.value}</Typography.Text>
                                                                    </div>
                                                                    <div className='min-w-0 flex-shrink-0'>
                                                                        <Button disabled={!this.props.is_edit}
                                                                            onClick={() => this.handle_delete_atbvl(data.id)}
                                                                            className='bg-[#e94138] text-white' size='small'
                                                                            icon={<DeleteOutlined />}>
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        data_product: state.product.data_product,
        is_edit: state.variant.is_edit,

        data_attribute: state.attribute.data_attribute,

        data_attribute_value: state.attribute_value.data_attribute_value,

    };
};
const mapDispatchToProps = dispatch => {
    return {

        get_attribute: (id) => dispatch(actions.get_attribute_redux(id)),
        set_data_attribute: (data) => dispatch(actions.set_data_attribute_redux(data)),

        get_attribute_value: (id) => dispatch(actions.get_attribute_value_redux(id)),
        create_attribute_value: (data) => dispatch(actions.create_attribute_value_redux(data)),
        on_change_attribute_value: (id, value) => dispatch(actions.on_change_attribute_value_redux(id, value)),
        set_data_attribute_value: (data) => dispatch(actions.set_data_attribute_value_redux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_attribute_value));
