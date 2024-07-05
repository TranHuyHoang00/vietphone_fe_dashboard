import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Typography, Button, Card, message } from 'antd';
import FormSelectMultiple from '@components/selects/formSelectMultiple';
import { DeleteOutlined } from '@ant-design/icons';
class variant_attribute_value extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disableAtbvl: true,
            disabledButtonCreate: true,
            isEdit: '',
            dataAtbvlUniques: [],
            dataVariant: {},
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
        const { isEdit, dataAttributes, dataVariant, setDataAttribute, setDataAttributeValue } = this.props;
        if (prevProps.isEdit !== isEdit || prevProps.dataAttributes !== dataAttributes || prevProps.dataVariant !== dataVariant) {
            const dataAtbvl = dataVariant.attribute_values;
            await this.handleDataAtbvlUnique(dataAtbvl);
            setDataAttribute({});
            setDataAttributeValue({});
            this.setState({
                disableAtbvl: true,
                disabledButtonCreate: true,
            })
        }
    }
    onSearch = () => {
    }
    handleCreate = async (nameFormSelect) => {
        const { dataAttributeValue, createAttributeValue, getDataAttribute } = this.props;
        switch (nameFormSelect) {
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
            case 'attribute':
                await this.props.getDataAttribute(value);
                this.props.setDataAttributeValue({ attribute: this.props.dataAttribute.id });
                this.setState({
                    disableAtbvl: false,
                })
                break;
            case 'attribute_value':
                await this.props.getDataAttributeValue(value);
                this.setState({
                    disabledButtonCreate: false,
                })
                break;
            default:
                break;
        }
    }
    handleDataAtbvlUnique = async (data) => {
        let uniqueDatas = [];
        if (data && data.length !== 0) {
            let uniqueId = new Set();
            for (const obj of data) {
                if (obj && obj.attribute && obj.attribute.group_attribute && obj.attribute.group_attribute.id) {
                    if (!uniqueId.has(obj.attribute.group_attribute.id)) {
                        uniqueId.add(obj.attribute.group_attribute.id);
                        uniqueDatas.push(obj.attribute.group_attribute);
                    }
                }
            }
        }
        this.setState({ dataAtbvlUniques: uniqueDatas });

    }
    handleAddAtbvl = async () => {
        const { dataAttributeValue, dataVariant, setDataVariant } = this.props;
        let newDataAtbvls = dataVariant.attribute_values;
        const foundObject = newDataAtbvls.find(obj => obj?.attribute?.id === dataAttributeValue?.attribute?.id);
        if (foundObject) {
            message.error('Đã tồn tại thông số này');
            return;
        } else {
            newDataAtbvls.push(dataAttributeValue);
            let newDataVariant = {
                ...dataVariant,
                attribute_values: newDataAtbvls,
            };
            setDataVariant(newDataVariant);
            await this.handleDataAtbvlUnique(newDataAtbvls);
        }

    }
    handleDeleteAtbvl = async (id) => {
        const { dataVariant, setDataVariant } = this.props;
        let newDataAtbvls = (dataVariant.attribute_values).filter(item => item.id !== id);
        let newDataVariant = {
            ...dataVariant,
            attribute_values: newDataAtbvls,
        };
        setDataVariant(newDataVariant);
        await this.handleDataAtbvlUnique(newDataAtbvls);
    }
    render() {
        const { isEdit, dataVariant, dataAttributes, onChangeAttribute, onChangeAttributeValue, dataAttribute, dataAttributeValue } = this.props;
        const { dataAtbvlUniques, disabledButtonCreate, disableAtbvl } = this.state;
        return (
            <Collapse defaultActiveKey={[1]}>
                <Collapse.Panel header="Thông số kĩ thuật" key="1">
                    <div className='space-y-[10px]'>
                        <div className='flex items-center gap-[5px]'>
                            <div className='w-1/2'>
                                <div className='space-y-[3px]'>
                                    <Typography.Text italic strong>Thông số</Typography.Text>
                                    <FormSelectMultiple width={'100%'}
                                        placeholder={'Thông số'}
                                        nameFormSelect={'attribute'}
                                        options={dataAttributes && dataAttributes.map((item) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                        value={dataAttribute.id}
                                        disabledSelect={!isEdit}
                                        disabledButtonCreate={true}
                                        disabledSearch={true}
                                        onSearch={this.onSearch}
                                        variableSelect={'attribute'}
                                        onChangeSelect={this.onSelect}
                                        variableInputSearch={'name'}
                                        onChangeInput={onChangeAttribute}
                                        handleCreate={this.handleCreate}
                                    />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <div className='space-y-[3px]'>
                                    <Typography.Text italic strong>Giá trị</Typography.Text>
                                    <FormSelectMultiple width={'100%'}
                                        placeholder={'Giá trị'}
                                        nameFormSelect={'attribute_value'}
                                        options={dataAttribute && dataAttribute.attribute_values && dataAttribute.attribute_values.map((item) => ({
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
                        </div>
                        <div className='flex items-end gap-[5px]'>
                            <div className='w-1/4'>
                                <Button className='w-full bg-[#0e97ff] text-white'
                                    onClick={() => this.handleAddAtbvl()}
                                    disabled={disabledButtonCreate}>Thêm </Button>
                            </div>
                        </div>

                        <div className='overflow-y-auto max-h-[500px]'>
                            {dataAtbvlUniques && dataAtbvlUniques.map((item, index) => {
                                return (
                                    <Card key={item.id} title={`${item.name}`} size='small'>
                                        <div className='space-y-[5px]'>
                                            {dataVariant && dataVariant.attribute_values && dataVariant.attribute_values.map((data, index) => {
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
        isEdit: state.variant.isEdit,

        dataAttribute: state.attribute.dataAttribute,

        dataAttributeValue: state.attributeValue.dataAttributeValue,
        dataVariant: state.variant.dataVariant,
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

        setDataVariant: (data) => dispatch(actions.setDataVariantRedux(data)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_attribute_value));
