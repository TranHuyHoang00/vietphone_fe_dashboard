import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Typography, Button, Card, message } from 'antd';
import FormSelectMultiple from '@components/selects/formSelectMultiple';
import { DeleteOutlined } from '@ant-design/icons';
class product_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFilter: { page: 1, limit: 100, search: '' },
            disableAtb: true,
            disableAtbvl: true,
            disabledButtonCreate: true,
            isEdit: '',
            dataProduct: {},
            dataAtbvlUniques: [],
        }
    }
    async componentDidMount() {
        const { getListGroupAttribute } = this.props;
        const { dataFilter } = this.state;
        getListGroupAttribute(dataFilter);
    }
    async componentDidUpdate(prevProps) {
        const { isEdit, dataProduct, setDataGroupAttribute, setDataAttribute, setDataAttributeValue } = this.props;
        if (prevProps.isEdit !== isEdit || prevProps.dataProduct !== dataProduct) {
            const dataAtbvl = dataProduct.attribute_values;
            await this.handleDataAtbvlUnique(dataAtbvl);
            setDataGroupAttribute({});
            setDataAttribute({});
            setDataAttributeValue({});
            this.setState({
                disableAtb: true,
                disableAtbvl: true,
                disabledButtonCreate: true,
            })
        }
    }
    handleDataAtbvlUnique = async (data) => {
        if (data && data.length !== 0) {
            let uniqueId = new Set();
            let uniqueDatas = [];
            for (const obj of data) {
                if (obj && obj.attribute && obj.attribute.group_attribute && obj.attribute.group_attribute.id) {
                    if (!uniqueId.has(obj.attribute.group_attribute.id)) {
                        uniqueId.add(obj.attribute.group_attribute.id);
                        uniqueDatas.push(obj.attribute.group_attribute);
                    }
                }
            }
            this.setState({ dataAtbvlUniques: uniqueDatas });
        }
    }
    onSearch = (valueSearch, nameFormSelect) => {
        const { dataFilter } = this.state;
        const { getListGroupAttribute } = this.props;
        let newDataFilter = {
            ...dataFilter,
            search: valueSearch,
        }
        switch (nameFormSelect) {
            case 'group_attribute':
                getListGroupAttribute(newDataFilter)
                break;
            default:
                break;
        }
    }
    handleCreate = async (nameFormSelect) => {
        const { dataGroupAttribute, dataAttribute, dataAttributeValue,
            createGroupAttribute, getListGroupAttribute, createAttribute, getDataGroupAttribute,
            createAttributeValue, getDataAttribute,
        } = this.props;
        const { dataFilter } = this.state;
        switch (nameFormSelect) {
            case 'group_attribute':
                if (!dataGroupAttribute.name) { message.error('Thiếu tên loại thông số'); return; }
                await createGroupAttribute(dataGroupAttribute);
                await getListGroupAttribute(dataFilter);
                break;
            case 'attribute':
                if (!dataAttribute.name) { message.error('Thiếu tên thông số'); return; }
                await createAttribute(dataAttribute);
                await getDataGroupAttribute(dataAttribute.group_attribute);
                break;
            case 'attribute_value':
                if (!dataAttributeValue.value) { message.error('Thiếu giá trị'); return; }
                await createAttributeValue(dataAttributeValue);
                await getDataAttribute(dataAttributeValue.attribute);
                break;
            default:
                break;
        }
    }
    onSelect = async (value, nameFormSelect) => {
        switch (nameFormSelect) {
            case 'group_attribute':
                await this.props.getDataGroupAttribute(value);
                this.props.setDataAttribute({ group_attribute: this.props.dataGroupAttribute.id });
                this.props.setDataAttributeValue({});
                this.setState({
                    disableAtb: false,
                    disableAtbvl: true,
                    disabledButtonCreate: true,
                })
                break;
            case 'attribute':
                await this.props.getDataAttribute(value);
                this.props.setDataAttributeValue({ attribute: this.props.dataAttribute.id });
                this.setState({
                    disableAtbvl: false,
                })
                break
            case 'attribute_value':
                await this.props.getDataAttributeValue(value);
                this.setState({
                    disabledButtonCreate: false,
                })
                break
            default:
                break;
        }
    }
    handleAddAtbvl = async () => {
        const { dataAttributeValue, dataProduct, setDataProduct } = this.props;
        let newDataAtbvls = dataProduct.attribute_values;
        newDataAtbvls.push(dataAttributeValue);
        let newDataProduct = {
            ...dataProduct,
            attribute_values: newDataAtbvls,
        };
        setDataProduct(newDataProduct);
        await this.handleDataAtbvlUnique(newDataAtbvls);
    }
    handleDeleteAtbvl = async (id) => {
        const { dataProduct, setDataProduct } = this.props;
        let newDataAtbvls = (dataProduct.attribute_values).filter(item => item.id !== id);
        let newDataProduct = {
            ...dataProduct,
            attribute_values: newDataAtbvls,
        };
        setDataProduct(newDataProduct);
        await this.handleDataAtbvlUnique(newDataAtbvls);
    }
    render() {
        const { dataAtbvlUniques, disableAtb, disableAtbvl } = this.state;
        const { dataProduct, isEdit, dataGroupAttributes, dataGroupAttribute, dataAttribute, dataAttributeValue,
            onChangeGroupAttribute, onChangeAttribute, onChangeAttributeValue
        } = this.props;
        return (
            <Collapse defaultActiveKey={[1]}>
                <Collapse.Panel header="Thông số kĩ thuật" key="1">
                    <div className='space-y-[10px]'>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/2'>
                                <div className='space-y-[3px]'>
                                    <Typography.Text italic strong>Loại thông số</Typography.Text>
                                    <FormSelectMultiple width={'100%'}
                                        placeholder={'Loại thông số'}
                                        nameFormSelect={'group_attribute'}
                                        options={dataGroupAttributes.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                        value={dataGroupAttribute.id}
                                        disabledSelect={!isEdit}
                                        onSearch={this.onSearch}
                                        variableSelect={'group_attribute'}
                                        onChangeSelect={this.onSelect}
                                        variableInputSearch={'name'}
                                        onChangeInput={onChangeGroupAttribute}
                                        handleCreate={this.handleCreate}
                                    />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='space-y-[3px]'>
                                    <Typography.Text italic strong>Thông số</Typography.Text>
                                    <FormSelectMultiple width={'100%'}
                                        placeholder={'Thông số'}
                                        nameFormSelect={'attribute'}
                                        options={dataGroupAttribute.attributes && dataGroupAttribute.attributes.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                        value={dataAttribute.id}
                                        disabledSelect={disableAtb}
                                        onSearch={this.onSearch}
                                        variableSelect={'attribute'}
                                        onChangeSelect={this.onSelect}
                                        variableInputSearch={'name'}
                                        onChangeInput={onChangeAttribute}
                                        handleCreate={this.handleCreate}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-end gap-[5px]'>
                            <div className='w-3/4'>
                                <div className='space-y-[3px]'>
                                    <Typography.Text italic strong>Giá trị</Typography.Text>
                                    <FormSelectMultiple width={'100%'}
                                        placeholder={'Giá trị'}
                                        nameFormSelect={'attribute_value'}
                                        options={dataAttribute.attribute_values && dataAttribute.attribute_values.map((item) => ({
                                            label: item.value,
                                            value: item.id,
                                        }))}
                                        value={dataAttributeValue.id}
                                        disabledSelect={disableAtbvl}
                                        onSearch={this.onSearch}
                                        variableSelect={'attribute_value'}
                                        onChangeSelect={this.onSelect}
                                        variableInputSearch={'value'}
                                        onChangeInput={onChangeAttributeValue}
                                        handleCreate={this.handleCreate}
                                    />
                                </div>
                            </div>
                            <div className='w-1/4'>
                                <Button className='w-full bg-[#0e97ff] text-white'
                                    onClick={() => this.handleAddAtbvl()}
                                    disabled={this.state.disabledButtonCreate}>Thêm </Button>
                            </div>
                        </div>
                        <div className='overflow-y-auto max-h-[500px]'>
                            {dataAtbvlUniques && dataAtbvlUniques.map((item) => {
                                return (
                                    <Card key={item.id} title={`${item.name}`} size='small'>
                                        <div className='space-y-[5px]'>
                                            {dataProduct && dataProduct.attribute_values && dataProduct.attribute_values.map((data, index) => {
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
                                                                        <Button disabled={!isEdit}
                                                                            onClick={() => this.handleDeleteAtbvl(data.id)}
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
        dataProduct: state.product.dataProduct,
        isEdit: state.product.isEdit,

        dataGroupAttributes: state.group_attribute.dataGroupAttributes,
        dataGroupAttribute: state.group_attribute.dataGroupAttribute,
        isResultGroupAtb: state.group_attribute.isResult,

        dataAttribute: state.attribute.dataAttribute,

        dataAttributeValue: state.attribute_value.dataAttributeValue,

    };
};
const mapDispatchToProps = dispatch => {
    return {
        setDataProduct: (id) => dispatch(actions.setDataProductRedux(id)),

        getListGroupAttribute: (dataFilter) => dispatch(actions.getListGroupAttributeRedux(dataFilter)),
        createGroupAttribute: (data) => dispatch(actions.createGroupAttributeRedux(data)),
        onChangeGroupAttribute: (id, value) => dispatch(actions.onChangeGroupAttributeRedux(id, value)),
        getDataGroupAttribute: (id) => dispatch(actions.getDataGroupAttributeRedux(id)),
        setDataGroupAttribute: (data) => dispatch(actions.setDataGroupAttributeRedux(data)),

        getDataAttribute: (id) => dispatch(actions.getDataAttributeRedux(id)),
        createAttribute: (data) => dispatch(actions.createAttributeRedux(data)),
        onChangeAttribute: (id, value) => dispatch(actions.onChangeAttributeRedux(id, value)),
        setDataAttribute: (data) => dispatch(actions.setDataAttributeRedux(data)),

        getDataAttributeValue: (id) => dispatch(actions.getDataAttributeValueRedux(id)),
        createAttributeValue: (data) => dispatch(actions.createAttributeValueRedux(data)),
        onChangeAttributeValue: (id, value) => dispatch(actions.onChangeAttributeValueRedux(id, value)),
        setDataAttributeValue: (data) => dispatch(actions.setDataAttributeValueRedux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(product_attribute_value));
