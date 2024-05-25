import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Typography, Button, Card, message } from 'antd';
import FormSelectItem from '@components/selects/formSelectItem';
import { DeleteOutlined } from '@ant-design/icons';
class variant_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disable_atbvl: true,
            disabledButtonCreate: true,

            is_edit: '',
            data_atbvl_raws: [],
            data_atbvl_ids: [],
            data_atbvl_uniques: [],

            dataAttributes: [],
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.is_edit !== this.props.is_edit || prevProps.data_atbvl_raws !== this.props.data_atbvl_raws || prevProps.dataAttributes !== this.props.dataAttributes) {
            this.props.setDataAttribute({});
            this.props.setDataAttributeValue({});
            let dataAttributes = this.props.dataAttributes;
            let data_atbvl_raws = this.props.data_atbvl_raws;
            if (data_atbvl_raws && data_atbvl_raws.length !== 0) {
                this.handle_data_unique(this.props.data_atbvl_raws);
                this.handle_data_id(this.props.data_atbvl_raws);
                this.setState({
                    data_atbvl_raws: this.props.data_atbvl_raws,
                })
            }
            if (dataAttributes && dataAttributes.length !== 0) {
                this.setState({
                    dataAttributes: this.props.dataAttributes,
                })
            }
            this.setState({
                disable_atbvl: true,
                disabledButtonCreate: true,
            })
        }
    }
    onSearch = (value, nameFormSelect) => {

    }
    handleCreate = async (nameFormSelect) => {
        if (nameFormSelect === 'attribute_value') {
            if (!this.props.dataAttributeValue.value) { message.error('Thiếu giá trị'); return; }
            await this.props.createAttributeValue(this.props.dataAttributeValue);
            await this.props.getDataAttribute(this.props.dataAttributeValue.attribute);
        }
    }

    on_select = async (value, nameFormSelect) => {
        if (nameFormSelect === 'attribute') {
            await this.props.getDataAttribute(value);
            this.props.setDataAttributeValue({ attribute: this.props.dataAttribute.id });
            this.setState({
                disable_atbvl: false,
            })
        }
        if (nameFormSelect === 'attribute_value') {
            await this.props.getDataAttributeValue(value);
            this.setState({
                disabledButtonCreate: false,
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
        let dataAttributeValue = this.props.dataAttributeValue;
        let data_atbvl_ids = this.state.data_atbvl_ids;
        let data_atbvl_raws = this.state.data_atbvl_raws;
        if (data_atbvl_ids.includes(dataAttributeValue.id)) {
            message.error('Đã tồn tại giá trị này');
            return;
        }
        const index = data_atbvl_raws.findIndex(item => item.attribute.id === dataAttributeValue.attribute.id);
        if (index !== -1) {
            message.error('Đã tồn tại thông số này');
            return;
        }
        data_atbvl_ids.push(dataAttributeValue.id);
        data_atbvl_raws.push(dataAttributeValue);
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
        let dataAttribute = this.props.dataAttribute;
        let dataAttributeValue = this.props.dataAttributeValue;
        let data_atbvl_uniques = this.state.data_atbvl_uniques;
        let data_atbvl_raws = this.state.data_atbvl_raws;
        let dataAttributes = this.state.dataAttributes;
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
                                        nameFormSelect={'attribute'}
                                        options={dataAttributes.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                        value={dataAttribute.id}
                                        disabledSelect={!this.props.is_edit}
                                        disabledButtonCreate={true}
                                        disabledSearch={true}
                                        onSearch={this.onSearch}
                                        variableSelect={'attribute'}
                                        onChangeSelect={this.on_select}
                                        variableInputSearch={'name'}
                                        onChangeInput={this.props.onChangeAttribute}
                                        handleCreate={this.handleCreate}
                                    />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='space-y-[3px]'>
                                    <Typography.Text italic strong>Giá trị</Typography.Text>
                                    <FormSelectItem width={'100%'}
                                        placeholder={'Giá trị'}
                                        nameFormSelect={'attribute_value'}
                                        options={dataAttribute && dataAttribute.attribute_values && dataAttribute.attribute_values.map((item) => ({
                                            label: item.value,
                                            value: item.id,
                                        }))}
                                        value={dataAttributeValue.id}
                                        disabledSelect={this.state.disable_atbvl}
                                        onSearch={this.onSearch}
                                        variableSelect={'attribute_value'}
                                        onChangeSelect={this.on_select}
                                        variableInputSearch={'value'}
                                        onChangeInput={this.props.onChangeAttributeValue}
                                        handleCreate={this.handleCreate}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-end gap-[5px]'>
                            <div className='w-1/4'>
                                <Button className='w-full bg-[#0e97ff] text-white'
                                    onClick={() => this.handle_add_atbvl()}
                                    disabled={this.state.disabledButtonCreate}>Thêm </Button>
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

        dataAttribute: state.attribute.dataAttribute,

        dataAttributeValue: state.attribute_value.dataAttributeValue,

    };
};
const mapDispatchToProps = dispatch => {
    return {

        getDataAttribute: (id) => dispatch(actions.getDataAttributeRedux(id)),
        setDataAttribute: (data) => dispatch(actions.setDataAttributeRedux(data)),

        getDataAttributeValue: (id) => dispatch(actions.getDataAttributeValueRedux(id)),
        createAttributeValue: (data) => dispatch(actions.createAttributeValueRedux(data)),
        onChangeAttributeValue: (id, value) => dispatch(actions.onChangeAttributeValueRedux(id, value)),
        setDataAttributeValue: (data) => dispatch(actions.setDataAttributeValueRedux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_attribute_value));
