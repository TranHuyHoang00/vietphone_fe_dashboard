import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '@actions';
import { Collapse, Typography, Radio, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
class variant_overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }
    handleDelete = async (id) => {
        const { deleteListVariant, getDataProduct, dataProduct } = this.props;
        await deleteListVariant([id]);
        await getDataProduct(dataProduct.id);
    }
    render() {
        const { dataVariants, indexActiveVariant, selectVariant } = this.props;
        return (
            <Collapse defaultActiveKey={['1']}>
                <Collapse.Panel header="Phiên bản" key="1">
                    <Radio.Group className='w-full' value={indexActiveVariant}
                        onChange={(value) => selectVariant(value.target.value)}>
                        <div className='space-y-[10px] '>
                            {dataVariants && dataVariants.map((item, index) => {
                                return (
                                    <div className='flex items-center justify-between'>
                                        <div key={index} onClick={() => selectVariant(index)}
                                            className='flex gap-[10px] cursor-pointer'>
                                            <Radio value={index}></Radio>
                                            <div>
                                                <Typography.Text strong>{item.name}</Typography.Text><br />
                                                <Typography.Text type='secondary'>Số lượng: {item.quantity} cái</Typography.Text>
                                            </div>
                                        </div>
                                        <div>
                                            <Popconfirm
                                                title={`Bạn có chắc chắn muốn xóa?`}
                                                placement="bottomLeft" okType='default' onConfirm={() => this.handleDelete(item.id)}>
                                                <Button className='bg-[#e94138] text-white' icon={<DeleteOutlined />}></Button>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Radio.Group>
                </Collapse.Panel>
            </Collapse>
        );
    }

}
const mapStateToProps = state => {
    return {
        dataProduct: state.product.dataProduct,
        isResult: state.variant.isResult,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        deleteListVariant: (id) => dispatch(actions.deleteListVariantRedux(id)),
        getDataProduct: (id) => dispatch(actions.getDataProductRedux(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(variant_overview));